"use client";

import React, { useState, useRef, useEffect } from "react";
import { RoughMark } from "./SketchPrimitives";

interface ReelItem {
  id: number;
  title: string;
  hook: string;
  videoSrc: string;
  instagramUrl: string;
  date: string;
  stats: string;
}

const founderReels: ReelItem[] = [
  {
    id: 1,
    title: "How MarketInc generates revenue",
    hook: "“We help service businesses get more calls + enquiries than they can handle.”",
    videoSrc: "/reels/reel-1.mp4",
    instagramUrl: "https://www.instagram.com/ujjwalmah/reel/DUQHwp4kTKL/",
    date: "Feb 2026",
    stats: "6.2K+ views",
  },
  {
    id: 2,
    title: "Building the agency team",
    hook: "“Building the Sydney operations & culture behind client growth.”",
    videoSrc: "/reels/reel-2.mp4",
    instagramUrl: "https://www.instagram.com/ujjwalmah/reel/DQ_ZgxCEcc8/",
    date: "Nov 2025",
    stats: "1.2K+ views",
  },
  {
    id: 3,
    title: "From intern to agency founder",
    hook: "“The exact process that took me from marketing intern to running MarketInc.”",
    videoSrc: "/reels/reel-3.mp4",
    instagramUrl: "https://www.instagram.com/ujjwalmah/reel/DFP0Hloy_on/",
    date: "Jan 2025",
    stats: "4.1K+ views",
  },
];

