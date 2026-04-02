<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type LifeStage = "小孩時期" | "大學" | "出社會" | "飛昇";
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
    captionTrack?: string;
    descriptionTrack?: string;
}

const giscusConfig = {
    repo: "joe94113/guan_yu_life",
    repoId: "R_kgDOR2c0xg",
    category: "General",
    categoryId: "DIC_kwDOR2c0xs4C5vh8",
};

const asset = (path: string): string => new URL(path, document.baseURI).toString();

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
        captionTrack: asset("assets/videos/college/crab-sleep-captions.vtt"),
        descriptionTrack: asset("assets/videos/college/crab-sleep-descriptions.vtt"),
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
        captionTrack: asset("assets/videos/work/karaoke-captions.vtt"),
        descriptionTrack: asset("assets/videos/work/karaoke-descriptions.vtt"),
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

const stageOrder: LifeStage[] = ["小孩時期", "大學", "出社會", "飛昇"];

const stageFirstIndexMap: Record<LifeStage, number> = {
    小孩時期: slides.findIndex((slide) => slide.stage === "小孩時期"),
    大學: slides.findIndex((slide) => slide.stage === "大學"),
    出社會: slides.findIndex((slide) => slide.stage === "出社會"),
    飛昇: slides.findIndex((slide) => slide.stage === "飛昇"),
};

const activeIndex = ref(0);
const isPlaying = ref(false);
const isAutoPlay = ref(true);
const subtitleVisible = ref(false);
const chapterLabel = ref("小孩時期 · 序章");
const viewedSlideIds = ref<Set<string>>(new Set());
const dailyDrawnSlideId = ref<string | null>(null);
const lastDrawDate = ref<string | null>(null);
const isStoryExpanded = ref(false);
const photoZoneRef = ref<HTMLElement | null>(null);
const photoTransitionName = ref("photo-swipe-left");
const isVideoPlaying = ref(false);

let autoPlayTimer: ReturnType<typeof globalThis.setInterval> | null = null;
let subtitleTimer: ReturnType<typeof globalThis.setTimeout> | null = null;
let musicPlayer: HTMLAudioElement | null = null;
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillatorA: OscillatorNode | null = null;
let oscillatorB: OscillatorNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let touchStartX = 0;
let touchStartY = 0;
let touchStartedOnInteractive = false;
const preloadedMedia = new Set<string>();

