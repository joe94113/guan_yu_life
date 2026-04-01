<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type LifeStage = "小孩時期" | "國中" | "高中" | "大學" | "出社會" | "飛昇";
type Rarity = "常見" | "稀有" | "傳說";
type MediaType = "image" | "video";

interface SlideItem {
    id: string;
    stage: LifeStage;
    title: string;
    quote: string;
    story: string;
    image: string;
    rarity?: Rarity;
    mediaType?: MediaType;
}

const giscusConfig = {
    repo: "joe94113/guan_yu_life",
    repoId: "R_kgDOR2c0xg",
    category: "General",
    categoryId: "DIC_kwDOR2c0xs4C5vh8",
};

const asset = (path: string): string => `${import.meta.env.BASE_URL}${path}`;

const slides: SlideItem[] = [
    {
        id: "childhood-1",
        stage: "小孩時期",
        title: "在公園追風的下午",
        quote: "童年的快樂，常常只是被陽光照到。",
        story: "放學後最期待去公園溜滑梯，鞋子沾滿沙，回家還捨不得洗掉那天的快樂。",
        image: asset("assets/images/childhood/1.jpg"),
        rarity: "常見",
    },
    {
        id: "childhood-2",
        stage: "小孩時期",
        title: "全家福的餐桌笑聲",
        quote: "長大後才懂，最珍貴的是有人等你吃飯。",
        story: "每個週末全家一起吃飯，長輩的叮嚀和笑聲，慢慢成了我最穩定的安全感。",
        image: "https://picsum.photos/id/1027/1600/1000",
        rarity: "稀有",
    },
    {
        id: "junior-1",
        stage: "國中",
        title: "第一次在講台上發光",
        quote: "那時候我才知道，原來緊張也可以很勇敢。",
        story: "班會報告前手心全是汗，但講完後全班鼓掌。那一刻把我從害怕拉向自信。",
        image: "https://picsum.photos/id/1040/1600/1000",
        rarity: "常見",
    },
    {
        id: "junior-2",
        stage: "國中",
        title: "放學後的操場晚風",
        quote: "追著夕陽跑的那段路，後來再也沒那麼長。",
        story: "每天傍晚都在操場多留十分鐘，和朋友聊夢想、聊未來，聊著聊著就長大了。",
        image: "https://picsum.photos/id/1025/1600/1000",
        rarity: "常見",
    },
    {
        id: "senior-1",
        stage: "高中",
        title: "夜讀與咖啡香",
        quote: "日子很硬，但心越來越有方向。",
        story: "考前一個月幾乎天天留校，和同學互相抽問，熬夜寫題目也不覺得孤單。",
        image: "https://picsum.photos/id/1067/1600/1000",
        rarity: "常見",
    },
    {
        id: "senior-2",
        stage: "高中",
        title: "畢業前的最後一拍",
        quote: "我們都笑著說再見，卻沒人真的準備好。",
        story: "制服別上小卡，交換祝福。快門聲落下時，我們把青春封進了一張照片。",
        image: "https://picsum.photos/id/1074/1600/1000",
        rarity: "傳說",
    },
    {
        id: "college-1",
        stage: "大學",
        title: "呆滯表情",
        quote: "那個放空瞬間，反而最像真實的我。",
        story: "把大學生活的疲憊與可愛都留在這張呆滯表情裡。",
        image: asset("assets/images/college/1.jpg"),
        rarity: "常見",
    },
    {
        id: "college-2",
        stage: "大學",
        title: "租屋處床上自拍",
        quote: "日常很普通，但每張都值得收藏。",
        story: "在租屋處床上拍下的自拍，是那段獨立生活最直接的紀錄。",
        image: asset("assets/images/college/2.jpg"),
        rarity: "常見",
    },
    {
        id: "college-3",
        stage: "大學",
        title: "租屋處床上睡著",
        quote: "努力到睡著，也是青春的一種證明。",
        story: "專題、報告、打工交錯的日子，最後倒在床上瞬間入睡。",
        image: asset("assets/images/college/3.jpg"),
        rarity: "稀有",
    },
    {
        id: "college-4",
        stage: "大學",
        title: "帥氣釣魚照",
        quote: "課業之外，也要有讓自己發光的時刻。",
        story: "釣魚那天風很大，但拍下了最有型的一張。",
        image: asset("assets/images/college/4.jpg"),
        rarity: "稀有",
    },
    {
        id: "college-5",
        stage: "大學",
        title: "與聖誕樹合照",
        quote: "每個節日，都有值得被記住的笑容。",
        story: "在學校聖誕樹旁留下合照，替那年冬天做了最暖的註解。",
        image: asset("assets/images/college/5.jpg"),
        rarity: "常見",
    },
    {
        id: "college-6",
        stage: "大學",
        title: "專題發表",
        quote: "靈感真的會在壓力裡發亮。",
        story: "專題發表當天與燈泡合照，像是把一路上的想法正式點亮。",
        image: asset("assets/images/college/6.jpg"),
        rarity: "傳說",
    },
    {
        id: "college-7",
        stage: "大學",
        title: "YA",
        quote: "畢業不是結束，是更自由的開場。",
        story: "畢業旅行在馬路上被拍下比 YA 的瞬間，像在跟青春敬禮。",
        image: asset("assets/images/college/7.jpg"),
        rarity: "傳說",
    },
    {
        id: "college-8",
        stage: "大學",
        title: "學士服帥照",
        quote: "終於穿上了那身衣服，代表四年堅持的證明。",
        story: "大學畢業典禮穿著學士服的正式照片，留下人生中最莊重的一刻。",
        image: asset("assets/images/college/8.jpg"),
        rarity: "傳說",
    },
    {
        id: "college-9",
        stage: "大學",
        title: "螃蟹",
        quote: "睡著時的你，意外地可愛。",
        story: "睡著時吐泡泡的樣子，真的看起來好像螃蟹一樣呆萌，記錄下來成為大學最爆笑的回憶。",
        image: asset("assets/videos/college/crab-sleep.mp4"),
        rarity: "傳說",
        mediaType: "video",
    },
    {
        id: "college-10",
        stage: "大學",
        title: "炒菜英姿",
        quote: "在家族便當店裡，揮灑青春的汗水。",
        story: "家裡開便當店，在廚房裡學會了各種炒菜秘訣，拍下在灶火前專注炒菜的樣子，那時候覺得自己超帥。",
        image: asset("assets/videos/college/bento-work .mp4"),
        rarity: "稀有",
        mediaType: "video",
    },
    {
        id: "work-1",
        stage: "出社會",
        title: "Coffee & Car",
        quote: "長大後的自由，是自己安排的風景。",
        story: "露營時手拿咖啡和車子的合照，記錄工作之外喘口氣的時刻。",
        image: asset("assets/images/work/1.jpg"),
        rarity: "常見",
    },
    {
        id: "work-2",
        stage: "出社會",
        title: "好熱",
        quote: "有時候最舒服的休息，就是完全放鬆。",
        story: "露營天氣太熱，在帳篷旁裸上半身睡著，留下很真實的一張。",
        image: asset("assets/images/work/2.jpg"),
        rarity: "稀有",
    },
    {
        id: "work-3",
        stage: "出社會",
        title: "眼鏡趣味照",
        quote: "成熟裡也要留一點搞怪。",
        story: "用眼鏡玩出特別角度的趣味照片，幫忙碌生活加上一點幽默。",
        image: asset("assets/images/work/3.jpg"),
        rarity: "常見",
    },
    {
        id: "work-4",
        stage: "出社會",
        title: "唱K歡樂時刻",
        quote: "下班後的麥克風，唱出一週的疲憊與快樂。",
        story: "和朋友一起去唱歌，在KTV裡盡情放聲唱歌，留下最放鬆的笑容。",
        image: asset("assets/images/work/4.jpg"),
        rarity: "稀有",
    },
    {
        id: "work-5",
        stage: "出社會",
        title: "跩哥",
        quote: "偶爾要允許自己臭美一下。",
        story: "工作累積了自信，拍下最有型的一張，就是要跩一下。",
        image: asset("assets/images/work/5.jpg"),
        rarity: "稀有",
    },
    {
        id: "work-6",
        stage: "出社會",
        title: "躺平的治癒",
        quote: "有時候最深的思考，發生在最放鬆的時刻。",
        story: "工作再忙也要懂得停下來，躺著休息就是最好的自我修復。",
        image: asset("assets/images/work/6.jpg"),
        rarity: "常見",
    },
    {
        id: "work-7",
        stage: "出社會",
        title: "唱K盡情放聲",
        quote: "小小舞台上的麥克風，藏著整週的快樂。",
        story: "下班後和朋友衝到KTV，在小房間裡盡情唱歌，工作的疲憊在歌聲中全部釋放。",
        image: asset("assets/videos/work/karaoke.mp4"),
        rarity: "傳說",
        mediaType: "video",
    },
    {
        id: "ascension-1",
        stage: "飛昇",
        title: "飛昇 · 下一章",
        quote: "過去都被好好收藏，未來正要開始。",
        story: "這一張代表新的篇章，把前面所有回憶都帶著一起前進。",
        image: asset("assets/images/ascension/1.jpg"),
        rarity: "傳說",
    },
];

