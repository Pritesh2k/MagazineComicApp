"use client";

import React, { useEffect, useRef } from "react";
import { useUserLayout } from "../Context/UserLayoutContext";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

import Beachy from "../../public/Beachy.png";
import Forest from "../../public/Forest.png";
import Lava from "../../public/Lava.png";
import Ocean from "../../public/Ocean.png";
import Starry from "../../public/Starry.png";
import Sunset from "../../public/Sunset.png";
import White from "../../public/White.png";

gsap.registerPlugin(Draggable);

function Settings() {
  const {
    order,
    setOrder,
    alignment,
    setAlignment,
    searchPosition,
    setSearchPosition,
  } = useUserLayout();

  const buttonLabels = {
    like: "Like",
    comment: "Comment",
    view: "View",
    next: "Next",
  };

  const listRef = useRef<HTMLDivElement>(null);

  const DEFAULT_ORDER: ("like" | "comment" | "view" | "next")[] = [
    "next",
    "view",
    "comment",
    "like",
  ];
  const DEFAULT_ALIGNMENT: "left" | "center" | "right" = "right";
  const DEFAULT_SEARCH_POSITION: "left" | "right" = "right";

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

            // Swap in visual only if dragged crosses middle
            if (
              (dragIndex < currentIndex && draggedRect.bottom > middleY) ||
              (dragIndex > currentIndex && draggedRect.top < middleY)
            ) {
              // Swap indices visually
              const temp = target.dataset.index;
              target.dataset.index = item.dataset.index;
              item.dataset.index = temp;

              // Animate the target to its new position
              gsap.to(target, { y: dragIndex < currentIndex ? -target.offsetHeight : target.offsetHeight, duration: 0.2 });
              gsap.to(target, { y: 0, delay: 0.2, duration: 0.2 });

              dragIndex = currentIndex;
            }
          });
        },
        onRelease() {
          // Reset dragged item position
          gsap.to(item, { y: 0, scale: 1, zIndex: 1, duration: 0.25, ease: "power3.out" });

          // After release, commit new order
          const newOrder = Array.from(container.children)
            .sort((a, b) => Number((a as HTMLElement).dataset.index) - Number((b as HTMLElement).dataset.index))
            .map((el) => (el.textContent?.toLowerCase().trim() as "like" | "comment" | "view" | "next"));

          setOrder(newOrder);
        }

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
  };

  const DEFAULT_WALLPAPERS = [
    { name: "Beachy", src: Beachy.src },
    { name: "Forest", src: Forest.src },
    { name: "Lava", src: Lava.src },
    { name: "Ocean", src: Ocean.src },
    { name: "Starry", src: Starry.src },
    { name: "Sunset", src: Sunset.src },
    { name: "White", src: White.src }, // will be renamed to "default" in preview
  ];

  const { wallpaper, setWallpaper } = useUserLayout(); // make sure to add wallpaper in context

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setWallpaper(url);
  };

  return (
    <div className="bg-white/0 w-full h-full mt-5 flex p-4 flex-col gap-10 rounded-2xl overflow-x-hidden">

      {/* -------------------------------------------------------
          🔹 BUTTON ORDER LIST
      ------------------------------------------------------- */}
      <div>
        <div className="font-bold text-center text-lg mb-3">Button Order</div>

        <div ref={listRef} className="flex flex-col gap-3 relative">
          {order.map((btn) => (
            <div
              key={btn}
              className="p-3 rounded-lg text-center bg-white shadow-sm cursor-grab active:cursor-grabbing select-none border border-gray-200"
            >
              {buttonLabels[btn]}
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------
          🔹 BUTTON BAR ALIGNMENT — ROUND ICON BUTTONS
      ------------------------------------------------------- */}
      <div>
        <div className="font-bold text-lg mb-3 flex justify-center items-center">Button Bar Alignment</div>

        <div className="flex justify-center items-center gap-6">
          {["left", "center", "right"].map((pos) => (
            <button
              key={pos}
              onClick={() => setAlignment(pos as any)}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                backdrop-blur-md shadow-md transition-all duration-300
                ${alignment === pos ? "bg-black text-red-500 scale-105" : "bg-white/60 text-black"}
              `}
            >
              {pos === "left" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              )}

              {pos === "center" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}

              {pos === "right" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------
          🔹 SEARCH BUTTON POSITION — ROUND BUTTONS
      ------------------------------------------------------- */}
      <div className="w-full flex flex-col items-center mt-3">

        {/* Title */}
        <div className="font-bold text-lg mb-3">
          Search Button Position
        </div>

        {/* Button group container */}
        <div className="
      flex justify-center gap-6 
      w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw]
  ">
          {["left", "right"].map((pos) => (
            <button
              key={pos}
              onClick={() => setSearchPosition(pos as "left" | "right")}
              className={`
          flex items-center justify-center
          rounded-full transition-all duration-300
          backdrop-blur-md shadow-md
          w-12 h-12
          ${searchPosition === pos
                  ? "bg-black text-red-500 scale-110"
                  : "bg-white/60 text-black scale-100"
                }
        `}
            >
              {pos === "left" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              )}

              {pos === "right" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>


      {/* -------------------------------------------------------
          🔹 RESET BUTTON
      ------------------------------------------------------- */}
      <button
        onClick={resetLayout}
        className="w-full py-3 bg-black text-white font-bold rounded-lg shadow hover:bg-red-600 transition-all"
      >
        Reset Layout
      </button>

      {/* -------------------------------------------------------
   🔹 WALLPAPER SELECTION
------------------------------------------------------- */}
      <div className="grid grid-cols-3 gap-3">
        {DEFAULT_WALLPAPERS.map((wp, index) => (
          <div
            key={index}
            onClick={() => setWallpaper(wp.src)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${wallpaper === wp.src ? "border-red-500 scale-105" : "border-gray-300"
              }`}
          >
            {/* Thumbnail */}
            <img src={wp.src} alt={wp.name} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-sm">
              {wp.name === "White" ? "default" : wp.name}
            </div>
          </div>
        ))}

        {/* Custom Wallpaper Box */}
        <label
          className={`cursor-pointer rounded-lg overflow-hidden border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 relative ${wallpaper && !DEFAULT_WALLPAPERS.some(wp => wp.src === wallpaper)
            ? "border-red-500 scale-105"
            : "border-gray-300"
            }`}
        >
          {/* Thumbnail: show uploaded image or placeholder */}
          {wallpaper && !DEFAULT_WALLPAPERS.some(wp => wp.src === wallpaper) ? (
            <img src={wallpaper} alt="Custom Wallpaper" className="w-full h-24 object-cover" />
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
  );
}

export default Settings;
