"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function EditProfile() {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  /* ----------------------------------
     GSAP ENTRY — FLY FROM BOTTOM
  ---------------------------------- */
  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
    });

    // Force visible (important for Next remounts)
    gsap.set(cardRef.current, { opacity: 1 });
    gsap.set(contentRef.current.children, { opacity: 0, y: 40 });

    tl.from(cardRef.current, {
      y: 120,
      opacity: 0,
      duration: 0.1,
    }).to(
      contentRef.current.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
      },
      "-=0.3"
    );
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePic(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-center p-4">
      <form ref={cardRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-md -mt-25"
      >
        <div ref={contentRef} className="flex flex-col gap-5">
          {/* HEADER */}
          <h2 className="text-2xl font-black text-center mb-5">
            Your Profile
          </h2>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer group">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-red-700 shadow-md">
                {profilePic ? (
                  <img
                    src={profilePic}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Upload
                  </div>
                )}
              </div>

              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                Change
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

          {/* FIRST NAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@johnny"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-2 rounded-lg border font-medium transition-all ${gender === g
                    ? "bg-red-600 text-white scale-105"
                    : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* SAVE */}
          <button
            className="w-full py-3 bg-red-600 text-white font-bold mb-5 rounded-xl shadow hover:bg-red-500 active:scale-95 transition"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