const activeSlide = computed<SlideItem>(() => slides[activeIndex.value] ?? fallbackSlide);
const activeStage = computed(() => activeSlide.value.stage);
const activeSlideNumber = computed(() => activeIndex.value + 1);
const activeRarityLabel = computed(() => activeSlide.value.rarity || "常見");
const curatorLabelsByStage: Record<LifeStage, { era: string; theme: string }> = {
    小孩時期: { era: "童年檔案", theme: "溫度與陪伴" },
    大學: { era: "青春檔案", theme: "探索與自我" },
    出社會: { era: "現實檔案", theme: "節奏與選擇" },
    飛昇: { era: "下一章", theme: "總結與啟程" },
};
const activeCuratorLabels = computed(() => curatorLabelsByStage[activeStage.value]);
const progressPercent = computed(() => Math.round(((activeIndex.value + 1) / slides.length) * 100));
const viewedCount = computed(() => viewedSlideIds.value.size);
const isCurrentViewed = computed(() => viewedSlideIds.value.has(activeSlide.value.id));
const rarityEmoji = computed(() => {
    const rarity = activeSlide.value.rarity;
    if (rarity === "傳說") return "✨";
    if (rarity === "稀有") return "⭐";
    return "🌟";
});
const stageViewedCounts = computed(() => {
    const counts: Record<LifeStage, number> = {
        小孩時期: 0,
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
const stageCards = computed(() =>
    stageOrder.map((stage) => {
        const total = slides.filter((slide) => slide.stage === stage).length;
        const viewed = stageViewedCounts.value[stage];

        return {
            stage,
            total,
            viewed,
            completed: stageCompletions.value[stage],
            percent: total > 0 ? Math.round((viewed / total) * 100) : 0,
        };
    }),
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
    photoTransitionName.value = "photo-swipe-left";
    activeIndex.value = (activeIndex.value + 1) % slides.length;
    markCurrentAsViewed();
};

const prevSlide = (): void => {
    photoTransitionName.value = "photo-swipe-right";
    activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
    markCurrentAsViewed();
};

const preloadMediaAtIndex = (index: number): void => {
    const target = slides[index];
    if (!target || preloadedMedia.has(target.image)) {
        return;
    }

    preloadedMedia.add(target.image);

    if (target.mediaType === "video") {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.src = target.image;
        return;
    }

    const image = new Image();
    image.decoding = "async";
    image.src = target.image;
};

const preloadNearbySlides = (centerIndex: number): void => {
    const nearby = [
        centerIndex,
        (centerIndex + 1) % slides.length,
        (centerIndex - 1 + slides.length) % slides.length,
        (centerIndex + 2) % slides.length,
    ];

    nearby.forEach((index) => preloadMediaAtIndex(index));
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

    photoTransitionName.value = "photo-swipe-up";

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
        globalThis.clearInterval(autoPlayTimer);
    }

    autoPlayTimer = globalThis.setInterval(() => {
        if (isAutoPlay.value && !isVideoPlaying.value) {
            nextSlide();
        }
    }, 6200);
};

const stopAutoPlay = (): void => {
    if (autoPlayTimer !== null) {
        globalThis.clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
};

const jumpToStage = (stage: LifeStage): void => {
    const nextIndex = stageFirstIndexMap[stage];
    activeIndex.value = Math.max(nextIndex, 0);
};

const showChapterSubtitle = (): void => {
    const slide = slides[activeIndex.value] ?? fallbackSlide;
    chapterLabel.value = `${slide.stage} · ${slide.title}`;
    subtitleVisible.value = true;

    if (subtitleTimer !== null) {
        globalThis.clearTimeout(subtitleTimer);
    }

    subtitleTimer = globalThis.setTimeout(() => {
        subtitleVisible.value = false;
    }, 2200);
};

const handleKeyNavigation = (event: KeyboardEvent): void => {
    const activeEl = document.activeElement;
    if (
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl instanceof HTMLSelectElement ||
        activeEl instanceof HTMLVideoElement
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextSlide();
        return;
    }

    if (event.key === "ArrowLeft") {
        prevSlide();
    }
};

const isInteractiveTouchTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    return Boolean(
        target.closest(
            "video, button, a, input, textarea, select, [role='button'], .discussion-panel__content",
        ),
    );
};

const handleTouchStart = (event: TouchEvent): void => {
    touchStartedOnInteractive = isInteractiveTouchTarget(event.target);
    if (touchStartedOnInteractive) {
        return;
    }

    touchStartX = event.touches[0]?.clientX ?? 0;
    touchStartY = event.touches[0]?.clientY ?? 0;
};

const handleTouchEnd = (event: TouchEvent): void => {
    if (touchStartedOnInteractive || isInteractiveTouchTarget(event.target)) {
        touchStartedOnInteractive = false;
        return;
    }

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

    touchStartedOnInteractive = false;
};

const handleVideoPlay = (): void => {
    isVideoPlaying.value = true;
};

const handleVideoPause = (): void => {
    isVideoPlaying.value = false;
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

    Object.assign(script.dataset, {
        repo: giscusConfig.repo,
        repoId: giscusConfig.repoId,
        category: giscusConfig.category,
        categoryId: giscusConfig.categoryId,
        mapping: "pathname",
        strict: "0",
        reactionsEnabled: "1",
        emitMetadata: "0",
        inputPosition: "top",
        theme: "transparent_dark",
        lang: "zh-TW",
    });

    container.appendChild(script);
};

const createAmbientAudio = async (): Promise<void> => {
    if (musicPlayer !== null) {
        await musicPlayer.play();
        return;
    }

    musicPlayer = new Audio(asset("assets/music/guan_yu_song.m4a"));
    musicPlayer.loop = true;
    musicPlayer.preload = "auto";
    musicPlayer.volume = 0.42;
    await musicPlayer.play();
};

const stopAmbientAudio = async (): Promise<void> => {
    if (musicPlayer === null) {
        return;
    }

    musicPlayer.pause();
    musicPlayer.currentTime = 0;
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
    preloadNearbySlides(activeIndex.value);
    startAutoPlay();
    showChapterSubtitle();
    globalThis.addEventListener("keydown", handleKeyNavigation);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    mountGiscus();
});

watch(activeIndex, () => {
    isVideoPlaying.value = false;
    showChapterSubtitle();
    isStoryExpanded.value = false;
    preloadNearbySlides(activeIndex.value);
});

onBeforeUnmount(() => {
    stopAutoPlay();
    globalThis.removeEventListener("keydown", handleKeyNavigation);
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchend", handleTouchEnd);
    if (subtitleTimer !== null) {
        globalThis.clearTimeout(subtitleTimer);
        subtitleTimer = null;
    }
    if (musicPlayer !== null) {
        musicPlayer.pause();
        musicPlayer = null;
    }
});
</script>

<template>
    <main class="memory-page" @mouseenter="isAutoPlay = false" @mouseleave="isAutoPlay = true">
        <div class="memory-page__bg-glow"></div>
        <div class="memory-page__grain"></div>

        <transition name="chapter-subtitle">
            <div v-if="subtitleVisible" class="chapter-subtitle" aria-live="polite">
                <p class="chapter-subtitle__text">{{ chapterLabel }}</p>
            </div>
        </transition>

        <section class="hero-card">
            <p class="hero-card__eyebrow">人生回憶跑馬燈</p>
            <h1 class="hero-card__title">把人生收藏成一本可以滑動翻閱的回憶誌</h1>
            <div class="hero-stats">
                <div class="hero-stat">
                    <span class="hero-stat__label">目前章節</span>
                    <strong class="hero-stat__value">{{ activeSlide.stage }}</strong>
                </div>
                <div class="hero-stat">
                    <span class="hero-stat__label">回憶編號</span>
                    <strong class="hero-stat__value"
                        >{{ activeSlideNumber }} / {{ slides.length }}</strong
                    >
                </div>
                <div class="hero-stat">
                    <span class="hero-stat__label">稀有度</span>
                    <strong class="hero-stat__value">{{ activeRarityLabel }}</strong>
                </div>
                <div class="hero-stat">
                    <span class="hero-stat__label">完成階段</span>
                    <strong class="hero-stat__value">{{ totalStagesCompleted }}</strong>
                </div>
            </div>
            <div class="hero-actions">
                <button class="hero-action" type="button" @click="toggleMusic">
                    {{ isPlaying ? "關閉背景音" : "播放背景音" }}
                </button>
                <button
                    class="hero-action hero-action--secondary"
                    type="button"
                    @click="randomSlide"
                >
                    隨機抽卡
                </button>
            </div>
        </section>

        <section class="shell-card shell-card--progress">
            <div class="progress-head">
                <div>
                    <p class="section-kicker">回憶探索進度</p>
                    <h2 class="section-title">
                        目前已看見 {{ viewedCount }} / {{ slides.length }} 張
                    </h2>
                </div>
                <span class="progress-pill">{{ progressPercent }}%</span>
            </div>
            <div class="progress-bar" aria-hidden="true">
                <span class="progress-bar__fill" :style="{ width: `${progressPercent}%` }"></span>
            </div>
        </section>

        <section class="shell-card shell-card--timeline" aria-label="人生階段導覽">
            <div class="section-head">
                <p class="section-kicker">年代篩選</p>
                <h2 class="section-title">像翻卡片一樣切換人生階段</h2>
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
        </section>

        <section class="shell-card shell-card--story-grid">
            <div class="insight-card insight-card--daily">
                <div class="section-head section-head--compact">
                    <p class="section-kicker">今日任務</p>
                </div>
                <div v-if="isTodayDrawn && todayDrawnSlide" class="daily-task__item">
                    <span class="daily-task__emoji">{{ rarityEmoji }}</span>
                    <span class="daily-task__text">
                        已抽到 {{ todayDrawnSlide.stage }} 的「{{ todayDrawnSlide.title }}」
                    </span>
                </div>
                <div v-else class="daily-task__item daily-task__item--empty">
                    <span class="daily-task__emoji">🎴</span>
                    <span class="daily-task__text">今天還未抽卡，點一下超級喜歡試試手氣。</span>
                </div>
            </div>

            <div class="insight-card insight-card--stages">
                <div class="section-head section-head--compact">
                    <p class="section-kicker">配對進度</p>
                </div>
                <div class="stage-list">
                    <div
                        v-for="card in stageCards"
                        :key="card.stage"
                        class="stage-item"
                        :class="{ 'stage-item--completed': card.completed }"
                    >
                        <span class="stage-item__star">{{ card.completed ? "✨" : "☆" }}</span>
                        <span class="stage-item__name">{{ card.stage }}</span>
                        <span class="stage-item__progress">{{ card.viewed }}/{{ card.total }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section ref="photoZoneRef" class="photo-stage" aria-live="polite">
            <div class="photo-stage__head">
                <div>
                    <p class="section-kicker">個人卡片</p>
                    <h2 class="section-title">{{ activeSlide.title }}</h2>
                </div>
                <div class="photo-stage__meta">
                    <div class="photo-stage__curation">
                        <span class="curation-chip">{{ activeCuratorLabels.era }}</span>
                        <span class="curation-chip curation-chip--muted">
                            {{ activeCuratorLabels.theme }}
                        </span>
                    </div>
                    <span class="photo-stage__badge">{{ activeRarityLabel }}</span>
                    <span v-if="isCurrentViewed" class="photo-stage__seen">已看過</span>
                </div>
            </div>

            <div class="photo-controls-hint">
                <span class="hint-item">👈 左滑略過</span>
                <span class="hint-divider">•</span>
                <span class="hint-item">👉 右滑喜歡</span>
                <span class="hint-divider">•</span>
                <span class="hint-item">✨ 上滑超級喜歡</span>
            </div>

            <transition :name="photoTransitionName" mode="out-in">
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
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                        />
                        <video
                            v-else
                            class="photo-card__image photo-card__video"
                            :aria-label="`影片：${activeSlide.title}`"
                            :aria-describedby="`photo-caption-${activeSlide.id}`"
                            :title="activeSlide.title"
                            preload="metadata"
                            playsinline
                            webkit-playsinline="true"
                            controls
                            controlsList="nodownload"
                            @play="handleVideoPlay"
                            @pause="handleVideoPause"
                            @ended="handleVideoPause"
                        >
                            <source :src="activeSlide.image" type="video/mp4" />
                            <track
                                v-if="activeSlide.captionTrack"
                                kind="captions"
                                :src="activeSlide.captionTrack"
                                srclang="zh"
                                label="中文字幕"
                                default
                            />
                            <track
                                v-if="activeSlide.descriptionTrack"
                                kind="descriptions"
                                :src="activeSlide.descriptionTrack"
                                srclang="zh"
                                label="中文描述"
                            />
                        </video>
                    </div>
                    <figcaption :id="`photo-caption-${activeSlide.id}`" class="photo-card__caption">
                        <span v-if="isCurrentViewed" class="photo-card__badge">✓</span>
                        <span class="photo-card__rarity">{{ activeRarityLabel }}</span>
                        <span
                            v-if="activeSlide.mediaType === 'video'"
                            class="photo-card__media-type"
                        >
                            🎬
                        </span>
                        {{ activeSlide.stage }} · {{ activeSlideNumber }} / {{ slides.length }}
                    </figcaption>
                </figure>
            </transition>
        </section>

        <section
            class="story-card"
            aria-live="polite"
            :class="{ 'story-card--expanded': isStoryExpanded }"
            @click="isStoryExpanded = !isStoryExpanded"
        >
            <p class="story-card__stage">
                {{ activeSlide.stage }} · {{ activeSlideNumber }} / {{ slides.length }}
            </p>
            <blockquote class="story-card__quote">{{ activeSlide.quote }}</blockquote>
            <transition name="story-expand">
                <p v-show="isStoryExpanded" class="story-card__text">{{ activeSlide.story }}</p>
            </transition>
            <div class="story-card__toggle">
                <span class="story-card__toggle-text">
                    {{ isStoryExpanded ? "收起簡介" : "展開簡介" }}
                </span>
                <span class="story-card__toggle-icon">{{ isStoryExpanded ? "▲" : "▼" }}</span>
            </div>
        </section>

        <div class="action-bar">
            <button class="action-btn action-btn--pass" type="button" @click="prevSlide">
                略過
            </button>
            <button class="action-btn action-btn--like" type="button" @click="nextSlide">
                喜歡
            </button>
            <button class="action-btn action-btn--superlike" type="button" @click="randomSlide">
                超級喜歡
            </button>
            <button class="action-btn action-btn--ghost" type="button" @click="toggleMusic">
                {{ isPlaying ? "關閉音樂" : "播放音樂" }}
            </button>
            <button
                class="action-btn action-btn--ghost action-btn--small"
                type="button"
                @click="clearHistory"
            >
                重置記錄
            </button>
        </div>

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

:global(html) {
    overflow-x: hidden;
}

:global(body) {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
    background:
        radial-gradient(circle at 12% 0%, rgb(230 237 244 / 65%), transparent 34%),
        radial-gradient(circle at 100% 0%, rgb(224 232 241 / 52%), transparent 30%),
        linear-gradient(180deg, #f8fafc 0%, #f1f5f9 46%, #e8edf3 100%);
    color: #1f2937;
}

.memory-page {
    position: relative;
    isolation: isolate;
    width: min(100%, 100vw);
    min-height: 100vh;
    overflow-x: hidden;
    display: grid;
    gap: 1rem;
    padding: 1rem clamp(0.72rem, 3vw, 1rem) calc(7.6rem + env(safe-area-inset-bottom));
    align-content: start;
    touch-action: pan-y;
}

.memory-page::after,
.memory-page__grain {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.memory-page::after {
    background:
        radial-gradient(circle at 22% 8%, rgb(185 206 224 / 20%), transparent 36%),
        radial-gradient(circle at 88% 12%, rgb(193 211 227 / 18%), transparent 32%),
        linear-gradient(180deg, rgb(255 255 255 / 42%), rgb(148 163 184 / 10%));
    pointer-events: none;
    z-index: 1;
}

.memory-page__bg-glow {
    position: absolute;
    inset: -12%;
    background:
        radial-gradient(circle at 18% 24%, rgb(220 230 242 / 18%), transparent 34%),
        radial-gradient(circle at 78% 66%, rgb(197 214 230 / 16%), transparent 34%);
    z-index: 0;
    pointer-events: none;
}

.memory-page__grain {
    z-index: 0;
    opacity: 0.06;
    background-image:
        linear-gradient(rgb(100 116 139 / 10%) 1px, transparent 1px),
        linear-gradient(90deg, rgb(100 116 139 / 10%) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at center, black, transparent 90%);
}

.hero-card,
.shell-card,
.story-card,
.discussion-panel,
.action-bar {
    position: relative;
    z-index: 4;
    width: min(100%, 1120px);
    max-width: 100%;
    margin-inline: auto;
}

.hero-card {
    padding: 1.1rem 1rem 1.05rem;
    border-radius: 28px;
    background: linear-gradient(180deg, rgb(255 255 255 / 95%), rgb(246 249 252 / 92%));
    border: 1px solid rgb(148 163 184 / 26%);
    box-shadow:
        0 14px 38px rgb(15 23 42 / 12%),
        inset 0 1px 0 rgb(255 255 255 / 70%);
    backdrop-filter: blur(10px);
}

.hero-card__eyebrow,
.section-kicker {
    margin: 0;
    color: #475569;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.hero-card__title,
.section-title {
    margin: 0.35rem 0 0;
    color: #0f172a;
    line-height: 1.12;
    letter-spacing: -0.03em;
}

.hero-card__title {
    font-family: "Noto Serif TC", "PMingLiU", serif;
    font-size: clamp(1.55rem, 7vw, 2.7rem);
    max-width: 14ch;
}

.hero-card__description {
    margin: 0.75rem 0 0;
    color: rgb(51 65 85 / 86%);
    line-height: 1.76;
    font-size: 0.95rem;
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
    margin-top: 1rem;
}

.hero-stat {
    padding: 0.75rem 0.8rem;
    border-radius: 18px;
    background: rgb(255 255 255 / 78%);
    border: 1px solid rgb(148 163 184 / 24%);
}

.hero-stat__label {
    display: block;
    font-size: 0.72rem;
    color: rgb(100 116 139 / 74%);
    letter-spacing: 0.08em;
}

.hero-stat__value {
    display: block;
    margin-top: 0.35rem;
    font-size: 0.98rem;
    font-weight: 700;
    color: #0f172a;
}

.hero-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
    margin-top: 1rem;
}

.hero-action,
.hero-action--secondary {
    border: none;
    border-radius: 999px;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        filter 0.2s ease,
        background-color 0.2s ease;
}

.hero-action {
    color: #f8fafc;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.hero-action--secondary {
    color: #0f172a;
    background: rgb(255 255 255 / 92%);
    border: 1px solid rgb(148 163 184 / 26%);
}

.hero-action:hover,
.hero-action--secondary:hover,
.action-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.04);
}

.game-arena {
    position: relative;
    z-index: 4;
    display: grid;
    gap: 0.85rem;
    grid-template-columns: 1fr;
}

.shell-card {
    border-radius: 22px;
    padding: 1rem;
    background: linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(246 249 252 / 92%));
    border: 1px solid rgb(148 163 184 / 20%);
    box-shadow: 0 14px 32px rgb(15 23 42 / 10%);
    backdrop-filter: blur(10px);
}

.progress-head,
.section-head,
.photo-stage__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
}