const fallbackSlide: SlideItem = {
    id: "fallback",
    stage: "小孩時期",
    title: "回憶正在載入",
    quote: "每一段路都會留下光。",
    story: "請放入你的照片與故事，這裡就會成為專屬的人生跑馬燈。",
    image: "https://picsum.photos/id/1015/1600/1000",
};

const stageOrder: LifeStage[] = ["小孩時期", "國中", "高中", "大學", "出社會", "飛昇"];

const stageFirstIndexMap: Record<LifeStage, number> = {
    小孩時期: slides.findIndex((slide) => slide.stage === "小孩時期"),
    國中: slides.findIndex((slide) => slide.stage === "國中"),
    高中: slides.findIndex((slide) => slide.stage === "高中"),
    大學: slides.findIndex((slide) => slide.stage === "大學"),
    出社會: slides.findIndex((slide) => slide.stage === "出社會"),
    飛昇: slides.findIndex((slide) => slide.stage === "飛昇"),
};

const activeIndex = ref(0);
const isPlaying = ref(true);
const isAutoPlay = ref(true);
const subtitleVisible = ref(false);
const chapterLabel = ref("小孩時期 · 序章");
const viewedSlideIds = ref<Set<string>>(new Set());
const dailyDrawnSlideId = ref<string | null>(null);
const lastDrawDate = ref<string | null>(null);
const isStoryExpanded = ref(false);
const isAchievementsPanelExpanded = ref(false);
const photoZoneRef = ref<HTMLElement | null>(null);

