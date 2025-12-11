"use client";

import React, { createContext, useContext, useState } from "react";

interface User {
  firstName: string;
  username: string;
  email: string;
  dob: string;
  gender: "male" | "female" | "other";
  profilePic: string; // store as URL or base64
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  firstName: "",
  username: "",
  email: "",
  dob: "",
  gender: "male",
  profilePic: "",
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