.section-head--compact {
    margin-bottom: 0.4rem;
}

.section-title {
    font-size: clamp(1.05rem, 4.2vw, 1.4rem);
    max-width: 18ch;
}

.progress-pill,
.photo-stage__badge,
.photo-stage__seen,
.photo-card__rarity {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 1.9rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
}

.progress-pill {
    padding: 0.35rem 0.7rem;
    color: #0f172a;
    background: rgb(241 245 249 / 96%);
    border: 1px solid rgb(148 163 184 / 34%);
}

.progress-bar {
    width: 100%;
    height: 0.72rem;
    margin-top: 0.95rem;
    border-radius: 999px;
    background: rgb(148 163 184 / 24%);
    overflow: hidden;
}

.progress-bar__fill {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%);
    border-radius: inherit;
    transition: width 0.4s ease;
}

.shell-card--story-grid {
    display: grid;
    gap: 0.75rem;
}

.insight-card {
    border-radius: 18px;
    padding: 0.85rem;
    background: rgb(255 255 255 / 90%);
    border: 1px solid rgb(148 163 184 / 20%);
}

.insight-card--daily {
    background: linear-gradient(180deg, rgb(255 255 255 / 94%), rgb(243 247 251 / 90%));
}

.insight-card--stages {
    background: linear-gradient(180deg, rgb(248 250 253 / 94%), rgb(238 244 250 / 90%));
}