let autoPlayTimer: number | null = null;
let subtitleTimer: number | null = null;
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillatorA: OscillatorNode | null = null;
let oscillatorB: OscillatorNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let touchStartX = 0;
let touchStartY = 0;

const activeSlide = computed<SlideItem>(() => slides[activeIndex.value] ?? fallbackSlide);
const activeStage = computed(() => activeSlide.value.stage);
const progressPercent = computed(() => Math.round(((activeIndex.value + 1) / slides.length) * 100));
const viewedCount = computed(() => viewedSlideIds.value.size);
const isCurrentViewed = computed(() => viewedSlideIds.value.has(activeSlide.value.id));
const allViewed = computed(() => viewedCount.value === slides.length);
const rarityEmoji = computed(() => {
    const rarity = activeSlide.value.rarity;
    if (rarity === "傳說") return "✨";
    if (rarity === "稀有") return "⭐";
    return "🌟";
});
const stageViewedCounts = computed(() => {
    const counts: Record<LifeStage, number> = {
        小孩時期: 0,
        國中: 0,
        高中: 0,
        大學: 0,
        出社會: 0,
        飛昇: 0,
    };
    slides.forEach((slide) => {
        if (viewedSlideIds.value.has(slide.id)) {
            counts[slide.stage]++;
        }
    });
    return counts;
});
const stageCompletions = computed(() => {
    const completions: Record<LifeStage, boolean> = {
        小孩時期: false,
        國中: false,
        高中: false,
        大學: false,
        出社會: false,
        飛昇: false,
    };
    stageOrder.forEach((stage) => {
        const stageSlides = slides.filter((s) => s.stage === stage);
        completions[stage] =
            stageSlides.every((s) => viewedSlideIds.value.has(s.id)) && stageSlides.length > 0;
    });
    return completions;
});
const totalStagesCompleted = computed(
    () => Object.values(stageCompletions.value).filter(Boolean).length,
);
const isTodayDrawn = computed(() => {
    if (!lastDrawDate.value) {
        return false;
    }
    const today = new Date().toISOString().split("T")[0];
    return lastDrawDate.value === today;
});
const todayDrawnSlide = computed<SlideItem | null>(() => {
    if (!isTodayDrawn.value || !dailyDrawnSlideId.value) {
        return null;
    }
    return slides.find((s) => s.id === dailyDrawnSlideId.value) ?? null;
});

const nextSlide = (): void => {
    activeIndex.value = (activeIndex.value + 1) % slides.length;
    markCurrentAsViewed();
};

const prevSlide = (): void => {
    activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
    markCurrentAsViewed();
};

const focusPhotoZone = async (): Promise<void> => {
    await nextTick();
    photoZoneRef.value?.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });
};

const randomSlide = (): void => {
    if (slides.length <= 1) {
        return;
    }

    const current = activeIndex.value;
    let next = current;
    while (next === current) {
        next = Math.floor(Math.random() * slides.length);
    }
    activeIndex.value = next;
    markCurrentAsViewed();

    // 記錄今日抽卡
    const today = new Date().toISOString().split("T")[0] ?? "";
    dailyDrawnSlideId.value = activeSlide.value.id;
    lastDrawDate.value = today;
    localStorage.setItem(
        "guan_yu_daily_draw",
        JSON.stringify({
            slideId: dailyDrawnSlideId.value,
            date: lastDrawDate.value,
        }),
    );

    void focusPhotoZone();
};

const markCurrentAsViewed = (): void => {
    viewedSlideIds.value.add(activeSlide.value.id);
    localStorage.setItem("guan_yu_viewed", JSON.stringify(Array.from(viewedSlideIds.value)));
};

const loadViewedHistory = (): void => {
    try {
        const stored = localStorage.getItem("guan_yu_viewed");
        if (stored) {
            viewedSlideIds.value = new Set(JSON.parse(stored));
        }
    } catch {
        // Silently fail on parse error
        viewedSlideIds.value = new Set();
    }
};

const loadDailyDraw = (): void => {
    try {
        const stored = localStorage.getItem("guan_yu_daily_draw");
        if (stored) {
            const data = JSON.parse(stored);
            dailyDrawnSlideId.value = data.slideId;
            lastDrawDate.value = data.date;
        }
    } catch {
        // Silently fail
        dailyDrawnSlideId.value = null;
        lastDrawDate.value = null;
    }
};

const clearHistory = (): void => {
    viewedSlideIds.value.clear();
    localStorage.removeItem("guan_yu_viewed");
    dailyDrawnSlideId.value = null;
    lastDrawDate.value = null;
    localStorage.removeItem("guan_yu_daily_draw");
};

const startAutoPlay = (): void => {
    if (autoPlayTimer !== null) {
        window.clearInterval(autoPlayTimer);
    }

    autoPlayTimer = window.setInterval(() => {
        if (isAutoPlay.value) {
            nextSlide();
        }
    }, 6200);
};

