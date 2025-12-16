"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAGES = [
  "Welcome to Page 1",
  "Discover Page 2",
  "Explore Page 3",
  "Insights on Page 4",
  "Highlights on Page 5",
  "Learning Page 6",
  "Fun on Page 7",
  "Check Page 8",
  "Almost There Page 9",
  "Final Page 10",
];

export default function Swiper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (PAGES.length - 1)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (PAGES.length - 1),
          duration: 0.5,
          ease: "power3.out",
        },
      });

      // Optional: fade-in animation per page
      sectionsRef.current.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen min-h-[100vh * PAGES.length]"
    >
      {PAGES.map((text, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) sectionsRef.current[i] = el;
          }}
          className="w-screen h-screen flex items-center justify-center text-5xl font-black"
          style={{
            background: i % 2 === 0 ? "#fff" : "#fef2f2",
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
