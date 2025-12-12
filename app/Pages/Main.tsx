"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import Profile from "../Pages/Profile";
import { useUserLayout } from "../Context/UserLayoutContext";
import { useUser } from "../Context/UserContext";

function Main() {
    const { user } = useUser();
    const [showProfile, setShowProfile] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { order, alignment, searchPosition } = useUserLayout();

    const [liked, setLiked] = useState(false);

    // Title Card States
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const collapsedRef = useRef<HTMLDivElement>(null);
    const [cardExpanded, setCardExpanded] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState<number>(0);

    // Profile Modal Functions
    const openProfile = () => {
        setShowProfile(true);
        setTimeout(() => {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 250 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }, 20);
    };

    const closeProfile = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 1500,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => setShowProfile(false)
        });
    };

    // Measure collapsed height after first render
    React.useEffect(() => {
        if (collapsedRef.current) {
            setCollapsedHeight(collapsedRef.current.scrollHeight);
        }
    }, []);

    const openCard = () => {
        if (!cardRef.current || !contentRef.current) return;

        setCardExpanded(true);

        gsap.timeline()
            .to(cardRef.current, {
                duration: 0.5,
                ease: "power3.out",
                width: "95%",
                maxWidth: "500px",
                height: "60vh", // expanded height
                y: -25,
                borderRadius: "1rem",
            })
            .to(contentRef.current, { opacity: 1 });
    };

    const closeCard = () => {
        if (!cardRef.current || !contentRef.current) return;

        gsap.timeline()
            .to(contentRef.current, { opacity: 0 })
            .to(cardRef.current, {
                duration: 0.5,
                ease: "power3.inOut",
                height: "10vh", // original collapsed height
                y: 0,
                borderRadius: "1.5rem",
                onComplete: () => setCardExpanded(false),
            }, 0); // start at same time as opacity animation
    };


    // Bottom Button Map
    const buttonMap = {
        like: {
            id: "like",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "red" : "none"}
                    viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke={liked ? "red" : "currentColor"} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
               -1.935 0-3.597 1.126-4.312 2.733
               -.715-1.607-2.377-2.733-4.313-2.733
               C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12
               s9-4.78 9-12Z" />
                </svg>
            )
        },
        comment: {
            id: "comment",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            )
        },
        view: {
            id: "view",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639
               C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007
               9.963 7.178.07.207.07.431 0 .639
               C20.577 16.49 16.64 19.5 12 19.5
               c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            )
        },
        next: {
            id: "next",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6
               7.5 7.5 7.5-7.5" />
                </svg>
            )
        }
    };

    const alignmentClass = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }[alignment];

    return (
        <div className="relative flex flex-col items-center w-screen h-screen overflow-hidden bg-white text-black">

            {/* Main Post Area */}
            <div className="absolute flex justify-center items-center w-screen h-screen bg-red-500">
                This component is the users post
            </div>

            {/* Author Avatar */}
            <div className="absolute mt-6 flex flex-col items-center">
                <img
                    src="/author.jpg"
                    alt="Author PP"
                    className="w-20 h-20 rounded-full border-2 border-black shadow-lg object-cover"
                />
                <div className="mt-2 font-semibold text-lg tracking-wide text-center">
                    Author Name
                </div>
            </div>

            {/* Title Card */}
            <div
                ref={cardRef}
                className={`absolute bottom-45 left-1/2 -translate-x-1/2
       w-[95%] max-w-[500px]
       bg-white/40 backdrop-blur-md
       text-black p-4 rounded-2xl shadow-lg
       flex flex-col items-start cursor-pointer`} // <-- make parent relative
                onClick={() => !cardExpanded && openCard()}
            >
                <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-xl">Title</div>
                    <div className="text-xs opacity-60 mt-1">Date</div>
                </div>

                {/* Collapsed description */}
                <div
                    className={`mt-3 text-sm w-full overflow-hidden transition-opacity duration-300 ${cardExpanded ? "opacity-0" : "line-clamp-1"
                        }`}
                >
                    Description goes here and wraps nicely...
                </div>

                {/* Expanded content */}
                <div
                    ref={contentRef}
                    className={`mt-4 text-sm w-full ${cardExpanded ? "opacity-100" : "hidden"}`}
                >
                    Description goes here and wraps nicely. This is the expanded content.
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeCard();
                        }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded-lg shadow"
                    >
                        Close
                    </button>
                </div>
            </div>


            {/* Bottom Interaction Bar */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 
                w-[95%] max-w-[500px] h-16 flex items-center justify-center px-4">
                <div className={`flex w-full gap-3.5 ${alignmentClass}`}>
                    {order.map((btn) => (
                        <button
                            key={buttonMap[btn].id}
                            onClick={() => setLiked(btn === "like" ? !liked : liked)}
                            className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-xl shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white active:scale-95"
                        >
                            {btn === "like" ? buttonMap[btn].icon : buttonMap[btn].icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Button */}
            {(searchPosition === "left" || searchPosition === "right") && (
                <button
                    className="absolute bottom-11 w-10 h-10 rounded-full bg-white/50 backdrop-blur-xl shadow-lg 
            flex items-center justify-center transition-all duration-200 hover:bg-white active:scale-95"
                    style={{
                        left: searchPosition === "left" ? "calc(50% - 9rem)" : "calc(50% + 6rem)",
                    }}
                >
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
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            )}

            {/* User Profile */}
            <button
                onClick={openProfile}
                className="absolute left-1/2 -translate-x-1/2 bottom-8 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md"
            >
                {user.profilePic ? (
                    <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-400 text-xs font-semibold">
                        U
                    </div>
                )}
            </button>

            {/* PROFILE MODAL */}
            {showProfile && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end justify-center z-50">
                    <div
                        ref={modalRef}
                        className="w-full h-full opacity-0 bg-white rounded-t-3xl shadow-lg"
                    >
                        <div className="flex justify-center items-center">
                            <button
                                onClick={closeProfile}
                                className="absolute bottom-10 w-8 h-8 rounded-full bg-white/50 backdrop-blur-xl shadow-lg 
                                    flex items-center justify-center transition-all duration-200 hover:bg-white active:scale-95 z-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.25}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-red-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                    />
                                </svg>
                            </button>

                        </div>
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