const stopAutoPlay = (): void => {
    if (autoPlayTimer !== null) {
        window.clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
};

const jumpToStage = (stage: LifeStage): void => {
    const nextIndex = stageFirstIndexMap[stage];
    activeIndex.value = nextIndex >= 0 ? nextIndex : 0;
};

const showChapterSubtitle = (): void => {
    const slide = slides[activeIndex.value] ?? fallbackSlide;
    chapterLabel.value = `${slide.stage} · ${slide.title}`;
    subtitleVisible.value = true;

    if (subtitleTimer !== null) {
        window.clearTimeout(subtitleTimer);
    }

    subtitleTimer = window.setTimeout(() => {
        subtitleVisible.value = false;
    }, 2200);
};

const handleKeyNavigation = (event: KeyboardEvent): void => {
    if (event.key === "ArrowRight") {
        nextSlide();
        return;
    }

    if (event.key === "ArrowLeft") {
        prevSlide();
    }
};

const handleTouchStart = (event: TouchEvent): void => {
    touchStartX = event.touches[0]?.clientX ?? 0;
    touchStartY = event.touches[0]?.clientY ?? 0;
};

const handleTouchEnd = (event: TouchEvent): void => {
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const touchEndY = event.changedTouches[0]?.clientY ?? 0;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // 只在水平距離大於豎直距離時觸發左右導航
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
};

const mountGiscus = (): void => {
    const container = document.querySelector("#giscus-host");
    if (!(container instanceof HTMLElement)) {
        return;
    }

    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", "zh-TW");

    container.appendChild(script);
};

const createAmbientAudio = async (): Promise<void> => {
    if (audioCtx !== null) {
        await audioCtx.resume();
        return;
    }

    audioCtx = new window.AudioContext();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.045;

    oscillatorA = audioCtx.createOscillator();
    oscillatorA.type = "sine";
    oscillatorA.frequency.value = 220;

    oscillatorB = audioCtx.createOscillator();
    oscillatorB.type = "triangle";
    oscillatorB.frequency.value = 329.63;

    lfo = audioCtx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08;

    lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 12;

    lfo.connect(lfoGain);
    lfoGain.connect(oscillatorA.frequency);

    oscillatorA.connect(gainNode);
    oscillatorB.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillatorA.start();
    oscillatorB.start();
    lfo.start();
};

const stopAmbientAudio = async (): Promise<void> => {
    if (audioCtx === null) {
        return;
    }

    await audioCtx.suspend();
};

const toggleMusic = async (): Promise<void> => {
    if (isPlaying.value) {
        isPlaying.value = false;
        await stopAmbientAudio();
        return;
    }

    isPlaying.value = true;
    await createAmbientAudio();
};

onMounted(async () => {
    loadViewedHistory();
    loadDailyDraw();
    markCurrentAsViewed();
    startAutoPlay();
    showChapterSubtitle();
    await createAmbientAudio();
    window.addEventListener("keydown", handleKeyNavigation);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    mountGiscus();
});

watch(activeIndex, () => {
    showChapterSubtitle();
    isStoryExpanded.value = false;
});

onBeforeUnmount(() => {
    stopAutoPlay();
    window.removeEventListener("keydown", handleKeyNavigation);
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchend", handleTouchEnd);
    if (subtitleTimer !== null) {
        window.clearTimeout(subtitleTimer);
        subtitleTimer = null;
    }
    if (audioCtx !== null) {
        audioCtx.close();
        audioCtx = null;
    }
});
</script>

<template>
    <main class="memory-page" @mouseenter="isAutoPlay = false" @mouseleave="isAutoPlay = true">
        <div class="memory-page__bg-glow"></div>

        <transition name="chapter-subtitle">
            <div v-if="subtitleVisible" class="chapter-subtitle" aria-live="polite">
                <p class="chapter-subtitle__text">{{ chapterLabel }}</p>
            </div>
        </transition>

        <section class="game-arena">
            <header class="game-hud">
                <p class="game-hud__label">回憶探索進度</p>
                <p class="game-hud__value">{{ progressPercent }}%</p>
                <div class="game-hud__bar">
                    <span
                        class="game-hud__bar-fill"
                        :style="{ width: `${progressPercent}%` }"
                    ></span>
                </div>
            </header>

            <div class="achievement-strip" :class="{ 'achievement-strip--expanded': isAchievementsPanelExpanded }">
                <button 
                    class="achievement-toggle-btn"
                    type="button"
                    @click="isAchievementsPanelExpanded = !isAchievementsPanelExpanded"
                    :aria-expanded="isAchievementsPanelExpanded"
                >
                    <span class="achievement-toggle-icon">{{ isAchievementsPanelExpanded ? '▼' : '▶' }}</span>
                    <span class="achievement-toggle-text">成就系統</span>
                    <span class="achievement-progress">{{ viewedCount }}/{{ slides.length }}</span>
                </button>
                <div class="achievement-content" v-show="isAchievementsPanelExpanded">
                    <div
                        class="achievement-item"
                        :class="{ 'achievement-item--unlocked': viewedCount > 0 }"
                    >
                        <div class="achievement-badge">🔍</div>
                        <div class="achievement-info">
                            <p class="achievement-name">探險家</p>
                            <p class="achievement-desc">
                                看過 {{ viewedCount }}/{{ slides.length }} 張回憶
                            </p>
                        </div>
                    </div>
                    <div class="achievement-item" :class="{ 'achievement-item--unlocked': allViewed }">
                        <div class="achievement-badge">✨</div>
                        <div class="achievement-info">
                            <p class="achievement-name">人生回顧家</p>
                            <p class="achievement-desc">
                                {{ allViewed ? "已解鎖！" : "集滿所有回憶" }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="daily-task-panel">
                <div class="daily-task__title">📅 今日任務</div>
                <div v-if="isTodayDrawn && todayDrawnSlide" class="daily-task__item">
                    <span class="daily-task__emoji">{{ rarityEmoji }}</span>
                    <span class="daily-task__text">
                        已抽到 {{ todayDrawnSlide.stage }} 的「{{ todayDrawnSlide.title }}」
                    </span>
                </div>
                <div v-else class="daily-task__item daily-task__item--empty">
                    <span class="daily-task__emoji">🎴</span>
                    <span class="daily-task__text">今天還未抽卡，點擊隨機抽卡試試運氣！</span>
                </div>
            </div>

            <div class="stage-completion-panel">
                <div class="stage-completion__title">🏆 時期進度</div>
                <div class="stage-completion__list">
                    <div
                        v-for="stage in stageOrder"
                        :key="stage"
                        class="stage-item"
                        :class="{ 'stage-item--completed': stageCompletions[stage] }"
                    >
                        <span class="stage-item__star">
                            {{ stageCompletions[stage] ? "✨" : "☆" }}
                        </span>
                        <span class="stage-item__name">{{ stage }}</span>
                        <span class="stage-item__progress">
                            {{ stageViewedCounts[stage] }}/{{
                                slides.filter((s) => s.stage === stage).length
                            }}
                        </span>
                    </div>
                </div>
            </div>

            <div ref="photoZoneRef" class="game-photo-zone" aria-live="polite">
                <div class="photo-controls-hint">
                    <span class="hint-item">⌨️ <kbd>←</kbd> 上一張</span>
                    <span class="hint-divider">|</span>
                    <span class="hint-item"><kbd>→</kbd> 下一張</span>
                    <span class="hint-divider">|</span>
                    <span class="hint-item">👆 左右滑動</span>
                </div>
                <transition name="photo-pop" mode="out-in">
                    <figure
                        :key="activeSlide.id"
                        class="photo-card"
                        :class="{
                            'photo-card--rare': activeSlide.rarity === '稀有',
                            'photo-card--legendary': activeSlide.rarity === '傳說',
                        }"
                    >
                        <div class="photo-card__container">
                            <img
                                v-if="!activeSlide.mediaType || activeSlide.mediaType === 'image'"
                                :src="activeSlide.image"
                                :alt="activeSlide.title"
                                class="photo-card__image"
                            />
                            <video
                                v-else
                                :src="activeSlide.image"
                                type="video/mp4"
                                class="photo-card__image photo-card__video"
                                controls
                                controlsList="nodownload"
                            ></video>
                        </div>
                        <figcaption class="photo-card__caption">
                            <span v-if="isCurrentViewed" class="photo-card__badge">✓</span>
                            <span class="photo-card__rarity">{{
                                activeSlide.rarity || "常見"
                            }}</span>
                            <span
                                v-if="activeSlide.mediaType === 'video'"
                                class="photo-card__media-type"
                            >
                                🎬
                            </span>
                            {{ activeSlide.stage }} · {{ activeIndex + 1 }} / {{ slides.length }}
                        </figcaption>
                    </figure>
                </transition>
            </div>

            <nav class="timeline" aria-label="人生階段導覽">
                <button
                    v-for="stage in stageOrder"
                    :key="stage"
                    class="timeline__item"
                    :class="{ 'timeline__item--active': stage === activeStage }"
                    @click="jumpToStage(stage)"
                >
                    {{ stage }}
                </button>
            </nav>

            <section
                class="story-card"
                aria-live="polite"
                :class="{ 'story-card--expanded': isStoryExpanded }"
                @click="isStoryExpanded = !isStoryExpanded"
            >
                <p class="story-card__stage">
                    {{ activeSlide.stage }} · {{ activeIndex + 1 }} / {{ slides.length }}
                </p>
                <h1 class="story-card__title">{{ activeSlide.title }}</h1>
                <blockquote class="story-card__quote">{{ activeSlide.quote }}</blockquote>
                <transition name="story-expand">
                    <p v-show="isStoryExpanded" class="story-card__text">{{ activeSlide.story }}</p>
                </transition>
                <div class="story-card__toggle">
                    <span class="story-card__toggle-text">
                        {{ isStoryExpanded ? "收起" : "展開故事" }}
                    </span>
                    <span class="story-card__toggle-icon">{{ isStoryExpanded ? "▲" : "▼" }}</span>
                </div>
            </section>

            <div class="action-bar">
                <button class="action-btn" type="button" @click="toggleMusic">
                    {{ isPlaying ? "靜音背景音" : "播放背景音" }}
                </button>
                <button class="action-btn action-btn--ghost" type="button" @click="prevSlide">
                    上一張
                </button>
                <button class="action-btn action-btn--ghost" type="button" @click="nextSlide">
                    下一張
                </button>
                <button class="action-btn action-btn--random" type="button" @click="randomSlide">
                    隨機抽卡
                </button>
                <button
                    class="action-btn action-btn--ghost action-btn--small"
                    type="button"
                    @click="clearHistory"
                >
                    重置記錄
                </button>
            </div>
        </section>

        <section class="discussion-panel" aria-label="留言區">
            <div class="discussion-panel__head">
                <h2 class="discussion-panel__title">回憶討論區</h2>
                <p class="discussion-panel__desc">留一句話，替這段人生加上一行旁白。</p>
            </div>
            <div class="discussion-panel__content" id="giscus-host"></div>
        </section>
    </main>
</template>

<style scoped>
:global(*) {
    box-sizing: border-box;
}

:global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: "Noto Sans TC", "Microsoft JhengHei", sans-serif;
    background: #0e1324;
}

