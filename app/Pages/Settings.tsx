"use client";

import React, { useEffect, useRef } from "react";
import { useUserLayout } from "../Context/UserLayoutContext";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

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

  // Setup Draggable for swap-only dragging
  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []) as HTMLDivElement[];

    const swap = (dragIndex: number, hoverIndex: number) => {
      if (dragIndex === hoverIndex) return;
      const newOrder = [...order];
      [newOrder[dragIndex], newOrder[hoverIndex]] = [newOrder[hoverIndex], newOrder[dragIndex]];
      setOrder(newOrder);
    };

    items.forEach((el, index) => {
      Draggable.create(el, {
        type: "y",
        bounds: listRef.current!,
        onDragStart() {
          gsap.to(el, { scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)", duration: 0.15 });
        },
        onDrag() {
          const draggedRect = el.getBoundingClientRect();

          items.forEach((target, i) => {
            if (i === index) return;

            const targetRect = target.getBoundingClientRect();
            const middleY = targetRect.top + targetRect.height / 2;

            if ((index < i && draggedRect.bottom > middleY) || (index > i && draggedRect.top < middleY)) {
              swap(index, i);
            }
          });
        },
        onDragEnd() {
          // Reset the dragged button to its final position immediately
          gsap.to(el, { y: 0, scale: 1, backgroundColor: "white", duration: 0.15 });
        },
      });
    });
  }, [order]);

  const resetLayout = () => {
    setOrder(DEFAULT_ORDER);
    setAlignment(DEFAULT_ALIGNMENT);
    setSearchPosition(DEFAULT_SEARCH_POSITION);
  };

  return (
    <div className="bg-white w-full h-full p-6 flex flex-col gap-8 rounded-2xl overflow-x-hidden overflow-y-scroll">

      {/* Button Order Drag & Drop */}
      <div>
        <div className="font-bold text-lg mb-3">Button Order</div>
        <div ref={listRef} className="flex flex-col gap-3 relative">
          {order.map((btn) => (
            <div
              key={btn}
              className="p-3 rounded-lg bg-white shadow-sm cursor-grab active:cursor-grabbing select-none border border-gray-200"
            >
              {buttonLabels[btn]}
            </div>
          ))}
        </div>
      </div>

      {/* Alignment Settings */}
      <div>
        <div className="font-bold text-lg mb-3">Button Bar Alignment</div>
        <div className="flex gap-4">
          {["left", "center", "right"].map((pos) => (
            <button
              key={pos}
              onClick={() => setAlignment(pos as any)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300
                ${alignment === pos ? "bg-black text-white shadow" : "bg-gray-100 text-black"}
              `}
            >
              {pos.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button Position */}
      <div>
        <div className="font-bold text-lg mb-3">Search Button Position</div>
        <div className="flex gap-4">
          {["left", "right"].map((pos) => (
            <button
              key={pos}
              onClick={() => setSearchPosition(pos as "left" | "right")}
              className={`px-4 py-2 rounded-lg transition-colors duration-300
                ${searchPosition === pos ? "bg-black text-white shadow" : "bg-gray-100 text-black"}
              `}
            >
              {pos.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Layout Button */}
      <div>
        <button
          onClick={resetLayout}
          className="w-full py-3 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition-colors"
        >
          Reset Layout
        </button>
      </div>
    </div>
  );
}

export default Settings;
