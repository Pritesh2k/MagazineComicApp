"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

type TransitionProps = {
  children: React.ReactNode;
  onEnterComplete?: () => void;
};

export default function TransitionWrapper({ children, onEnterComplete }: TransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", onComplete: onEnterComplete }
    );

    return () => {
      if (!wrapperRef.current) return;
      gsap.to(wrapperRef.current, { opacity: 0, y: -50, duration: 0.4, ease: "power3.in" });
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