.daily-task__item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.8rem;
    border-radius: 16px;
    background: rgb(255 255 255 / 88%);
    border: 1px solid rgb(148 163 184 / 22%);
}

.daily-task__item--empty {
    background: rgb(248 250 253 / 84%);
}

.daily-task__emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 12px;
    background: rgb(30 41 59 / 10%);
    font-size: 1.15rem;
    flex-shrink: 0;
}

.daily-task__text {
    line-height: 1.55;
    font-size: 0.92rem;
    color: #334155;
}

.stage-list {
    display: grid;
    gap: 0.5rem;
}

.stage-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 0.75rem;
    border-radius: 16px;
    background: rgb(255 255 255 / 88%);
    border: 1px solid rgb(148 163 184 / 22%);
    opacity: 0.78;
}

.stage-item--completed {
    opacity: 1;
    background: rgb(237 246 255 / 98%);
    border-color: rgb(56 189 248 / 34%);
}

.stage-item__star {
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    flex-shrink: 0;
}

.stage-item__name {
    flex: 1;
    font-size: 0.88rem;
    font-weight: 600;
    color: #1e293b;
}

.stage-item__progress {
    font-size: 0.78rem;
    color: rgb(71 85 105 / 78%);
    font-weight: 700;
    min-width: 2.2rem;
    text-align: right;
}