.memory-page {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 4.2rem 1rem 6rem;
    touch-action: pan-y;
}

.memory-page::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 15% 8%, rgb(77 155 255 / 35%), transparent 40%),
        radial-gradient(circle at 85% 14%, rgb(255 182 89 / 26%), transparent 32%),
        linear-gradient(180deg, rgb(15 20 40 / 74%), rgb(9 12 25 / 88%));
    pointer-events: none;
    z-index: 1;
}

.memory-page__bg-glow {
    position: absolute;
    inset: -15%;
    background:
        radial-gradient(circle at 20% 30%, rgb(90 169 255 / 30%), transparent 40%),
        radial-gradient(circle at 80% 70%, rgb(255 178 94 / 20%), transparent 36%);
    z-index: 0;
    will-change: auto;
    pointer-events: none;
}

.game-arena {
    position: relative;
    z-index: 4;
    width: min(100%, 980px);
    display: grid;
    gap: 0.9rem;
    grid-template-columns: 1fr;
}

.game-hud {
    background: rgb(11 16 35 / 78%);
    border: 1px solid rgb(126 180 255 / 46%);
    border-radius: 14px;
    padding: 0.7rem 0.9rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 10px 30px rgb(0 0 0 / 30%);
}

.game-hud__label {
    margin: 0;
    font-size: 0.8rem;
    color: rgb(193 214 255 / 90%);
}