export function FounderReelsSection() {
  // Current active playing reel (0, 1, or 2)
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [progresses, setProgresses] = useState<number[]>([0, 0, 0]);

  // Video element references
  const videoRefs = [
    useRef<HTMLVideoElement | null>(null),
    useRef<HTMLVideoElement | null>(null),
    useRef<HTMLVideoElement | null>(null),
  ];

  // Intersection observer to start Reel 1 when section is in view
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle auto-advancing sequence when a reel ends
  const handleVideoEnded = (endedIndex: number) => {
    // If the currently active reel finished, advance to next reel (0 -> 1 -> 2 -> 0)
    if (endedIndex === activeReelIndex) {
      const nextIndex = (endedIndex + 1) % founderReels.length;
      setActiveReelIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  // Synchronize play/pause state across video elements
  useEffect(() => {
    if (!inView) return;

    videoRefs.forEach((ref, idx) => {
      const video = ref.current;
      if (!video) return;

      if (idx === activeReelIndex) {
        if (isPlaying) {
          video.muted = isMuted;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser may require mute on first autoplay
              video.muted = true;
              setIsMuted(true);
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      } else {
        // When not the active reel: if user hasn't specifically locked onto one,
        // keep others in ambient motion; if user interacted, pause others so only clicked one plays
        if (hasInteracted) {
          video.pause();
        } else {
          video.muted = true;
          // Muted ambient motion
          video.play().catch(() => {});
        }
      }
    });
  }, [activeReelIndex, isPlaying, isMuted, inView, hasInteracted]);

  // Handle user clicking on a specific reel
  const handleReelClick = (index: number) => {
    setHasInteracted(true);

    if (activeReelIndex === index) {
      // Toggle play/pause on current reel
      setIsPlaying((prev) => !prev);
    } else {
      // Switch active reel to clicked reel, unmute and play
      setActiveReelIndex(index);
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  // Toggle sound
  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasInteracted(true);
    setIsMuted((prev) => !prev);
  };

  // Track playback time
  const handleTimeUpdate = (index: number) => {
    const video = videoRefs[index].current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgresses((prev) => {
        const next = [...prev];
        next[index] = pct;
        return next;
      });
    }
  };

  return (
    <section
      id="founder"
      ref={sectionRef}
      aria-labelledby="founder-heading"
      className="container-site section-py relative"
    >
      {/* Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/10 border border-mint/20 text-mint text-[0.875rem] font-bold mb-4">
          <span>Meet the founder</span>
        </div>
        <h2
          id="founder-heading"
          className="text-display-l text-white font-bold tracking-[-0.03em] m-0 mb-4 inline-flex items-center gap-3 flex-wrap"
        >
          <span>
            The strategy behind{" "}
            <RoughMark type="underline" color="#7CC8AE" iterations={2}>
              MarketInc
            </RoughMark>
          </span>
        </h2>
        <p className="font-body text-body-l text-mist leading-[1.45] m-0">
          Founder Ujjwal Maheshwari on how MarketInc builds growth systems for Australian service businesses — from the first search to a booked job in the diary.
        </p>
      </div>

      {/* Reels Grid (3 Vertical 9:16 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {founderReels.map((reel, index) => {
          const isActive = index === activeReelIndex;
          const isCurrentlyPlaying = isActive && isPlaying;

          return (
            <div
              key={reel.id}
              onClick={() => handleReelClick(index)}
              className={`group relative rounded-[24px] overflow-hidden bg-navy-raised border transition-all duration-300 cursor-pointer shadow-xl select-none flex flex-col ${
                isActive
                  ? "border-mint ring-2 ring-mint/20 shadow-[0_20px_50px_-20px_rgba(124,200,174,0.3)] scale-[1.01]"
                  : "border-line hover:border-mint/40 opacity-85 hover:opacity-100"
              }`}
              style={{ aspectRatio: "9 / 16" }}
            >
              {/* HTML5 Native Video Player */}
              <video
                ref={(el) => {
                  videoRefs[index].current = el;
                }}
                src={reel.videoSrc}
                playsInline
                loop={false}
                muted={isActive ? isMuted : true}
                onEnded={() => handleVideoEnded(index)}
                onTimeUpdate={() => handleTimeUpdate(index)}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Gradient overlays for readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy-deep/50 z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Top Bar: Founder profile badge + Instagram icon link */}
              <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-navy border border-mint/40 flex items-center justify-center text-mint font-bold text-xs shadow-md">
                    UM
                  </div>
                  <div className="leading-tight">
                    <p className="font-bold text-[0.875rem] text-white m-0">
                      Ujjwal Maheshwari
                    </p>
                    <p className="text-[0.75rem] text-mist m-0">
                      @ujjwalmah
                    </p>
                  </div>
                </div>

                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open reel on Instagram"
                  className="w-8 h-8 rounded-full bg-navy/80 hover:bg-navy border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>

              {/* Center Tactile Glass Play/Pause Button */}
              <div className="relative z-20 flex-1 flex items-center justify-center">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                    isCurrentlyPlaying
                      ? "bg-navy-deep/40 text-white/80 opacity-0 group-hover:opacity-100 scale-90"
                      : "bg-mint text-navy shadow-[0_0_24px_rgba(124,200,174,0.7)] opacity-95 scale-100"
                  }`}
                >
                  {isCurrentlyPlaying ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="translate-x-0.5"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Bottom Card Info: Hook, sound toggle, progress bar */}
              <div className="relative z-20 p-4 sm:p-5 pt-0 text-left">
                {/* Hook quote */}
                <p className="font-body text-[0.875rem] sm:text-[0.9375rem] font-medium text-white leading-snug m-0 mb-3 drop-shadow-md">
                  {reel.hook}
                </p>

                {/* Subtitle and Controls */}
                <div className="flex items-center justify-between text-[0.75rem] text-mist">
                  <span className="font-medium text-white/90">
                    {reel.title}
                  </span>

                  {isActive && (
                    <button
                      type="button"
                      onClick={handleToggleSound}
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                      className="px-2.5 py-1 rounded-full bg-navy/80 hover:bg-navy border border-mint/30 text-mint font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {isMuted ? (
                        <>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                          <span>Tap for sound</span>
                        </>
                      ) : (
                        <>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                          <span>Sound on</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Real-time Video Progress Track */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-mint transition-all duration-100 ease-linear rounded-full"
                    style={{ width: `${progresses[index] || 0}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