.photo-card__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.75rem;
    padding: 0 0.55rem;
    color: #2563eb;
    font-weight: 700;
}

.photo-card__rarity {
    padding: 0 0.55rem;
    margin-right: 0.45rem;
    background: rgb(241 245 249 / 96%);
    color: #1e293b;
}

.photo-card {
    margin: 0;
    background: linear-gradient(180deg, rgb(255 255 255 / 100%), rgb(244 248 252 / 100%));
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid rgb(148 163 184 / 22%);
    transition:
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}

.photo-card--rare {
    border-color: rgb(14 165 233 / 62%);
    box-shadow:
        0 0 16px rgb(14 165 233 / 16%),
        inset 0 0 10px rgb(14 165 233 / 8%);
}

.photo-card--legendary {
    border-color: rgb(37 99 235 / 72%);
    box-shadow:
        0 0 20px rgb(37 99 235 / 20%),
        0 0 36px rgb(14 165 233 / 10%),
        inset 0 0 10px rgb(37 99 235 / 8%);
}

.photo-card__container {
    overflow: hidden;
    background: linear-gradient(180deg, rgb(255 255 255 / 100%), rgb(241 245 249 / 100%));
    touch-action: manipulation;
    max-height: min(74vh, 42rem);
}

.photo-card__video {
    width: 100%;
    height: auto;
    aspect-ratio: auto;
    object-fit: contain !important;
    filter: none;
    background: #000;
}

