# 人生跑馬燈 - GitHub Pages 部署指南

## 🎪 專案介紹

這是一個搞笑的人生週期跑馬燈網頁，用 Vue3 製作，充滿動畫特效。

### 功能特性：
- 🎨 7個人生階段搞笑描述（從出生到升天）
- ✨ 多種酷炫特效：
  - 卡片翻轉、彈跳動畫
  - 星星閃爍背景
  - 字體 Glitch 效果
  - 光暈脈衝特效
  - Shimmer 閃光效果
- 📱 完全響應式設計（支援手機、平板、電腦）
- 🖼️ 圖片預留位置（可以後續補上圖片）
- ⚡ 自動播放 + 手動控制

## 🚀 本地開發

### 安裝依賴
```bash
npm install
```

### 開發伺服器
```bash
npm run dev
```
服務器會在 `http://localhost:5173/guan_yu_life/` 啟動

### 構建生產版本
```bash
npm run build
```
構建後的文件在 `dist/` 目錄

### 預覽生產版本
```bash
npm run preview
```

## 📦 部署到 GitHub Pages

### 步驟 1：建立 GitHub 倉庫
1. 在 GitHub 上建立新倉庫，名稱為 `guan_yu_life`（或任何你想要的名稱）
2. Clone 進來或關聯這個遠端倉庫

### 步驟 2：修改部署路徑（已完成）
⚠️ **重要**：在 GitHub Pages 部署時，你的網站會在 `username.github.io/repo-name/` 下運行。
已經在 `vite.config.ts` 中設置了：
```typescript
base: '/guan_yu_life/'
```
如果你更改倉庫名稱，要相應修改這個值。

### 步驟 3：構建並推送
```bash
# 構建生產版本
npm run build

# 提交並推送到 GitHub
git add .
git commit -m "Build: 人生跑馬燈完成"
git push origin main
```

### 步驟 4：啟用 GitHub Pages（Actions）
1. 進入 GitHub 倉庫的 **Settings**
2. 左側菜單選擇 **Pages**
3. 在 **Source** 中選擇 **GitHub Actions**
4. 確認倉庫已包含 `.github/workflows/deploy-pages.yml`

### 步驟 5：設定 WebSocket 伺服器位址
GitHub Pages 只能部署靜態前端，不會執行 `server/ws-server.mjs`。

所以要把 WebSocket 伺服器部署到另一個可執行 Node.js 的平台（例如 Render、Railway、Fly.io、VPS），並取得 `wss://...` 網址。

設定方式：
1. 進入 GitHub 倉庫 **Settings > Secrets and variables > Actions**
2. 新增 Repository variable：`VITE_WS_URL`
3. 值填入你的 WebSocket 伺服器，例如 `wss://your-ws-server.example.com`

### 步驟 6：等待部署完成
- GitHub 會自動在 `https://你的用戶名.github.io/guan_yu_life/` 部署網站
- 第一次部署可能需要 1-2 分鐘
- 之後每次 push 都會自動更新

## 🎨 自定義網頁

### 添加圖片
1. 在 `public/` 目錄下創建一個 `images/` 文件夾
2. 上傳你的圖片到該文件夾
3. 修改 [src/App.vue](src/App.vue) 中的 `.image-placeholder` 部分：

```vue
<div class="image-placeholder">
  <img src="/guan_yu_life/images/你的圖片名.jpg" alt="階段圖片" />
</div>
```

### 修改人生階段內容
編輯 [src/App.vue](src/App.vue) 中的 `lifeStages` 陣列，修改：
- `emoji`: 階段 emoji
- `name`: 階段名稱
- `duration`: 持續時間
- `description`: 搞笑描述
- `color`: 卡片顏色

### 修改背景及配色
在 [src/App.vue](src/App.vue) 的 `<style scoped>` 部分修改：
- `.life-carousel-container` 的 `background` - 修改背景漸變色
- `.stage-name` 的 `color` - 修改文字顏色

## 📝 文件結構
```
guan_yu_life/
├── src/
│   ├── App.vue              ← 主要元件（所有內容都在這裡）
│   ├── main.ts
│   └── ...
├── public/                   ← 靜態文件（圖片存放處）
├── index.html               ← HTML 入口
├── vite.config.ts           ← Vite 配置（已設置 base 路徑）
├── package.json
└── ...
```

## 🐛 常見問題

### Q: 推送後網站還是 404
**A:** 檢查：
1. 倉庫名稱是否正確
2. `vite.config.ts` 的 `base` 路徑是否與倉庫名稱相符
3. GitHub Pages 設置中是否正確選擇了分支
4. 等待 1-2 分鐘讓 GitHub 完成構建

### Q: 怎樣自動部署（不用手動 build）？
**A:** 專案已內建 `.github/workflows/deploy-pages.yml`，推送到 `main` 就會自動建置並部署到 GitHub Pages。

### Q: WebSocket 可以一起部署在 GitHub Pages 嗎？
**A:** 不行。GitHub Pages 僅提供靜態檔案託管，不能跑 Node.js WebSocket 服務。你需要把 `server/ws-server.mjs` 部署到外部主機，然後在 Actions Variable 設定 `VITE_WS_URL`。

### Q: 如何更改倉庫名稱後更新部署？
**A:** 修改 `vite.config.ts`：
```typescript
base: '/新倉庫名稱/'
```
然後重新 build 並推送。

## 🎬 提示

- 用滑鼠懸停在按鈕上會暫停自動播放，離開時恢復
- 點擊下方進度點可快速跳轉到該階段
- 網頁在所有設備上都能正常顯示

## 📄 授權

自由使用和修改！祝你度過搞笑的人生跑馬燈之旅 🎪✨
