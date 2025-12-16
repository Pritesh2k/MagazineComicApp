"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import next from "next";

const TOTAL_PAGES = 5;
const SLIDES_PER_PAGE = [5, 8, 4, 10, 6]; // slides per page
const SWIPE_THRESHOLD = 50;

type SwiperProps = {
  onOpenAuthorPage: () => void; // open author page
  onPageChange: (pageIndex: number) => void; // notify main component of page change
};

export default function Swiper({ onOpenAuthorPage, onPageChange }: SwiperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(0);
  const isAnimatingVertical = useRef(false);
  const horizontalIndexes = useRef<number[]>(SLIDES_PER_PAGE.map(() => 0));
  const horizontalTracks = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingHorizontal = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const pageHeight = window.innerHeight;

    /* ---------------- VERTICAL ---------------- */
    const goToPage = (index: number) => {
      if (isAnimatingVertical.current || isAnimatingHorizontal.current) return;

      const clamped = Math.max(0, Math.min(TOTAL_PAGES - 1, index));
      if (clamped === currentPage.current) return;

      isAnimatingVertical.current = true;

      gsap.to(container, {
        scrollTop: clamped * pageHeight,
        duration: 0.5,
        ease: "power4.inout",
        onComplete: () => {
          currentPage.current = clamped;
          isAnimatingVertical.current = false;
          onPageChange(clamped); // notify main component
        },
      });
    };

    /* ---------------- HORIZONTAL ---------------- */
    const handleHorizontalSwipe = (dir: number) => {
      if (isAnimatingHorizontal.current || isAnimatingVertical.current) return;

      const page = currentPage.current;
      const slides = SLIDES_PER_PAGE[page];
      const track = horizontalTracks.current[page];
      if (!track) return;

      // Only open author page if on first slide of **any page** and swiping left (dir === -1)
      if (horizontalIndexes.current[page] === 0 && dir === -1) {
        onOpenAuthorPage();
        return;
      }

      let nextIndex = horizontalIndexes.current[page] + dir;

      if (nextIndex >= slides) nextIndex = 0;
      if (nextIndex < 0) nextIndex = slides - 1;

      isAnimatingHorizontal.current = true;
      gsap.to(track, {
        x: -nextIndex * window.innerWidth,
        duration: 0.3,
        ease: "power4.inout",
        onComplete: () => {
          horizontalIndexes.current[page] = nextIndex;
          isAnimatingHorizontal.current = false;
        },
      });
    };

    /* ---------------- TOUCH ---------------- */
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStart.current.x - e.changedTouches[0].clientX;
      const dy = touchStart.current.y - e.changedTouches[0].clientY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        handleHorizontalSwipe(dx > 0 ? 1 : -1);
      } else {
        if (Math.abs(dy) < SWIPE_THRESHOLD) return;
        if (dy > 0) goToPage(currentPage.current + 1);
        if (dy < 0) goToPage(currentPage.current - 1);
      }
    };

    /* ---------------- WHEEL ---------------- */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingVertical.current || isAnimatingHorizontal.current) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (e.deltaY > 0) goToPage(currentPage.current + 1);
        if (e.deltaY < 0) goToPage(currentPage.current - 1);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [onOpenAuthorPage, onPageChange]);

  const getGreyShade = (index: number, total: number) => {
    const min = 220;
    const max = 245;
    const value = min + ((max - min) / (total - 1)) * index;
    return `rgb(${value}, ${value}, ${value})`;
  };

  return (
    <div ref={containerRef} style={{ height: "100vh", overflow: "hidden", touchAction: "none" }}>
      {Array.from({ length: TOTAL_PAGES }).map((_, pageIndex) => (
        <section key={pageIndex} style={{ height: "100vh", overflow: "hidden" }}>
          <div
            ref={(el) => { horizontalTracks.current[pageIndex] = el; }}
            style={{ display: "flex", height: "100%", width: `${SLIDES_PER_PAGE[pageIndex] * 100}vw` }}
          >
            {Array.from({ length: SLIDES_PER_PAGE[pageIndex] }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                style={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontSize: 48,
                  fontWeight: "bold",
                  background: getGreyShade(slideIndex, SLIDES_PER_PAGE[pageIndex]),
                }}
              >
                Page {pageIndex + 1} — Slide {slideIndex + 1}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