.photo-card__image.photo-card__video {
    filter: none;
    background: #000;
}

.photo-card__video::cue {
    background: rgba(0, 0, 0, 0.5);
}

.photo-card__media-type {
    display: inline-block;
    margin-right: 0.3rem;
    font-size: 0.9rem;
}

.photo-stage {
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 24px;
    background: linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(245 249 252 / 92%));
    border: 1px solid rgb(148 163 184 / 24%);
    box-shadow:
        0 18px 42px rgb(15 23 42 / 12%),
        inset 0 1px 0 rgb(255 255 255 / 65%);
}

.photo-stage .section-title {
    color: #111827;
}

.photo-stage__meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
    max-width: 100%;
}

.photo-stage__curation {
    display: inline-flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-right: auto;
}

.curation-chip {
    display: inline-flex;
    align-items: center;
    min-height: 1.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    color: #1f2937;
    background: rgb(233 242 252 / 92%);
    border: 1px solid rgb(59 130 246 / 24%);
}

.curation-chip--muted {
    color: #475569;
    background: rgb(241 245 249 / 96%);
    border-color: rgb(148 163 184 / 28%);
}

.photo-stage__badge {
    padding: 0.35rem 0.7rem;
    color: #1e293b;
    background: rgb(241 245 249 / 96%);
    border: 1px solid rgb(148 163 184 / 34%);
}

.photo-stage__seen {
    padding: 0.35rem 0.7rem;
    color: #184333;
    background: rgb(222 245 232 / 88%);
    border: 1px solid rgb(86 155 126 / 30%);
}