.game-hud__value {
    margin: 0.3rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 700;
}

.game-hud__bar {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: rgb(255 255 255 / 12%);
    overflow: hidden;
}

.game-hud__bar-fill {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #64d2ff, #ffd06b);
    border-radius: inherit;
    transition: width 0.4s ease;
}

.achievement-strip {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border-radius: 10px;
    background: rgb(255 255 255 / 6%);
    border: 1px solid rgb(255 255 255 / 12%);
    overflow: hidden;
    transition: background-color 0.3s ease;
}

.achievement-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.65rem 0.8rem;
    border: none;
    background: transparent;
    color: rgb(233 242 255 / 88%);
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.03em;
    transition: background-color 0.3s ease;
    user-select: none;
}

.achievement-toggle-btn:hover {
    background: rgb(255 255 255 / 8%);
}

.achievement-toggle-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    font-size: 0.75rem;
    transition: transform 0.3s ease;
}

.achievement-toggle-text {
    flex: 1;
}

.achievement-progress {
    font-size: 0.8rem;
    color: rgb(233 242 255 / 65%);
    background: rgb(100 210 255 / 20%);
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
}

.achievement-content {
    display: grid;
    gap: 0.6rem;
    padding: 0 0.8rem 0.8rem;
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.achievement-item {
    display: flex;
    gap: 0.7rem;
    padding: 0.65rem 0.8rem;
    border-radius: 10px;
    background: rgb(255 255 255 / 8%);
    border: 1px solid rgb(255 255 255 / 16%);
    opacity: 0.65;
    transition:
        opacity 0.3s ease,
        border-color 0.3s ease,
        background-color 0.3s ease;
}

.achievement-item--unlocked {
    opacity: 1;
    background: rgb(255 208 143 / 22%);
    border-color: rgb(255 208 143 / 50%);
}

.achievement-badge {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
    background: rgb(100 210 255 / 16%);
    border-radius: 8px;
}

.achievement-item--unlocked .achievement-badge {
    background: rgb(255 208 143 / 35%);
}

.achievement-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
}

.achievement-name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 600;
    color: rgb(255 249 245 / 95%);
}

.achievement-desc {
    margin: 0.2rem 0 0;
    font-size: 0.8rem;
    color: rgb(233 242 255 / 75%);
}

.achievement-item--unlocked .achievement-name {
    color: #ffeecc;
}

.photo-card__badge {
    display: inline-block;
    margin-right: 0.4rem;
    color: #64d2ff;
    font-weight: 700;
}

.photo-card__rarity {
    display: inline-block;
    margin-right: 0.5rem;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgb(255 255 255 / 12%);
    color: #ddd;
}

