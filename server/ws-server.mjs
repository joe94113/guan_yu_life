import { WebSocketServer } from "ws";

const PORT = Number(process.env.WS_PORT || 3001);
const wss = new WebSocketServer({ port: PORT });

/** @type {Map<string, { state: any | null, clients: Set<import('ws').WebSocket> }>} */
const rooms = new Map();

const sendJson = (ws, payload) => {
    if (ws.readyState !== ws.OPEN) return;
    ws.send(JSON.stringify(payload));
};

const getOrCreateRoom = (roomCode) => {
    const room = rooms.get(roomCode);
    if (room) return room;

    const created = {
        state: null,
        clients: new Set(),
    };
    rooms.set(roomCode, created);
    return created;
};

const leaveRoom = (ws) => {
    const roomCode = ws.roomCode;
    if (!roomCode) return;

    const room = rooms.get(roomCode);
    if (!room) return;

    room.clients.delete(ws);
    if (!room.clients.size) {
        rooms.delete(roomCode);
    }
    ws.roomCode = undefined;
};

wss.on("connection", (ws) => {
    sendJson(ws, {
        type: "server_notice",
        message: "已連上 WebSocket 房間伺服器",
    });

    ws.on("message", (raw) => {
        try {
            const data = JSON.parse(String(raw));

            if (data.type === "join_room") {
                const roomCode = String(data.roomCode || "")
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 8);
                if (!roomCode) {
                    sendJson(ws, {
                        type: "server_notice",
                        message: "房號無效，請使用 1-8 位英文數字",
                    });
                    return;
                }

                leaveRoom(ws);
                const room = getOrCreateRoom(roomCode);
                room.clients.add(ws);
                ws.roomCode = roomCode;

                sendJson(ws, {
                    type: "room_snapshot",
                    state: room.state,
                });

                sendJson(ws, {
                    type: "server_notice",
                    message: `已加入房間 ${roomCode}，房內 ${room.clients.size} 人在線`,
                });

                return;
            }

            if (data.type === "sync_state") {
                const roomCode = ws.roomCode;
                if (!roomCode) return;

                const room = rooms.get(roomCode);
                if (!room) return;

                room.state = data.state || null;

                for (const client of room.clients) {
                    if (client === ws) continue;
                    sendJson(client, {
                        type: "state_updated",
                        state: room.state,
                    });
                }
            }
        } catch {
            sendJson(ws, {
                type: "server_notice",
                message: "訊息格式錯誤，請傳送 JSON",
            });
        }
    });

    ws.on("close", () => {
        leaveRoom(ws);
    });
});

console.log(`[ws] Party WebSocket server running at ws://localhost:${PORT}`);
