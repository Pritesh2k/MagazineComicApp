"use client";
import { createContext, useContext, useState } from "react";

type ButtonId = "like" | "comment" | "view" | "next";
type Alignment = "left" | "center" | "right";
type SearchPosition = "left" | "right";

interface LayoutSettings {
    order: ButtonId[];
    alignment: Alignment;
    searchPosition: SearchPosition;
    wallpaper: string; // <-- add wallpaper
    setOrder: (order: ButtonId[]) => void;
    setAlignment: (alignment: Alignment) => void;
    setSearchPosition: (pos: SearchPosition) => void;
    setWallpaper: (wallpaper: string) => void; // <-- add setter
}

const UserLayoutContext = createContext<LayoutSettings | null>(null);

export function UserLayoutProvider({ children }: { children: React.ReactNode }) {
    const [order, setOrder] = useState<ButtonId[]>(["like", "comment", "view", "next"]);
    const [alignment, setAlignment] = useState<Alignment>("center");
    const [searchPosition, setSearchPosition] = useState<SearchPosition>("right");
    const [wallpaper, setWallpaper] = useState<string>(""); // <-- add wallpaper state

    return (
        <UserLayoutContext.Provider
            value={{
                order,
                setOrder,
                alignment,
                setAlignment,
                searchPosition,
                setSearchPosition,
                wallpaper,       // <-- include wallpaper
                setWallpaper,    // <-- include setter
            }}
        >
            {children}
        </UserLayoutContext.Provider>
    );
}

export function useUserLayout() {
    const ctx = useContext(UserLayoutContext);
    if (!ctx) throw new Error("useUserLayout must be used inside UserLayoutProvider");
    return ctx;
}