.photo-card {
    margin: 0;
    background: #0f162e;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid rgb(255 255 255 / 12%);
    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.photo-card--rare {
    border-color: rgb(255 182 89 / 80%);
    box-shadow:
        0 0 12px rgb(255 182 89 / 25%),
        inset 0 0 8px rgb(255 182 89 / 10%);
}

.photo-card--legendary {
    border-color: rgb(255 208 143 / 100%);
    box-shadow:
        0 0 16px rgb(255 208 143 / 40%),
        0 0 32px rgb(255 182 89 / 20%),
        inset 0 0 10px rgb(255 208 143 / 15%);
    animation: legendary-glow 2.4s ease-in-out infinite;
}

@keyframes legendary-glow {
    0%,
    100% {
        box-shadow:
            0 0 16px rgb(255 208 143 / 40%),
            0 0 32px rgb(255 182 89 / 20%),
            inset 0 0 10px rgb(255 208 143 / 15%);
    }

    50% {
        box-shadow:
            0 0 20px rgb(255 208 143 / 60%),
            0 0 40px rgb(255 182 89 / 30%),
            inset 0 0 12px rgb(255 208 143 / 25%);
    }
}

.photo-card__container {
    overflow: hidden;
    background: #070b1a;
    touch-action: manipulation;
}

.photo-card__video {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: cover !important;
}

.photo-card__video::cue {
    background: rgba(0, 0, 0, 0.5);
}

.photo-card__media-type {
    display: inline-block;
    margin-right: 0.3rem;
    font-size: 0.9rem;
}

.game-photo-zone {
    background: rgb(8 12 28 / 84%);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 16px;
    padding: 0.6rem;
    contain: layout style paint;
    will-change: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.photo-controls-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.4rem 0.6rem;
    background: rgb(100 210 255 / 8%);
    border: 1px solid rgb(100 210 255 / 25%);
    border-radius: 8px;
    font-size: 0.8rem;
    color: rgb(100 210 255 / 85%);
    flex-wrap: wrap;
}

.hint-item {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
}

.hint-item kbd {
    background: rgb(100 210 255 / 20%);
    border: 1px solid rgb(100 210 255 / 40%);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-family: monospace;
    font-size: 0.75rem;
    font-weight: 600;
}

.hint-divider {
    color: rgb(100 210 255 / 40%);
    margin: 0 0.2rem;
}

@media (max-width: 560px) {
    .photo-controls-hint {
        font-size: 0.75rem;
        gap: 0.3rem;
        padding: 0.35rem 0.5rem;
    }

    .hint-item kbd {
        padding: 0.15rem 0.3rem;
        font-size: 0.7rem;
    }
}

.photo-card__image {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: contain;
    background: #070b1a;
    user-select: none;
    touch-action: manipulation;
    -webkit-user-select: none;
}

.photo-card__caption {
    margin: 0;
    padding: 0.5rem 0.75rem 0.6rem;
    font-size: 0.84rem;
    color: rgb(233 242 255 / 92%);
    letter-spacing: 0.03em;
}

.photo-pop-enter-active,
.photo-pop-leave-active {
    transition:
        opacity 0.35s ease,
        transform 0.35s ease;
}

.photo-pop-enter-from,
.photo-pop-leave-to {
    opacity: 0;
    transform: scale(0.96);
}

.story-card {
    position: relative;
    z-index: 6;
    width: 100%;
    padding: 1rem 0.9rem 1.1rem;
    border-radius: 10px;
    background: #fbf5ea;
    color: #2c211e;
    border: 6px solid #fff;
    box-shadow: 0 14px 34px rgb(0 0 0 / 38%);
    cursor: pointer;
    transition: max-height 0.3s ease;
    max-height: 280px;
    overflow: hidden;
}

.story-card--expanded {
    max-height: 100%;
}

.story-card::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(165deg, rgb(255 255 255 / 30%), transparent 40%);
}

.story-card__stage {
    margin: 0;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #91502d;
}

.story-card__title {
    margin: 0.65rem 0 0;
    font-size: clamp(1.45rem, 2.7vw, 2.15rem);
    line-height: 1.24;
    font-weight: 700;
}

.story-card__quote {
    margin: 0.85rem 0 0;
    padding: 0.35rem 0.9rem;
    border-left: 4px solid #c8784f;
    font-size: clamp(0.98rem, 2.1vw, 1.16rem);
    color: #5b3f30;
    background: rgb(255 255 255 / 52%);
}

.story-card__text {
    margin: 1rem 0 0;
    line-height: 1.72;
    font-size: 0.98rem;
}

.story-card__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgb(0 0 0 / 15%);
    font-size: 0.9rem;
    color: #91502d;
    font-weight: 600;
    user-select: none;
}

.story-card__toggle-text {
    letter-spacing: 0.05em;
}

.story-card__toggle-icon {
    display: inline-block;
    transition: transform 0.3s ease;
}

.story-card--expanded .story-card__toggle-icon {
    transform: scaleY(-1);
}

.story-expand-enter-active,
.story-expand-leave-active {
    transition: opacity 0.3s ease;
}

.story-expand-enter-from,
.story-expand-leave-to {
    opacity: 0;
}

.chapter-subtitle {
    position: absolute;
    top: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
    background: rgb(6 9 18 / 68%);
    border: 1px solid rgb(255 243 220 / 34%);
    border-radius: 999px;
    padding: 0.45rem 1.1rem;
    backdrop-filter: blur(6px);
}

.chapter-subtitle__text {
    margin: 0;
    letter-spacing: 0.05em;
    color: #fff3d7;
    font-size: 0.96rem;
}

.chapter-subtitle-enter-active,
.chapter-subtitle-leave-active {
    transition:
        opacity 0.5s ease,
        transform 0.5s ease;
}

.chapter-subtitle-enter-from,
.chapter-subtitle-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
}

.timeline {
    z-index: 6;
    background: rgb(11 17 35 / 70%);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 16px;
    padding: 0.7rem;
    backdrop-filter: blur(8px);
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
}

