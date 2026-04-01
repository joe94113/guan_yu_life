<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type LifeStage = "小孩時期" | "國中" | "高中" | "大學" | "出社會" | "飛昇";

interface SlideItem {
    id: string;
    stage: LifeStage;
    title: string;
    quote: string;
    story: string;
    image: string;
}

const giscusConfig = {
    repo: "joe94113/guan_yu_life",
    repoId: "R_kgDOExampleRepoId",
    category: "General",
    categoryId: "DIC_kwDOExampleCategoryId",
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
    },
    {
        id: "childhood-2",
        stage: "小孩時期",
        title: "全家福的餐桌笑聲",
        quote: "長大後才懂，最珍貴的是有人等你吃飯。",
        story: "每個週末全家一起吃飯，長輩的叮嚀和笑聲，慢慢成了我最穩定的安全感。",
        image: "https://picsum.photos/id/1027/1600/1000",
    },
    {
        id: "junior-1",
        stage: "國中",
        title: "第一次在講台上發光",
        quote: "那時候我才知道，原來緊張也可以很勇敢。",
        story: "班會報告前手心全是汗，但講完後全班鼓掌。那一刻把我從害怕拉向自信。",
        image: "https://picsum.photos/id/1040/1600/1000",
    },
    {
        id: "junior-2",
        stage: "國中",
        title: "放學後的操場晚風",
        quote: "追著夕陽跑的那段路，後來再也沒那麼長。",
        story: "每天傍晚都在操場多留十分鐘，和朋友聊夢想、聊未來，聊著聊著就長大了。",
        image: "https://picsum.photos/id/1025/1600/1000",
    },
    {
        id: "senior-1",
        stage: "高中",
        title: "夜讀與咖啡香",
        quote: "日子很硬，但心越來越有方向。",
        story: "考前一個月幾乎天天留校，和同學互相抽問，熬夜寫題目也不覺得孤單。",
        image: "https://picsum.photos/id/1067/1600/1000",
    },
    {
        id: "senior-2",
        stage: "高中",
        title: "畢業前的最後一拍",
        quote: "我們都笑著說再見，卻沒人真的準備好。",
        story: "制服別上小卡，交換祝福。快門聲落下時，我們把青春封進了一張照片。",
        image: "https://picsum.photos/id/1074/1600/1000",
    },
    {
        id: "college-1",
        stage: "大學",
        title: "大學一 · 呆滯表情",
        quote: "那個放空瞬間，反而最像真實的我。",
        story: "把大學生活的疲憊與可愛都留在這張呆滯表情裡。",
        image: asset("assets/images/college/1.jpg"),
    },
    {
        id: "college-2",
        stage: "大學",
        title: "大學二 · 租屋處床上自拍",
        quote: "日常很普通，但每張都值得收藏。",
        story: "在租屋處床上拍下的自拍，是那段獨立生活最直接的紀錄。",
        image: asset("assets/images/college/2.jpg"),
    },
    {
        id: "college-3",
        stage: "大學",
        title: "大學三 · 租屋處床上睡著",
        quote: "努力到睡著，也是青春的一種證明。",
        story: "專題、報告、打工交錯的日子，最後倒在床上瞬間入睡。",
        image: asset("assets/images/college/3.jpg"),
    },
    {
        id: "college-4",
        stage: "大學",
        title: "大學四 · 帥氣釣魚照",
        quote: "課業之外，也要有讓自己發光的時刻。",
        story: "釣魚那天風很大，但拍下了最有型的一張。",
        image: asset("assets/images/college/4.jpg"),
    },
    {
        id: "college-5",
        stage: "大學",
        title: "大學五 · 與聖誕樹合照",
        quote: "每個節日，都有值得被記住的笑容。",
        story: "在學校聖誕樹旁留下合照，替那年冬天做了最暖的註解。",
        image: asset("assets/images/college/5.jpg"),
    },
    {
        id: "college-6",
        stage: "大學",
        title: "大學六 · 專題發表與燈泡",
        quote: "靈感真的會在壓力裡發亮。",
        story: "專題發表當天與燈泡合照，像是把一路上的想法正式點亮。",
        image: asset("assets/images/college/6.jpg"),
    },
    {
        id: "college-7",
        stage: "大學",
        title: "大學七 · 畢業旅行馬路比 YA",
        quote: "畢業不是結束，是更自由的開場。",
        story: "畢業旅行在馬路上被拍下比 YA 的瞬間，像在跟青春敬禮。",
        image: asset("assets/images/college/7.jpg"),
    },
    {
        id: "work-1",
        stage: "出社會",
        title: "出社會一 · 露營手拿咖啡和車",
        quote: "長大後的自由，是自己安排的風景。",
        story: "露營時手拿咖啡和車子的合照，記錄工作之外喘口氣的時刻。",
        image: asset("assets/images/work/1.jpg"),
    },
    {
        id: "work-2",
        stage: "出社會",
        title: "出社會二 · 露營太熱裸上半身睡覺",
        quote: "有時候最舒服的休息，就是完全放鬆。",
        story: "露營天氣太熱，在帳篷旁裸上半身睡著，留下很真實的一張。",
        image: asset("assets/images/work/2.jpg"),
    },
    {
        id: "work-3",
        stage: "出社會",
        title: "出社會三 · 眼鏡趣味照",
        quote: "成熟裡也要留一點搞怪。",
        story: "用眼鏡玩出特別角度的趣味照片，幫忙碌生活加上一點幽默。",
        image: asset("assets/images/work/3.jpg"),
    },
    {
        id: "ascension-1",
        stage: "飛昇",
        title: "飛昇 · 下一章",
        quote: "過去都被好好收藏，未來正要開始。",
        story: "這一張代表新的篇章，把前面所有回憶都帶著一起前進。",
        image: asset("assets/images/ascension/1.jpg"),
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

let autoPlayTimer: number | null = null;
let subtitleTimer: number | null = null;
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillatorA: OscillatorNode | null = null;
let oscillatorB: OscillatorNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;

const activeSlide = computed<SlideItem>(() => slides[activeIndex.value] ?? fallbackSlide);
const activeStage = computed(() => activeSlide.value.stage);

const nextSlide = (): void => {
    activeIndex.value = (activeIndex.value + 1) % slides.length;
};

const prevSlide = (): void => {
    activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
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
    startAutoPlay();
    showChapterSubtitle();
    await createAmbientAudio();
    window.addEventListener("keydown", handleKeyNavigation);
    mountGiscus();
});

