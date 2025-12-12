"use client";
import { createContext, useContext, useState } from "react";

type ButtonId = "like" | "comment" | "view" | "next";
type Alignment = "left" | "center" | "right";
type SearchPosition = "left" | "right";
type TextColor = "black" | "white";

interface LayoutSettings {
    order: ButtonId[];
    alignment: Alignment;
    searchPosition: SearchPosition;
    textColor: TextColor;
    wallpaper: string;

    setOrder: (order: ButtonId[]) => void;
    setAlignment: (alignment: Alignment) => void;
    setSearchPosition: (pos: SearchPosition) => void;
    setTextColor: (color: TextColor) => void;
    setWallpaper: (wallpaper: string) => void;
}

const UserLayoutContext = createContext<LayoutSettings | null>(null);

export function UserLayoutProvider({ children }: { children: React.ReactNode }) {
    const [order, setOrder] = useState<ButtonId[]>(["like", "comment", "view", "next"]);
    const [alignment, setAlignment] = useState<Alignment>("center");
    const [searchPosition, setSearchPosition] = useState<SearchPosition>("right");
    const [textColor, setTextColor] = useState<TextColor>("black");
    const [wallpaper, setWallpaper] = useState<string>("");

    return (
        <UserLayoutContext.Provider
            value={{
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
