"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import Gallery from "./Gallery";
import Settings from "./Settings";
import EditProfile from "./EditProfile";

import { useUser } from "../Context/UserContext";

function Profile() {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState<"edit" | "gallery" | "settings" | null>("gallery");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case "edit":
                return <EditProfile />;
            case "gallery":
                return <Gallery />;
            case "settings":
                return <Settings />;  // <-- YOUR REAL SETTINGS NOW LOADS
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Top User Button */}
            <button className="absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full shadow-md overflow-hidden">
                {user.profilePic ? (
                    <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        U
                    </div>
                )}
            </button>

            {/* Content Box */}
            <div className="absolute inset-x-0 top-105 -translate-y-1/2
                w-screen h-[65%] rounded-lg mx-auto overflow-hidden">

                <div ref={contentRef} className="w-full h-full">
                    {renderContent()}
                </div>
            </div>

            {/* Bottom Button Bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                      w-full max-w-[500px] h-40 flex items-start justify-around
                      p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">

                <div className="flex justify-center w-full gap-8">
                    <button
                        onClick={() => setActiveTab("edit")}
                        className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-xs shadow-md"
                    >
                        Edit Profile
                    </button>

                    <button
                        onClick={() => setActiveTab("gallery")}
                        className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-xs shadow-md"
                    >
                        Gallery
                    </button>

                    <button
                        onClick={() => setActiveTab("settings")}
                        className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-xs shadow-md"
                    >
                        Settings
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Profile;
