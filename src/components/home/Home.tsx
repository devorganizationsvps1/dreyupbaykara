"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { HomeDoctorCard } from "./HomeDoctorCard";
import { HomeTreatmentCards } from "./HomeTreatmentCards";
import { useHomeProgress } from "./useHomeProgress";
import { HOME_FALLBACK, type HomeSections } from "@/lib/cms/home";
import {
  SPINE_POSTER,
  SPINE_POSTER_HEIGHT,
  SPINE_POSTER_WIDTH,
} from "./spine-asset";
import "./spine-preload";

const SpineScene = dynamic(() => import("./SpineScene"), { ssr: false });
const HomeBelowFold = dynamic(() => import("./HomeBelowFold"));

const DESKTOP_MQ = "(min-width: 1024px)";

/** Desktop: kırmızı fıtık/kamera detayı biraz daha geç başlasın */
const DESKTOP_DETAIL_START = 0.18;
/** Mobil: önce kart kaybolup omurga belirsin, yakınlaşma ondan sonra başlasın */
const MOBILE_DETAIL_START = 0.4;
/** Mobilde omurganın belirmeye başladığı / tamamen göründüğü kaydırma oranı */
const MOBILE_SPINE_FADE: [number, number] = [0.14, 0.38];

function mapSceneProgress(raw: number, start: number): number {
  if (raw <= start) return 0;
  return Math.min(1, (raw - start) / (1 - start));
}

export default function Home({
  sections = HOME_FALLBACK,
}: {
  sections?: HomeSections;
}) {
  const wrapperRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  /** Mobilde 3B sahne ilk kaydırmaya kadar indirilmez; o ana kadar poster yeter. */
  const [mobileScrolled, setMobileScrolled] = useState(false);
  const { progressRef, scrollYProgress } = useHomeProgress(wrapperRef);
  const sceneProgressRef = useRef(0);

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const textPE = useTransform(scrollYProgress, (v) =>
    v > 0.3 ? "none" : "auto",
  );

  const textVisibility = useTransform(scrollYProgress, (v) =>
    v > 0.36 ? "hidden" : "visible",
  );
  // Masaüstünde `lg:opacity-100!` bu değeri ezer: omurga orada hep görünür.
  const mobileSpineOpacity = useTransform(
    scrollYProgress,
    MOBILE_SPINE_FADE,
    [0, 1],
  );

  const flashOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);

  useEffect(() => {
    if (mobileScrolled) return;
    return scrollYProgress.on("change", (v) => {
      if (v > 0.005) setMobileScrolled(true);
    });
  }, [mobileScrolled, scrollYProgress]);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showScene = isDesktop || mobileScrolled;

  useEffect(() => {
    if (!showScene) {
      sceneProgressRef.current = 0;
      return;
    }
    const start = isDesktop ? DESKTOP_DETAIL_START : MOBILE_DETAIL_START;
    let raf = 0;
    let running = true;
    const tick = () => {
      if (!running) return;
      sceneProgressRef.current = mapSceneProgress(progressRef.current, start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [showScene, isDesktop, progressRef]);

  return (
    <>
      <section
        id="home"
        ref={wrapperRef}
        // Mobilde `svh`: adres çubuğu kaydırırken gizlenince `dvh` değişir,
        // bölüm boyu oynar ve kaydırma oranı sıçrar.
        className="relative h-[280svh] bg-bg lg:h-[280vh]"
        aria-label="Ana sayfa bölümü"
      >
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-bg">
          <div className="absolute inset-0 z-[1] bg-bg">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              <div className="absolute left-1/4 top-1/4 h-[55dvh] w-[55dvh] rounded-full bg-accent/15 blur-[120px]" />
              <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-bg to-transparent" />
            </div>
          </div>

          {/*
            Omurga katmanı. Masaüstünde hep görünür; mobilde kart kaybolurken
            kaydırmayla belirir. Poster HTML ile birlikte gelir ve 3B sahne
            (three.js + GLB) inene kadar modelin yerini tutar, sahne çizilince
            solar. Kamera dikey görüş açısıyla çalıştığı için model her ekranda
            yüksekliğe göre ölçeklenir: tam yükseklikte, yatayda ortalı görsel
            sahneyle üst üste biner.
          */}
          <motion.div
            suppressHydrationWarning
            style={{ opacity: mobileSpineOpacity }}
            className="pointer-events-none absolute inset-0 z-[8] lg:opacity-100!"
          >
            {showScene ? (
              <div className="absolute inset-0">
                <SpineScene
                  progressRef={sceneProgressRef}
                  onReady={() => setSceneReady(true)}
                />
              </div>
            ) : null}

            {/* eslint-disable-next-line @next/next/no-img-element -- şeffaf, sabit boyutlu poster; optimizasyon gereksiz */}
            <img
              src={SPINE_POSTER}
              alt=""
              aria-hidden="true"
              width={SPINE_POSTER_WIDTH}
              height={SPINE_POSTER_HEIGHT}
              decoding="async"
              className={`absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 transition-opacity duration-300 ease-out ${
                sceneReady ? "opacity-0" : "opacity-100"
              }`}
            />
          </motion.div>

          <HomeDoctorCard
            hero={sections.hero}
            style={{ opacity: textOpacity, y: textY }}
          />

          <motion.div
            suppressHydrationWarning
            style={{
              opacity: textOpacity,
              y: textY,
            }}
            className="pointer-events-none absolute inset-0 z-10 hidden items-center pt-32 lg:flex"
          >
            <div className="flex w-full justify-start pl-10 pr-[48%] xl:pl-12">
              <HomeTreatmentCards hero={sections.hero} pointerEvents={textPE} />
            </div>
          </motion.div>

          <motion.div
            suppressHydrationWarning
            style={{
              opacity: textOpacity,
              y: textY,
              visibility: textVisibility,
            }}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col px-3 pb-3 pt-[6.75rem] lg:hidden"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 rounded-[1.5rem] bg-[#fdfaf5] p-3 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <HomeDoctorCard hero={sections.hero} mobile />
              <HomeTreatmentCards
                hero={sections.hero}
                pointerEvents={textPE}
                compact
              />
            </div>
          </motion.div>

          <motion.div
            suppressHydrationWarning
            style={{
              opacity: flashOpacity,
              background:
                "radial-gradient(circle at center, rgba(11,107,69,0.16), #fdfaf5 72%)",
            }}
            className="pointer-events-none absolute inset-0 z-[4]"
            aria-hidden="true"
          />
        </div>
      </section>

      <HomeBelowFold sections={sections} />
    </>
  );
}