watch(activeIndex, () => {
    showChapterSubtitle();
});

onBeforeUnmount(() => {
    stopAutoPlay();
    window.removeEventListener("keydown", handleKeyNavigation);
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

        <section class="carousel" aria-label="人生跑馬燈輪播">
            <article
                v-for="(slide, index) in slides"
                :key="slide.id"
                class="carousel__slide"
                :class="{ 'carousel__slide--active': index === activeIndex }"
            >
                <img :src="slide.image" :alt="slide.title" class="carousel__image" />
            </article>
        </section>

        <div class="particles" aria-hidden="true">
            <span v-for="i in 28" :key="`p-${i}`" class="particles__dot"></span>
        </div>

        <transition name="chapter-subtitle">
            <div v-if="subtitleVisible" class="chapter-subtitle" aria-live="polite">
                <p class="chapter-subtitle__text">{{ chapterLabel }}</p>
            </div>
        </transition>

        <section
            class="story-card"
            :style="{ '--tilt': `${(activeIndex % 5) - 2}deg` }"
            aria-live="polite"
        >
            <p class="story-card__stage">
                {{ activeSlide.stage }} · {{ activeIndex + 1 }} / {{ slides.length }}
            </p>
            <h1 class="story-card__title">{{ activeSlide.title }}</h1>
            <blockquote class="story-card__quote">{{ activeSlide.quote }}</blockquote>
            <p class="story-card__text">{{ activeSlide.story }}</p>
        </section>

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

        <div class="action-bar">
            <button class="action-btn" type="button" @click="toggleMusic">
                {{ isPlaying ? "靜音背景音" : "播放背景音" }}
            </button>
            <button class="action-btn action-btn--ghost" type="button" @click="prevSlide">
                上一段回憶
            </button>
            <button class="action-btn action-btn--ghost" type="button" @click="nextSlide">
                下一段回憶
            </button>
        </div>

        <section class="discussion-panel" aria-label="留言區">
            <h2 class="discussion-panel__title">回憶討論區</h2>
            <p class="discussion-panel__desc">
                使用 GitHub Discussions 留言，和朋友一起補完每段故事。
            </p>
            <div id="giscus-host"></div>
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
    font-family: "Noto Serif TC", "Microsoft JhengHei", serif;
    background: #09070f;
}

.memory-page {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 2rem 1.2rem 2.4rem;
    color: #fdf8ea;
}

.memory-page::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 12% 10%, rgb(255 235 181 / 22%), transparent 38%),
        radial-gradient(circle at 86% 84%, rgb(255 161 90 / 18%), transparent 34%),
        linear-gradient(180deg, rgb(10 9 19 / 40%), rgb(5 4 10 / 75%));
    pointer-events: none;
    z-index: 2;
}

