"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import Profile from "../Pages/Profile";
import { useUserLayout } from "../Context/UserLayoutContext";
import { useUser } from "../Context/UserContext";

function Main() {
    const { user } = useUser();
    const [showProfile, setShowProfile] = useState(false);
    const modalRef = useRef(null);
    const { order, alignment, searchPosition } = useUserLayout();

    const openProfile = () => {
        setShowProfile(true);
        setTimeout(() => {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 250 },
                { opacity: 1, y: 0 }
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

    const buttonMap = {
        like: "Like",
        comment: "Comment",
        view: "View",
        next: "Next",
    };

    const alignmentClass = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }[alignment];

    return (
        <div className="relative flex flex-col items-center w-screen h-screen overflow-hidden bg-white text-black">

            {/* Author Avatar */}
            <div className="mt-6 flex flex-col items-center">
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
            <div className="absolute bottom-42 left-1/2 -translate-x-1/2 
                      w-[95%] max-w-[500px]
                      bg-black/10 backdrop-blur-md 
                      text-black p-4 rounded-2xl shadow-lg 
                      flex flex-col items-start">
                <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-xl">Title</div>
                    <div className="text-xs opacity-60 mt-1">Date</div>
                </div>
                <div className="text-sm opacity-80 mt-1">
                    Description goes here and wraps nicely.
                </div>
            </div>

            {/* Bottom Interaction Bar */}
            <div className="absolute bottom-25 left-1/2 -translate-x-1/2 
                      w-[95%] max-w-[500px] h-16
                      flex items-center justify-around 
                      px-4">

                <div className={`flex w-full gap-3.5 ${alignmentClass}`}>
                    {order.map((btn) => (
                        <button
                            key={btn}
                            className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-xs"
                        >
                            {buttonMap[btn]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Floating Toolbar */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 
                      w-[95%] max-w-[500px] h-12 
                      flex items-center justify-center 
                      px-4">

                {/* Conditionally render search button based on searchPosition */}
                {searchPosition === "left" && (
                    <button className="absolute left-[15%] 
                           w-10 h-10 
                           rounded-full bg-gray-400 flex items-center justify-center shadow-md text-[10px]">
                        S - L
                    </button>
                )}

                {searchPosition === "right" && (
                    <button className="absolute right-[15%] 
                           w-10 h-10 
                           rounded-full bg-gray-400 flex items-center justify-center shadow-md text-[10px]">
                        S - R
                    </button>
                )}

                {/* User Profile Icon */}
                {/* User Profile Icon */}
                <button
                    onClick={openProfile}
                    className="absolute left-1/2 -translate-x-1/2 
                   w-16 h-16
                   rounded-full overflow-hidden border-2 border-gray-300 shadow-md"
                >
                    {user.profilePic ? (
                        <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-400 text-xs font-semibold">
                            U
                        </div>
                    )}
                </button>
            </div>

            {/* PROFILE MODAL OVERLAY */}
            {showProfile && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end justify-center z-50">
                    <div
                        ref={modalRef}
                        className="w-full h-full opacity-0 bg-white rounded-t-3xl p-6 shadow-lg"
                    >
                        <div className="flex justify-center items-center">
                            <button
                                onClick={closeProfile}
                                className="absolute bottom-10 left-1/2 -translate-x-2 text-black text-lg font-bold z-55"
                            >
                                ✕
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
