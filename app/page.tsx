"use client";

import { useState } from "react";
import Main from "./Pages/Main";
import StartupPage from "./Pages/StartupPage";
import TransitionWrapper from "./Context/TransitionWrapper";
import Swiper from "./Pages/Swiper";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setAuthenticated(false);
  };

  return (
    <div className="w-screen h-screen">
      <TransitionWrapper>
        {authenticated ? (
          <Main onLogout={handleLogout} />
        ) : (
          <StartupPage onLoginSuccess={() => setAuthenticated(true)} />
        )}
      </TransitionWrapper>
    </div>
  );
}