.photo-controls-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.55rem 0.7rem;
    background: rgb(255 255 255 / 92%);
    border: 1px solid rgb(148 163 184 / 30%);
    border-radius: 14px;
    font-size: 0.78rem;
    color: #475569;
    flex-wrap: wrap;
}

.hint-item {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
}

.hint-item kbd {
    background: rgb(14 165 233 / 12%);
    border: 1px solid rgb(14 165 233 / 36%);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-family: monospace;
    font-size: 0.75rem;
    font-weight: 600;
}

.hint-divider {
    color: rgb(100 116 139 / 52%);
    margin: 0 0.2rem;
}

.photo-card__image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: auto;
    max-height: min(68vh, 46rem);
    object-fit: contain;
    background: #f8fafc;
    user-select: none;
    touch-action: manipulation;
    -webkit-user-select: none;
    filter: saturate(1.08) contrast(1.05) brightness(1.03);
}

.photo-card__image:not(.photo-card__video) {
    filter: saturate(1.08) contrast(1.05) brightness(1.03);
}

.photo-card__caption {
    margin: 0;
    padding: 0.7rem 0.85rem 0.8rem;
    font-size: 0.85rem;
    color: #334155;
    letter-spacing: 0.03em;
    background: rgb(248 250 252 / 92%);
}

.photo-swipe-left-enter-active,
.photo-swipe-left-leave-active,
.photo-swipe-right-enter-active,
.photo-swipe-right-leave-active,
.photo-swipe-up-enter-active,
.photo-swipe-up-leave-active {
    transition:
        opacity 0.28s ease,
        transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-swipe-left-enter-from {
    opacity: 0;
    transform: translateX(18%) scale(0.98);
}

.photo-swipe-left-leave-to {
    opacity: 0;
    transform: translateX(-18%) scale(0.98);
}

.photo-swipe-right-enter-from {
    opacity: 0;
    transform: translateX(-18%) scale(0.98);
}

.photo-swipe-right-leave-to {
    opacity: 0;
    transform: translateX(18%) scale(0.98);
}

.photo-swipe-up-enter-from {
    opacity: 0;
    transform: translateY(18%) scale(0.97) rotate(-1deg);
}

.photo-swipe-up-leave-to {
    opacity: 0;
    transform: translateY(-14%) scale(0.97) rotate(1deg);
}

.story-card {
    position: relative;
    z-index: 6;
    width: 100%;
    padding: 1rem 0.95rem 1.05rem;
    border-radius: 22px;
    background: linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%);
    color: #1f2937;
    border: 1px solid rgb(148 163 184 / 24%);
    box-shadow: 0 16px 36px rgb(15 23 42 / 12%);
    cursor: pointer;
    transition:
        transform 0.2s ease,
        max-height 0.3s ease;
    max-height: 18rem;
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
    background: linear-gradient(165deg, rgb(255 255 255 / 52%), transparent 45%);
}

.story-card__stage {
    margin: 0;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
}

.story-card__title {
    margin: 0.65rem 0 0;
    font-size: clamp(1.35rem, 5vw, 2.15rem);
    line-height: 1.18;
    font-weight: 700;
}

.story-card__quote {
    margin: 0.85rem 0 0;
    padding: 0.7rem 0.9rem;
    border-left: 4px solid #0ea5e9;
    border-radius: 0 14px 14px 0;
    font-size: clamp(0.98rem, 2.1vw, 1.08rem);
    color: #334155;
    background: rgb(241 245 249 / 82%);
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
    color: #475569;
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
    position: sticky;
    top: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
    width: fit-content;
    background: rgb(255 255 255 / 82%);
    border: 1px solid rgb(148 163 184 / 30%);
    border-radius: 999px;
    padding: 0.45rem 1rem;
    backdrop-filter: blur(14px);
}

.chapter-subtitle__text {
    margin: 0;
    letter-spacing: 0.05em;
    color: #1e293b;
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
    background: transparent;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.1rem 0 0.2rem;
    scroll-snap-type: x proximity;
}

.timeline__item {
    border: 1px solid rgb(148 163 184 / 28%);
    background: rgb(255 255 255 / 90%);
    color: #334155;
    border-radius: 999px;
    padding: 0.55rem 0.8rem;
    cursor: pointer;
    flex: 0 0 auto;
    white-space: nowrap;
    scroll-snap-align: start;
    transition:
        transform 0.28s ease,
        border-color 0.28s ease,
        background-color 0.28s ease;
}

.timeline__item:hover {
    transform: translateY(-2px);
}

.timeline__item--active {
    border-color: rgb(14 165 233 / 44%);
    background: rgb(232 244 255 / 96%);
    color: #0f172a;
}

