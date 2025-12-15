"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

function EditProfile() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form state (just for display, no context updates)
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("other");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("https://via.placeholder.com/150");

  const [labelText, setLabelText] = useState("Choose Profile Picture");
  const [isImageSelected, setIsImageSelected] = useState(false);

  // GSAP animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setLabelText("Image Selected!");
      setIsImageSelected(true);

      setTimeout(() => {
        setLabelText("Choose Profile Picture");
        setIsImageSelected(false);
      }, 3000);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-white/0 w-full h-full p-4 flex flex-col gap-6 overflow-y-auto"
    >
      <h2 className="text-xl text-center font-bold text-black">Edit Profile</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center gap-3 w-full">
        <img
          src={preview}
          alt="Profile Preview"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="hidden"
        />
        <label
          htmlFor="profilePicInput"
          className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium shadow text-center transition-colors
            ${isImageSelected
              ? "bg-green-200 text-green-800 hover:bg-green-300"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {labelText}
        </label>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4 mt-4 mb-5">
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-black">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-black">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-black">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-black">Date of Birth</span>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-black">Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default EditProfile;
