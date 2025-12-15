"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import Gallery from "./Gallery";
import Settings from "./Settings";
import EditProfile from "./EditProfile";

import { useUser } from "../Context/UserContext";
import { useUserLayout } from "../Context/UserLayoutContext";

import TextPressure from "../../components/TextPressure";

type ProfileProps = {
    onLogout?: () => void;
};

function Profile({ onLogout }: ProfileProps) {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState<"edit" | "gallery" | "settings">("gallery");
    const contentRef = useRef<HTMLDivElement>(null);
    const { wallpaper } = useUserLayout();

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
            case "edit": return <EditProfile key="edit" />;
            case "gallery": return <Gallery key="gallery" />;
            case "settings": return <Settings key="settings" />;
            default: return null;
        }
    };

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
        }
    }, [activeTab]);

    return (
        <div className="w-full h-screen flex flex-col items-center relative overflow-hidden">

            {/* Wallpaper */}
            <div className="absolute bg-white inset-0 -z-10">
                {wallpaper && (
                    <img
                        src={wallpaper}
                        alt="Wallpaper"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* HEADER */}
            <div className="w-full flex justify-center mt-2">
                <div
                    className="
                    w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw]
                    h-[15vh]
                    flex justify-center items-center
                    overflow-none
                "
                >
                    <TextPressure text={user.username} textColor="black" className="-translate-y-4" />
                </div>

                {/* profile picture */}
                <button
                    className="
                    absolute top-30 lg:top-42 lg:-translate-x-2 z-10
                    w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
                    rounded-full shadow-md overflow-hidden
                    border border-red-700
                "
                >
                    {user.profilePic ? (
                        <img src={user.profilePic} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-400 flex justify-center items-center text-xs text-white">
                            U
                        </div>
                    )}
                </button>
            </div>

            {/* CONTENT AREA – FLEX GROW, PERFECTLY CENTERED, SCROLLABLE */}
            <div className="flex w-full max-w-[500px] justify-center items-center">
                <div
                    className="w-full max-w-[500px] overflow-y-scroll mt-15 lg:mt-22 pb-2"
                    style={{
                        maxHeight: "calc(90vh - 30vh)", // adjust to leave space for header/footer/buttons
                        scrollBehavior: "smooth",
                    }}
                    ref={contentRef}
                >
                    {renderContent()}
                </div>
            </div>


            {/* BOTTOM BAR */}
            <div
                className="
                w-[95vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw]
                h-32 flex items-start justify-around
                p-5 rounded-2xl
                absolute bottom-5 left-1/2 -translate-x-1/2
            "
            >
                <div className="flex justify-center w-full gap-8 -mt-4">
                    {/* Edit Tab */}
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`
      w-12 h-12 rounded-full
      flex justify-center items-center text-[10px] md:text-sm
      shadow-md backdrop-blur-md transition-all duration-300
      border border-red-700
      ${activeTab === 'edit' ? 'bg-red-700 text-white' : 'bg-white text-black'}
    `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>

                    {/* Gallery Tab */}
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`
      w-12 h-12 rounded-full
      flex justify-center items-center text-[10px] md:text-sm
      shadow-md backdrop-blur-md transition-all duration-300 border border-red-700
      ${activeTab === 'gallery' ? 'bg-red-700 text-white' : 'bg-white text-black'}
    `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>

                    {/* Settings Tab */}
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`
      w-12 h-12 rounded-full
      flex justify-center items-center text-[10px] md:text-sm
      shadow-md backdrop-blur-md transition-all duration-300
      border border-red-700
      ${activeTab === 'settings' ? 'bg-red-700 text-white' : 'bg-white text-black'}
    `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>

                    {/* Logout Tab */}
                    <button
                        onClick={() => {
                            localStorage.removeItem("currentUser"); // optional
                            onLogout?.(); // trigger parent to switch to login
                        }}
                        className="
                            w-12 h-12 rounded-full
                            flex justify-center items-center text-[10px] md:text-sm
                            bg-white border border-red-700 text-red-700
                            shadow-md backdrop-blur-md transition-all duration-300
                        "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