.action-bar {
    z-index: 8;
    position: sticky;
    bottom: calc(0.7rem + env(safe-area-inset-bottom));
    background: rgb(255 255 255 / 88%);
    border: 1px solid rgb(148 163 184 / 28%);
    border-radius: 22px;
    padding: 0.85rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    backdrop-filter: blur(18px);
    box-shadow: 0 16px 34px rgb(15 23 42 / 14%);
}

.action-btn {
    border: 0;
    border-radius: 999px;
    padding: 0.75rem 1rem;
    background: #ffffff;
    color: #1f2937;
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
    transition:
        transform 0.24s ease,
        filter 0.24s ease;
    min-height: 2.8rem;
}

.action-btn--ghost {
    background: rgb(248 250 252 / 92%);
    color: #334155;
    border: 1px solid rgb(148 163 184 / 28%);
}

.action-btn--pass {
    background: linear-gradient(135deg, #e5e7eb 0%, #cbd5e1 100%);
    color: #0f172a;
}

.action-btn--like {
    background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
    color: #0b1324;
}

.action-btn--superlike {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
}

.action-btn--small {
    padding: 0.45rem 0.6rem;
    font-size: 0.85rem;
}

.discussion-panel {
    position: relative;
    z-index: 6;
    border-radius: 22px;
    padding: 0.95rem;
    background: linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(245 249 252 / 92%));
    border: 1px solid rgb(148 163 184 / 24%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 22rem;
}

.discussion-panel__head {
    padding: 0.1rem 0.2rem 0.8rem;
}

.discussion-panel__title {
    margin: 0;
    color: #111827;
    font-size: 1.05rem;
}

.discussion-panel__desc {
    margin: 0.35rem 0 0.75rem;
    color: rgb(71 85 105 / 82%);
    font-size: 0.9rem;
}

.discussion-panel__content {
    border-radius: 16px;
    overflow: auto;
    background: rgb(255 255 255 / 90%);
    flex: 1;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
}

.photo-swipe-left-enter-active,
.photo-swipe-left-leave-active,
.photo-swipe-right-enter-active,
.photo-swipe-right-leave-active,
.photo-swipe-up-enter-active,
.photo-swipe-up-leave-active,
.story-expand-enter-active,
.story-expand-leave-active,
.chapter-subtitle-enter-active,
.chapter-subtitle-leave-active {
    transition: opacity 0.28s ease;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
    }
}

@media (max-width: 560px) {
    .memory-page {
        padding-top: 0.85rem;
        padding-left: calc(0.72rem + env(safe-area-inset-left));
        padding-right: calc(1.02rem + env(safe-area-inset-right));
        padding-bottom: calc(8rem + env(safe-area-inset-bottom));
    }

    .hero-card__title {
        max-width: 12ch;
    }

    .shell-card--story-grid {
        grid-template-columns: 1fr;
    }

    .action-btn {
        width: calc(50% - 0.25rem);
        min-width: 0;
        font-size: 0.92rem;
    }

    .timeline {
        padding-bottom: 0.1rem;
        scrollbar-width: none;
    }

    .timeline::-webkit-scrollbar {
        display: none;
    }

    .photo-stage__head {
        flex-wrap: wrap;
    }

    .photo-stage__meta {
        width: 100%;
        justify-content: flex-start;
    }

    .photo-card__image {
        max-height: 56vh;
        object-fit: contain;
        filter: saturate(1.04) contrast(1.04) brightness(1.02);
    }

    .photo-card__video {
        background: #020617;
        box-shadow: inset 0 0 0 1px rgb(148 163 184 / 18%);
    }

    .photo-card__container {
        max-height: none;
    }

    .discussion-panel {
        min-height: 18rem;
    }
}

@media (min-width: 720px) {
    .memory-page {
        padding: 1.25rem 1rem 4rem;
        gap: 1rem;
    }

    .hero-card {
        padding: 1.35rem 1.4rem;
    }

    .hero-stats {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .hero-actions {
        grid-template-columns: repeat(2, max-content);
        justify-content: start;
    }

    .shell-card {
        padding: 1.1rem;
    }

    .shell-card--story-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .photo-stage {
        padding: 1.1rem;
    }

    .photo-card__image {
        max-height: min(70vh, 52rem);
        object-fit: contain;
        filter: saturate(1.06) contrast(1.05) brightness(1.02);
    }

    .story-card {
        padding: 1.1rem 1.1rem 1.15rem;
    }

    .action-bar {
        position: static;
    }

    .discussion-panel {
        min-height: 26rem;
    }
}

@media (min-width: 1024px) {
    .memory-page {
        max-width: 1220px;
        margin: 0 auto;
        padding-bottom: 4.5rem;
    }

    .hero-card__title {
        max-width: 16ch;
    }

    .shell-card--story-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .photo-stage {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
