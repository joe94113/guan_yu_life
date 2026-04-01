# 📹 影片支援使用說明

## 功能介紹

現在可以在投影片中混合使用**圖片**和**影片**！

## 使用方式

### 圖片投影片（預設）
```typescript
{
    id: "college-1",
    stage: "大學",
    title: "大學一 · 呆滯表情",
    quote: "那個放空瞬間，反而最像真實的我。",
    story: "把大學生活的疲憊與可愛都留在這張呆滯表情裡。",
    image: asset("assets/images/college/1.jpg"),
    rarity: "常見",
    // mediaType 不設定或設為 "image" 時，預設顯示圖片
}
```

### 影片投影片
```typescript
{
    id: "special-video-1",
    stage: "大學",
    title: "大學特別 · 青春回憶影片",
    quote: "動起來的青春，更有溫度。",
    story: "把大學最精彩的時刻剪成一支短影片。",
    image: asset("assets/videos/college/memories.mp4"),
    rarity: "傳說",
    mediaType: "video"  // 設為 "video" 時顯示影片播放器
}
```

## 檔案位置

- **圖片**：`public/assets/images/{stage}/{number}.jpg`
- **影片**：`public/assets/videos/{stage}/{name}.mp4`

## 影片功能特性

✅ 內建播放控制（播放、暫停、進度條、音量）  
✅ 禁用下載按鈕（保護個人隱私）  
✅ 自動調整為 4:5 比例（與圖片一致）  
✅ 支援所有稀有度等級（普通/稀有/傳說）  
✅ 加上 🎬 標記顯示是影片  
✅ 與成就系統完全相容  

## 新增投影片清單

已新增以下投影片：
- ✅ 大學第八章：圖學士服照（傳說）
- ✅ 工作第四張：唱K歡樂時刻（稀有）
- ✅ 工作第五張：跩哥自信照（稀有）
- ✅ 工作第六張：躺平的治癒（常見）

## 如何上傳影片

1. 在 `public/assets/videos/` 目錄下建立相應時期資料夾
2. 將影片檔案 (`.mp4`) 放入
3. 在 slides 陣列中新增投影片，設定 `mediaType: "video"`
4. 影片會自動與圖片一樣顯示在卡片中

## 影片建議

- **格式**：MP4 (H.264)
- **解析度**：1080p 或以下（節省空間）
- **長度**：5-30秒（保持自動播放流暢）
- **檔案大小**：建議 < 10MB
- **寬高比**：4:5（直式影片，符合卡片設計）

## 程式碼細節

### 自動媒體偵測
```vue
<img
    v-if="!activeSlide.mediaType || activeSlide.mediaType === 'image'"
    :src="activeSlide.image"
/>
<video
    v-else
    :src="activeSlide.image"
    controls
    controlsList="nodownload"
></video>
```

### 視覺標記
當投影片為影片時，會在圖說中顯示 🎬 符號以區別。

---

**提示**：影片檔案會佔用較多空間。建議定期檢查 `public/assets/videos/` 資料夾大小。