.memory-page__bg-glow {
    position: absolute;
    inset: -20%;
    background: conic-gradient(
        from 120deg,
        rgb(102 181 255 / 18%),
        transparent,
        rgb(255 204 128 / 14%)
    );
    animation: drift 18s ease-in-out infinite alternate;
    z-index: 1;
}

.carousel {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.carousel__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: scale(1.08);
    transition:
        opacity 1.4s ease,
        transform 7s ease;
}

.carousel__slide--active {
    opacity: 1;
    transform: scale(1);
}

.carousel__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.82) contrast(1.03) brightness(0.78);
}

.particles {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 3;
    pointer-events: none;
}

.particles__dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: rgb(255 245 210 / 70%);
    box-shadow: 0 0 16px rgb(255 206 115 / 60%);
    top: -10%;
    left: calc(var(--index, 1) * 3%);
    animation: float-down linear infinite;
    opacity: 0;
}

.particles__dot:nth-child(odd) {
    width: 5px;
    height: 5px;
    background: rgb(164 225 255 / 66%);
}

.particles__dot:nth-child(1) {
    left: 3%;
    animation-duration: 12s;
    animation-delay: 0.6s;
}

.particles__dot:nth-child(2) {
    left: 8%;
    animation-duration: 14s;
    animation-delay: 1.2s;
}

.particles__dot:nth-child(3) {
    left: 13%;
    animation-duration: 9s;
    animation-delay: 0.8s;
}

.particles__dot:nth-child(4) {
    left: 19%;
    animation-duration: 10s;
    animation-delay: 1.1s;
}

.particles__dot:nth-child(5) {
    left: 24%;
    animation-duration: 15s;
    animation-delay: 2.2s;
}

.particles__dot:nth-child(6) {
    left: 30%;
    animation-duration: 11s;
    animation-delay: 0.4s;
}

.particles__dot:nth-child(7) {
    left: 35%;
    animation-duration: 12s;
    animation-delay: 1.7s;
}

.particles__dot:nth-child(8) {
    left: 39%;
    animation-duration: 8s;
    animation-delay: 0.9s;
}

.particles__dot:nth-child(9) {
    left: 45%;
    animation-duration: 13s;
    animation-delay: 2.3s;
}

.particles__dot:nth-child(10) {
    left: 50%;
    animation-duration: 16s;
    animation-delay: 1.2s;
}

.particles__dot:nth-child(11) {
    left: 54%;
    animation-duration: 10s;
    animation-delay: 0.7s;
}

.particles__dot:nth-child(12) {
    left: 59%;
    animation-duration: 9s;
    animation-delay: 1.8s;
}

.particles__dot:nth-child(13) {
    left: 63%;
    animation-duration: 12s;
    animation-delay: 0.3s;
}

.particles__dot:nth-child(14) {
    left: 67%;
    animation-duration: 14s;
    animation-delay: 2s;
}

.particles__dot:nth-child(15) {
    left: 71%;
    animation-duration: 8s;
    animation-delay: 1.1s;
}

.particles__dot:nth-child(16) {
    left: 75%;
    animation-duration: 13s;
    animation-delay: 0.5s;
}

.particles__dot:nth-child(17) {
    left: 79%;
    animation-duration: 12s;
    animation-delay: 1.6s;
}

.particles__dot:nth-child(18) {
    left: 83%;
    animation-duration: 11s;
    animation-delay: 0.9s;
}

.particles__dot:nth-child(19) {
    left: 87%;
    animation-duration: 15s;
    animation-delay: 2.1s;
}

.particles__dot:nth-child(20) {
    left: 91%;
    animation-duration: 10s;
    animation-delay: 0.4s;
}

.particles__dot:nth-child(21) {
    left: 6%;
    animation-duration: 13s;
    animation-delay: 3s;
}

.particles__dot:nth-child(22) {
    left: 17%;
    animation-duration: 9s;
    animation-delay: 2.8s;
}

.particles__dot:nth-child(23) {
    left: 28%;
    animation-duration: 12s;
    animation-delay: 3.4s;
}

.particles__dot:nth-child(24) {
    left: 46%;
    animation-duration: 14s;
    animation-delay: 2.5s;
}