.timeline__item {
    border: 0;
    border-bottom: 2px solid rgb(255 255 255 / 20%);
    background: rgb(255 255 255 / 9%);
    color: rgb(239 245 255 / 88%);
    border-radius: 10px 10px 0 0;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    white-space: nowrap;
    transition:
        transform 0.28s ease,
        border-color 0.28s ease,
        background-color 0.28s ease;
}

.timeline__item:hover {
    transform: translateY(-2px);
}

.timeline__item--active {
    border-bottom-color: #ffd08f;
    background: rgb(255 194 128 / 30%);
    color: #fff9ea;
}

.action-bar {
    z-index: 6;
    background: rgb(10 16 34 / 75%);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 16px;
    padding: 0.75rem;
    backdrop-filter: blur(8px);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    border: 0;
    border-radius: 999px;
    padding: 0.55rem 0.95rem;
    background: #ffe7b2;
    color: #4a331f;
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
    transition:
        transform 0.24s ease,
        filter 0.24s ease;
}

.action-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
}

.action-btn--ghost {
    background: rgb(255 255 255 / 13%);
    color: #fff6e6;
    border: 1px solid rgb(255 255 255 / 35%);
}

.action-btn--random {
    background: linear-gradient(135deg, #71d3ff, #8ef6d3);
    color: #11303a;
}

.action-btn--small {
    padding: 0.45rem 0.6rem;
    font-size: 0.85rem;
}

.daily-task-panel {
    background: rgb(11 16 35 / 70%);
    border: 1px solid rgb(100 210 255 / 40%);
    border-radius: 14px;
    padding: 0.65rem 0.85rem;
    backdrop-filter: blur(8px);
}

.daily-task__title {
    margin: 0 0 0.5rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: #64d2ff;
    letter-spacing: 0.05em;
}

.daily-task__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.55rem;
    border-radius: 8px;
    background: rgb(100 210 255 / 12%);
    border: 1px solid rgb(100 210 255 / 30%);
}

.daily-task__item--empty {
    background: rgb(255 255 255 / 8%);
    border-color: rgb(255 255 255 / 20%);
}

.daily-task__emoji {
    font-size: 1.2rem;
    min-width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.daily-task__text {
    font-size: 0.82rem;
    color: rgb(233 242 255 / 88%);
    line-height: 1.3;
}

.stage-completion-panel {
    background: rgb(11 16 35 / 70%);
    border: 1px solid rgb(255 208 143 / 40%);
    border-radius: 14px;
    padding: 0.65rem 0.85rem;
    backdrop-filter: blur(8px);
}

.stage-completion__title {
    margin: 0 0 0.5rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: #ffd08f;
    letter-spacing: 0.05em;
}

.stage-completion__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.4rem;
}

.stage-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.6rem;
    border-radius: 8px;
    background: rgb(255 255 255 / 8%);
    border: 1px solid rgb(255 208 143 / 25%);
    transition:
        background-color 0.3s ease,
        border-color 0.3s ease;
    opacity: 0.7;
}

.stage-item--completed {
    opacity: 1;
    background: rgb(255 208 143 / 25%);
    border-color: rgb(255 208 143 / 60%);
}

.stage-item__star {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
}

.stage-item__name {
    flex: 1;
    font-size: 0.82rem;
    font-weight: 600;
    color: rgb(255 249 245 / 90%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.stage-item__progress {
    font-size: 0.75rem;
    color: rgb(233 242 255 / 75%);
    font-weight: 600;
    min-width: 32px;
    text-align: right;
}

.stage-item--completed .stage-item__name {
    color: #ffeecc;
}

.discussion-panel {
    position: relative;
    z-index: 6;
    width: min(100%, 980px);
    max-height: min(50vh, 500px);
    margin: 0 auto;
    border-radius: 18px;
    padding: 0.75rem;
    background: rgb(7 10 22 / 66%);
    border: 1px solid rgb(255 231 196 / 24%);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.discussion-panel__head {
    padding: 0.3rem 0.6rem 0.65rem;
}

.discussion-panel__title {
    margin: 0;
    color: #fff2d3;
    font-size: 1rem;
}

.discussion-panel__desc {
    margin: 0.35rem 0 0.75rem;
    color: rgb(255 239 218 / 78%);
    font-size: 0.9rem;
}

.discussion-panel__content {
    border-radius: 12px;
    overflow: auto;
    background: rgb(5 8 17 / 36%);
    flex: 1;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
}

@keyframes drift {
    from {
        opacity: 0.85;
    }

    to {
        opacity: 1;
    }
}

@media (max-width: 900px) {
    .memory-page {
        padding: 4rem 0.8rem 6rem;
    }

    .discussion-panel {
        width: 100%;
        max-height: 50vh;
    }

    .stage-completion__list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 560px) {
    .action-btn {
        width: calc(50% - 0.35rem);
        min-width: 130px;
    }

    .discussion-panel {
        max-height: 45vh;
    }

    .photo-card__image {
        aspect-ratio: 3 / 4;
    }

    .achievement-content {
        grid-template-columns: 1fr;
    }

    .stage-completion__list {
        grid-template-columns: 1fr;
    }

    .stage-completion__title,
    .daily-task__title {
        font-size: 0.88rem;
    }
}
</style>
