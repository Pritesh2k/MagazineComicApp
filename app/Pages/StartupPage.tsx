"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TransitionWrapper from "../Context/TransitionWrapper";

import { auth } from "../Firebase/config";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { fetchSignInMethodsForEmail } from "firebase/auth";

/* ---------------- TYPES ---------------- */
type Mode = "login" | "signup";

type StartupPageProps = {
    onLoginSuccess: () => void;
};

/* ---------------- COMPONENT ---------------- */
export default function StartupPage({ onLoginSuccess }: StartupPageProps) {
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const loginRef = useRef<HTMLDivElement>(null);
    const signupRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const [mode, setMode] = useState<Mode>("login");
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({ email: "", password: "" });

    // Firebase hooks
    const [signInWithEmailAndPassword, loginUser, loginLoading, loginError] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword, signupUser, signupLoading, signupError] = useCreateUserWithEmailAndPassword(auth);

    const showNotification = (message: string, type: "success" | "error" = "success", duration = 3000) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), duration);
    };

    /* ---------- GSAP ANIMATION ---------- */
    useEffect(() => {
        if (!topRef.current || !bottomRef.current || !logoRef.current || !maskRef.current) return;
        const tl = gsap.timeline({ delay: 0.6 });
        tl.fromTo(
            logoRef.current,
            { yPercent: 120, opacity: 0, scale: 0.9, filter: "blur(8px)" },
            { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.6, ease: "expo.out" }
        )
            .to(logoRef.current, { scale: 1.04, duration: 0.25 })
            .to(logoRef.current, { scale: 1, duration: 0.35 })
            .to(maskRef.current, { scaleY: 0, duration: 0.9, ease: "expo.inOut" }, "-=0.6")
            .to(topRef.current, { height: "40vh", duration: 1, ease: "expo.inOut" })
            .to(bottomRef.current, { height: "60vh", opacity: 1, duration: 1, ease: "power4.out" }, "<");
    }, []);

    /* ---------- MODE TRANSITIONS ---------- */
    useEffect(() => {
        if (!loginRef.current || !signupRef.current || !indicatorRef.current) return;

        loginRef.current.style.pointerEvents = "none";
        signupRef.current.style.pointerEvents = "none";

        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power4.out" } });

        if (mode === "login") {
            loginRef.current.style.pointerEvents = "auto";
            tl.to(signupRef.current, { xPercent: 100, opacity: 0 })
                .fromTo(loginRef.current, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 }, "<")
                .to(indicatorRef.current, { xPercent: 0 }, "<");
        }

        if (mode === "signup") {
            signupRef.current.style.pointerEvents = "auto";
            tl.to(loginRef.current, { xPercent: -100, opacity: 0 })
                .fromTo(signupRef.current, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1 }, "<")
                .to(indicatorRef.current, { xPercent: 100 }, "<");
        }
    }, [mode]);

    /* ---------- CINEMATIC EXIT ---------- */
    const cinematicExit = () => {
        if (!topRef.current || !bottomRef.current || !logoRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(bottomRef.current, { height: 0, opacity: 0, duration: 0.9 })
            .to(topRef.current, { height: "100vh", duration: 0.9 }, "<")
            .to(logoRef.current, { scale: 1.05, duration: 0.3 }, "-=0.4");
    };

    /* ---------- HANDLERS ---------- */
    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            showNotification("Email and password required", "error");
            return;
        }

        try {
            const userCred = await signInWithEmailAndPassword(
                loginData.email.trim(),
                loginData.password
            );

            if (userCred) {
                showNotification("Login successful!", "success");
                cinematicExit();
                setTimeout(onLoginSuccess, 900);
            }
        } catch (err: any) {
            // 🔑 Firebase tells us EXACTLY what failed
            switch (err.code) {
                case "auth/user-not-found":
                    showNotification("Account not found. Please sign up.", "error");
                    setSignupData({ email: loginData.email, password: "" });
                    setMode("signup");
                    break;

                case "auth/wrong-password":
                    showNotification("Incorrect password", "error");
                    break;

                case "auth/invalid-email":
                    showNotification("Invalid email address", "error");
                    break;

                default:
                    showNotification("Login failed. Please try again.", "error");
            }
        }
    };

    const handleSignup = async () => {
        if (!signupData.email || !signupData.password) return showNotification("Email and password required", "error");

        try {
            // Check if user already exists
            const methods = await fetchSignInMethodsForEmail(auth, signupData.email);
            if (methods.length > 0) {
                showNotification("User already exists. Redirecting to Login...", "error");
                setLoginData({ ...loginData, email: signupData.email });
                setMode("login");
                return;
            }

            const user = await createUserWithEmailAndPassword(signupData.email, signupData.password);
            if (user) {
                showNotification("Signup successful!", "success");
                cinematicExit();
                setTimeout(onLoginSuccess, 900);
            }
        } catch (err: any) {
            showNotification(err.message || "Signup failed", "error");
        }
    };

    /* ---------- EFFECTS FOR ERRORS ---------- */
    useEffect(() => {
        if (loginError) showNotification(loginError.message, "error");
        if (signupError) showNotification(signupError.message, "error");
    }, [loginError, signupError]);

    /* ---------------- UI ---------------- */
    return (
        <div className="w-screen h-screen flex flex-col bg-red-700 overflow-hidden relative">
            {notification && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg z-50">
                    {notification.message}
                </div>
            )}

            {/* TOP */}
            <div ref={topRef} className="relative w-full flex items-center justify-center" style={{ height: "100vh" }}>
                <div ref={maskRef} className="absolute inset-0 bg-red-700 z-10 pointer-events-none" />
                <div ref={logoRef} className="relative z-20 text-white text-center">
                    <h1 className="text-6xl font-black">RE·MAG</h1>
                    <p className="mt-2 text-xs tracking-widest opacity-70">READ · WATCH · FEEL</p>
                </div>
            </div>

            {/* BOTTOM */}
            <TransitionWrapper>
                <div ref={bottomRef} className="bg-white rounded-t-3xl p-6 opacity-0" style={{ height: 0 }}>
                    <div className="relative flex mb-4">
                        <button onClick={() => setMode("login")} className="flex-1 font-semibold">Login</button>
                        <button onClick={() => setMode("signup")} className="flex-1 font-semibold">Sign Up</button>
                        <div ref={indicatorRef} className="absolute -bottom-3 left-0 w-1/2 h-0.5 bg-black" />
                    </div>

                    <div className="relative h-[calc(60vh-60px)] overflow-hidden">
                        {/* LOGIN */}
                        <div ref={loginRef} className="absolute w-full opacity-0">
                            <div className="flex justify-center items-center w-full font-semibold mt-5 py-8">Already have an account?</div>
                            <input type="email" placeholder="Email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="w-full mb-4 p-3 border rounded" />
                            <input type="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="w-full mb-6 p-3 border rounded" />
                            <button onClick={handleLogin} className="w-full bg-red-700 text-white py-3 rounded">Continue</button>
                        </div>

                        {/* SIGNUP */}
                        <div ref={signupRef} className="absolute w-full opacity-0">
                            <div className="flex justify-center items-center w-full font-semibold mt-5 py-8">Let's create an account!</div>
                            <input type="email" placeholder="Email" value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} className="w-full mb-4 p-3 border rounded" />
                            <input type="password" placeholder="Password" value={signupData.password} onChange={e => setSignupData({ ...signupData, password: e.target.value })} className="w-full mb-6 p-3 border rounded" />
                            <button onClick={handleSignup} className="w-full bg-red-700 text-white py-3 rounded">Create Account</button>
                        </div>
                    </div>
                </div>
            </TransitionWrapper>
        </div>
    );
}
