"use client";

import React, { useState, useRef, JSX } from "react";
import { gsap } from "gsap";
import Swiper from "./Swiper";
import Profile from "../Pages/Profile";
import { useUserLayout } from "../Context/UserLayoutContext";
import { useUser } from "../Context/UserContext";
import TransitionWrapper from "../Context/TransitionWrapper";

type MainProps = { onLogout?: () => void };

const PAGES = [
    {
        author: "Alice Smith",
        title: "First Page Title",
        date: "2025-12-16",
        description:
            "This is a long description for the first page. Collapsed/expanded works.",
    },
    {
        author: "Bob Johnson",
        title: "Second Page Title",
        date: "2025-12-15",
        description: "Description for page two goes here...",
    },
    {
        author: "Charlie Lee",
        title: "Third Page Title",
        date: "2025-12-14",
        description: "Description for page three goes here...",
    },
    {
        author: "Dana White",
        title: "Fourth Page Title",
        date: "2025-12-13",
        description: "Description for page four goes here...",
    },
    {
        author: "Eve Torres",
        title: "Fifth Page Title",
        date: "2025-12-12",
        description: "Description for page five goes here...",
    },
];

type ButtonItem = {
    id: string;
    icon: JSX.Element;
    onClick?: () => void;
};

export default function Main_Update({ onLogout }: MainProps) {
    const { user } = useUser();
    const { order, alignment } = useUserLayout();

    const [currentPage, setCurrentPage] = useState(0);
    const [liked, setLiked] = useState(false);
    const [cardExpanded, setCardExpanded] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAuthorPage, setShowAuthorPage] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);

    const [showComments, setShowComments] = useState(false);
    const commentsRef = useRef<HTMLDivElement>(null);

    const openComments = () => {
        setShowComments(true);
        requestAnimationFrame(() => {
            if (!commentsRef.current) return;
            gsap.fromTo(
                commentsRef.current,
                { opacity: 0, y: 400 },  // start lower
                { opacity: 1, y: 0, duration: 0.3, ease: "power4.out" } // smooth easing
            );
        });
    };

    const closeComments = () => {
        if (!commentsRef.current) return;
        gsap.to(commentsRef.current, {
            opacity: 0,
            y: 300,  // end a bit above the bottom for smoothness
            duration: 0.3,
            ease: "power3.inOut",
            onComplete: () => setShowComments(false),
        });
    };

    // Title Card Functions
    const openCard = () => {
        if (!cardRef.current || !contentRef.current) return;
        setCardExpanded(true);

        gsap.timeline()
            .to(cardRef.current, {
                duration: 0.5,
                ease: "power3.out",
                width: "95%",
                maxWidth: "500px",
                height: "70vh",
                y: -5,
                borderRadius: "1rem",
            })
            .to(contentRef.current, { opacity: 1 });
    };

    const closeCard = () => {
        if (!cardRef.current || !contentRef.current) return;

        gsap.timeline()
            .to(contentRef.current, { opacity: 0 })
            .to(
                cardRef.current,
                {
                    duration: 0.5,
                    ease: "power3.inOut",
                    height: "10vh",
                    y: 0,
                    borderRadius: "1.5rem",
                    onComplete: () => setCardExpanded(false),
                },
                0
            );
    };

    // Author Page Functions
    const openAuthorPage = () => {
        setShowAuthorPage(true);
        requestAnimationFrame(() => {
            if (!authorRef.current) return;
            gsap.fromTo(
                authorRef.current,
                { x: "-100%", opacity: 0 },
                { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        });
    };

    const closeAuthorPage = () => {
        if (!authorRef.current) return;
        gsap.to(authorRef.current, {
            x: "-100%",
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => setShowAuthorPage(false),
        });
    };

    // Profile Modal Functions
    const openProfile = () => {
        setShowProfile(true);
        setTimeout(() => {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 250 },
                { opacity: 1, y: 0, duration: 0.1, ease: "power4.out" }
            );
        }, 20);
    };

    const closeProfile = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 1500,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => setShowProfile(false),
        });
    };

    // Bottom Button Map
    const buttonMap: Record<string, ButtonItem> = {
        like: {
            id: "like",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={liked ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={liked ? "red" : "currentColor"}
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
           -1.935 0-3.597 1.126-4.312 2.733
           -.715-1.607-2.377-2.733-4.313-2.733
           C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12
           s9-4.78 9-12Z"
                    />
                </svg>
            ),
        },
        comment: {
            id: "comment",
            icon: (
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
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                </svg>
            ),
            onClick: openComments,
        },
        view: {
            id: "view",
            icon: (
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
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639
           C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007
           9.963 7.178.07.207.07.431 0 .639
           C20.577 16.49 16.64 19.5 12 19.5
           c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
            ),
            onClick: openAuthorPage,
        },
        next: {
            id: "next",
            icon: (
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
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6
           7.5 7.5 7.5-7.5"
                    />
                </svg>
            ),
        },
    };


    const alignmentClass = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }[alignment];

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Author & Title Card */}
            <div className="absolute z-15 w-[90vw] left-5 top-5 flex justify-between items-center pointer-events-auto">
                <img
                    src="/author.jpg"
                    alt="Author PP"
                    className="w-14 h-14 rounded-full border border-red-700 shadow-lg object-cover"
                />
                <div className="mt-2 font-semibold text-lg tracking-wide text-center">
                    {PAGES[currentPage].author}
                </div>
            </div>

            {/* Title Card */}
            <div
                ref={cardRef}
                className="absolute z-15 bottom-45 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px] bg-white/40 backdrop-blur-md text-black p-4 rounded-2xl shadow-lg border border-red-700 flex flex-col items-start cursor-pointer pointer-events-auto"
                onClick={() => !cardExpanded && openCard()}
            >
                <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-xl">{PAGES[currentPage].title}</div>
                    <div className="text-xs opacity-60 mt-1">{PAGES[currentPage].date}</div>
                </div>

                {/* Collapsed Description */}
                <div
                    className={`mt-2 text-sm w-full overflow-hidden transition-opacity duration-300 ${cardExpanded ? "opacity-0" : "line-clamp-1"
                        }`}
                >
                    {PAGES[currentPage].description}
                </div>

                {/* Expanded Content */}
                <div
                    ref={contentRef}
                    className={`-mt-5 text-sm w-full h-[82%] overflow-y-auto ${cardExpanded ? "opacity-100" : "hidden"
                        }`}
                >
                    {PAGES[currentPage].description}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeCard();
                        }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-700 font-semibold text-white rounded-lg shadow"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Swiper */}
            <Swiper onOpenAuthorPage={openAuthorPage} onPageChange={setCurrentPage} />

            {/* Bottom Buttons */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px] h-16 flex items-center justify-center px-4 pointer-events-auto">
                <div className={`flex w-full gap-3.5 ${alignmentClass}`}>
                    {order.map((btn) => (
                        <button
                            key={buttonMap[btn].id}
                            onClick={() => {
                                if (btn === "like") setLiked(!liked);
                                buttonMap[btn].onClick?.();
                            }}
                            className="w-12 h-12 rounded-full bg-white text-red-700 border border-red-700 backdrop-blur-xl shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white active:scale-95"
                        >
                            {buttonMap[btn].icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Profile Button */}
            <button
                onClick={openProfile}
                className="absolute left-1/2 -translate-x-1/2 bottom-8 w-16 h-16 rounded-full overflow-hidden border border-red-700 shadow-md pointer-events-auto"
            >
                {user.profilePic ? (
                    <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-400 text-xs font-semibold">U</div>
                )}
            </button>

            {/* Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end justify-center z-50 pointer-events-auto">
                    <div ref={modalRef} className="w-full h-full opacity-0 rounded-t-3xl shadow-lg relative">
                        <button
                            onClick={closeProfile}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-red-700 shadow-lg flex items-center justify-center z-50"
                        >
                            <a className="w-5 h-5 rounded-sm border-2 border-red-700 bg-white block" />
                        </button>
                        <TransitionWrapper>
                            <Profile onLogout={onLogout} />
                        </TransitionWrapper>
                    </div>
                </div>
            )}

            {/* Author Page */}
            {showAuthorPage && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 pointer-events-auto">
                    <div
                        ref={authorRef}
                        className="absolute top-0 left-0 w-full h-full bg-white shadow-lg"
                        style={{ transform: "translateX(-100%)", opacity: 0 }}
                    >
                        <button
                            onClick={closeAuthorPage}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-red-700 shadow-lg flex items-center justify-center z-50"
                        >
                            <a className="w-5 h-5 rounded-sm border-2 border-red-700 bg-white block" />
                        </button>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold mb-4">{PAGES[currentPage].author}</h1>
                            <p>{PAGES[currentPage].description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Modal */}
            {showComments && (
                <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-auto">
                    <div
                        ref={commentsRef}
                        className="w-full h-3/4 bg-white rounded-t-3xl shadow-lg relative opacity-0"
                    >
                        <button
                            onClick={closeComments}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border border-red-700 shadow-lg flex items-center justify-center z-50"
                        >
                            <a className="w-5 h-5 rounded-sm border-2 border-red-700 bg-white block" />
                        </button>

                        <div className="p-6 overflow-y-auto h-full">
                            <h2 className="text-2xl font-bold mb-4">Comments for {PAGES[currentPage].title}</h2>
                            <p className="text-sm text-gray-700">
                                {/* Replace with actual comments if available */}
                                No comments yet for this page.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