.particles__dot:nth-child(25) {
    left: 58%;
    animation-duration: 11s;
    animation-delay: 2.9s;
}

.particles__dot:nth-child(26) {
    left: 66%;
    animation-duration: 16s;
    animation-delay: 3.1s;
}

.particles__dot:nth-child(27) {
    left: 78%;
    animation-duration: 10s;
    animation-delay: 3.6s;
}

.particles__dot:nth-child(28) {
    left: 93%;
    animation-duration: 12s;
    animation-delay: 2.7s;
}

.story-card {
    position: relative;
    z-index: 4;
    width: min(90vw, 620px);
    padding: 1.1rem 1.1rem 1.9rem;
    border-radius: 10px;
    background: #f8f2e5;
    color: #2f241f;
    border: 11px solid #fff;
    box-shadow: 0 25px 75px rgb(0 0 0 / 45%);
    transform: rotate(var(--tilt));
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

.chapter-subtitle {
    position: absolute;
    top: 8.5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 6;
    background: rgb(0 0 0 / 44%);
    border: 1px solid rgb(255 243 220 / 42%);
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
    position: absolute;
    left: 1.3rem;
    top: 50%;
    z-index: 5;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.timeline__item {
    border: 0;
    border-left: 2px solid rgb(255 255 255 / 44%);
    background: rgb(7 6 15 / 42%);
    color: rgb(248 236 216 / 88%);
    border-radius: 0 10px 10px 0;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    text-align: left;
    transition:
        transform 0.28s ease,
        border-color 0.28s ease,
        background-color 0.28s ease;
}

.timeline__item:hover {
    transform: translateX(6px);
}

.timeline__item--active {
    border-left-color: #ffc47c;
    background: rgb(255 175 97 / 24%);
    color: #fff9ea;
}

.action-bar {
    position: absolute;
    right: 1.2rem;
    bottom: 1.1rem;
    z-index: 6;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.action-btn {
    border: 0;
    border-radius: 999px;
    padding: 0.55rem 0.95rem;
    background: #ffe7b2;
    color: #4a331f;
    cursor: pointer;
    font-weight: 600;
    transition:
        transform 0.24s ease,
        filter 0.24s ease;
}

.action-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
}

.action-btn--ghost {
    background: rgb(255 255 255 / 19%);
    color: #fff6e6;
    border: 1px solid rgb(255 255 255 / 35%);
}

.action-btn--discussion {
    background: #ffe0c8;
    color: #5a3123;
}

.discussion-panel {
    position: absolute;
    left: 50%;
    bottom: 6.4rem;
    transform: translateX(-50%);
    z-index: 6;
    width: min(92vw, 860px);
    max-height: 36vh;
    overflow: auto;
    border-radius: 16px;
    padding: 0.8rem 1rem 1rem;
    background: rgb(8 8 16 / 62%);
    border: 1px solid rgb(255 231 196 / 26%);
    backdrop-filter: blur(8px);
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

@keyframes float-down {
    0% {
        transform: translateY(-10vh) translateX(0) scale(0.6);
        opacity: 0;
    }

    15% {
        opacity: 0.9;
    }

    100% {
        transform: translateY(110vh) translateX(48px) scale(1.1);
        opacity: 0;
    }
}

@keyframes drift {
    from {
        transform: rotate(-7deg) scale(1.03);
    }

    to {
        transform: rotate(7deg) scale(1.12);
    }
}

@media (max-width: 900px) {
    .memory-page {
        align-items: center;
        padding-bottom: 15rem;
    }

    .timeline {
        top: auto;
        left: 50%;
        bottom: 6rem;
        transform: translateX(-50%);
        flex-direction: row;
    }

    .timeline__item {
        border-left: 0;
        border-bottom: 2px solid rgb(255 255 255 / 45%);
        border-radius: 10px 10px 0 0;
    }

    .timeline__item--active {
        border-bottom-color: #ffc47c;
    }

    .action-bar {
        left: 0.8rem;
        right: 0.8rem;
        justify-content: center;
    }

    .discussion-panel {
        bottom: 8.8rem;
        max-height: 28vh;
    }
}

@media (max-width: 560px) {
    .story-card {
        width: min(94vw, 520px);
        padding: 1rem 0.9rem 1.5rem;
        transform: none;
    }

    .action-btn {
        width: calc(50% - 0.4rem);
        min-width: 140px;
    }

    .discussion-panel {
        bottom: 9.8rem;
        max-height: 24vh;
    }
}
</style>
