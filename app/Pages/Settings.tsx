"use client";

import React, { useEffect, useRef } from "react";
import { useUserLayout } from "../Context/UserLayoutContext";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

import Beachy from "../../public/Beachy.png";
import Forest from "../../public/Forest.png";
import Lava from "../../public/Lava.png";
import Ocean from "../../public/Ocean.png";
import Starry from "../../public/Starry.png";
import Sunset from "../../public/Sunset.png";
import White from "../../public/White.png";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Settings() {
  const {
    order,
    setOrder,
    alignment,
    setAlignment,
    searchPosition,
    setSearchPosition,
    textColor,
    setTextColor,
    wallpaper,
    setWallpaper,
  } = useUserLayout();

  const buttonLabels = {
    like: "Like",
    comment: "Comment",
    view: "View",
    next: "Next",
  };

  const listRef = useRef<HTMLDivElement>(null);

  const DEFAULT_ORDER = ["next", "view", "comment", "like"];
  const DEFAULT_ALIGNMENT = "right";
  const DEFAULT_SEARCH_POSITION = "right";
  const DEFAULT_TEXT_COLOR = "black";

  /*-----------------------------------------------------
    🔧 DRAGGABLE BUTTON ORDER
  -----------------------------------------------------*/
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const items = gsap.utils.toArray<HTMLDivElement>(container.children);
    let dragIndex = -1;

    items.forEach((item, index) => (item.dataset.index = index.toString()));

    items.forEach((item, index) => {
      Draggable.create(item, {
        type: "y",
        onPress() {
          dragIndex = index;
          gsap.to(item, { scale: 1.05, zIndex: 100, duration: 0.2 });
        },
        onDrag() {
          const draggedRect = item.getBoundingClientRect();

          items.forEach((target, i) => {
            if (target === item) return;

            const targetRect = target.getBoundingClientRect();
            const middleY = targetRect.top + targetRect.height / 2;
            const currentIndex = Number(target.dataset.index);

            if (
              (dragIndex < currentIndex && draggedRect.bottom > middleY) ||
              (dragIndex > currentIndex && draggedRect.top < middleY)
            ) {
              const temp = target.dataset.index;
              target.dataset.index = item.dataset.index;
              item.dataset.index = temp;

              gsap.to(target, {
                y:
                  dragIndex < currentIndex
                    ? -target.offsetHeight
                    : target.offsetHeight,
                duration: 0.2,
              });
              gsap.to(target, { y: 0, delay: 0.2, duration: 0.2 });

              dragIndex = currentIndex;
            }
          });
        },
        onRelease() {
          gsap.to(item, {
            y: 0,
            scale: 1,
            zIndex: 1,
            duration: 0.25,
            ease: "power3.out",
          });

          const newOrder = Array.from(container.children)
            .sort(
              (a, b) =>
                Number((a as HTMLElement).dataset.index) -
                Number((b as HTMLElement).dataset.index)
            )
            .map(
              (el) =>
                el.textContent?.toLowerCase().trim() as
                | "like"
                | "comment"
                | "view"
                | "next"
            );

          setOrder(newOrder);
        },
      });
    });
  }, [order]);

  /*-----------------------------------------------------
    RESET BUTTON
  -----------------------------------------------------*/
  const resetLayout = () => {
    setOrder(DEFAULT_ORDER);
    setAlignment(DEFAULT_ALIGNMENT);
    setSearchPosition(DEFAULT_SEARCH_POSITION);
    setTextColor(DEFAULT_TEXT_COLOR);
  };

  const DEFAULT_WALLPAPERS = [
    { name: "Beachy", src: Beachy.src },
    { name: "Forest", src: Forest.src },
    { name: "Lava", src: Lava.src },
    { name: "Ocean", src: Ocean.src },
    { name: "Starry", src: Starry.src },
    { name: "Sunset", src: Sunset.src },
    { name: "White", src: White.src },
  ];

  useEffect(() => {
    if (!wallpaper) {
      setWallpaper(DEFAULT_WALLPAPERS[6].src);
    }
  }, [wallpaper, setWallpaper]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setWallpaper(url);
  };

  const textColorClass = textColor === "black" ? "text-black" : "text-white";

  return (
    <div id="smooth-wrapper" className="w-full h-full overflow-hidden">
      <div
        id="smooth-content"
        className="bg-white/0 w-full min-h-full mt-5 flex p-4 flex-col gap-10 rounded-2xl"
      >
        {/* ------------------------------------------------------- */}
        {/* 🔹 BUTTON ORDER LIST */}
        {/* ------------------------------------------------------- */}
        <div>
          <div className={`font-bold text-center text-2xl mb-15 ${textColorClass}`}>
            Settings
          </div>

          <div className={`font-bold text-center text-lg mb-5 ${textColorClass}`}>
            Button Order
          </div>

          <div ref={listRef} className="flex flex-col gap-3 relative">
            {order.map((btn) => (
              <div
                key={btn}
                className="p-3 rounded-lg text-center bg-white shadow-sm cursor-grab active:cursor-grabbing select-none border border-red-700"
              >
                {buttonLabels[btn]}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* 🔹 BUTTON BAR ALIGNMENT */}
        {/* ------------------------------------------------------- */}
        <div>
          <div className={`font-bold text-center text-lg mb-5 ${textColorClass}`}>
            Button Bar Alignment
          </div>

          <div className="flex justify-center items-center gap-6">
            {["left", "center", "right"].map((pos) => {
              const Icon =
                pos === "left" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                    />
                  </svg>
                ) : pos === "center" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                  </svg>
                );

              return (
                <button
                  key={pos}
                  onClick={() => setAlignment(pos as any)}
                  className={`w-12 h-12 rounded-full border border-red-700 flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 ${alignment === pos
                    ? "bg-red-700 text-white scale-105"
                    : "bg-white text-black"
                    }`}
                >
                  {Icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* 🔹 SEARCH BUTTON POSITION */}
        {/* ------------------------------------------------------- */}
        <div className="w-full flex flex-col items-center mt-3">
          <div className={`font-bold text-center text-lg mb-5 ${textColorClass}`}>
            Search Button Position
          </div>

          <div className="flex justify-center gap-6 w-full">
            {["left", "right"].map((pos) => {
              const Icon =
                pos === "left" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                  </svg>
                );

              return (
                <button
                  key={pos}
                  onClick={() => setSearchPosition(pos as any)}
                  className={`w-12 h-12 rounded-full border border-red-700 flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 ${searchPosition === pos
                    ? "bg-red-700 text-white scale-105"
                    : "bg-white text-black"
                    }`}
                >
                  {Icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* 🔹 TEXT COLOUR */}
        {/* ------------------------------------------------------- */}
        <div>
          <div className={`font-bold text-center text-lg mb-5 ${textColorClass}`}>
            Text Colour
          </div>

          <div className="flex justify-center items-center gap-6">
            {[
              { label: "Black", value: "black", preview: "bg-black" },
              {
                label: "White",
                value: "white",
                preview: "bg-white border border-gray-300",
              },
            ].map((c) => (
              <button
                key={c.value}
                onClick={() => setTextColor(c.value)}
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 ${c.preview
                  } ${textColor === c.value ? "scale-110 ring ring-red-500" : "scale-100"}`}
              ></button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* 🔹 RESET BUTTON */}
        {/* ------------------------------------------------------- */}
        <button
          onClick={resetLayout}
          className="w-full py-3 bg-red-700 text-white mt-5 font-bold rounded-lg shadow hover:bg-red-600 transition-all"
        >
          Reset Layout
        </button>

        {/* ------------------------------------------------------- */}
        {/* 🔹 WALLPAPER SELECTION */}
        {/* ------------------------------------------------------- */}
        <div className={`font-bold text-center text-lg ${textColorClass}`}>
          Wallpaper
        </div>

        <div className="grid grid-cols-3 gap-3">
          {DEFAULT_WALLPAPERS.map((wp, index) => (
            <div
              key={index}
              onClick={() => setWallpaper(wp.src)}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${wallpaper === wp.src ? "border-red-500 scale-105" : "border-gray-300"
                }`}
            >
              <img src={wp.src} alt={wp.name} className="w-full h-24 object-cover" />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-sm">
                {wp.name === "White" ? "default" : wp.name}
              </div>
            </div>
          ))}

          <label
            className={`cursor-pointer rounded-lg overflow-hidden border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 relative ${wallpaper && !DEFAULT_WALLPAPERS.some((wp) => wp.src === wallpaper)
              ? "border-red-500 scale-105"
              : "border-gray-300"
              }`}
          >
            {wallpaper && !DEFAULT_WALLPAPERS.some((wp) => wp.src === wallpaper) ? (
              <img
                src={wallpaper}
                alt="Custom Wallpaper"
                className="w-full h-24 object-cover"
              />
            ) : (
              <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Upload
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
