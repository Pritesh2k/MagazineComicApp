"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useUser } from "../Context/UserContext";

function EditProfile() {
  const { user, setUser } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [firstName, setFirstName] = useState(user.firstName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [dob, setDob] = useState(user.dob);
  const [gender, setGender] = useState<"male" | "female" | "other">(user.gender);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.profilePic);

  // Label state
  const [labelText, setLabelText] = useState("Choose Profile Picture");
  const [isImageSelected, setIsImageSelected] = useState(false);

  // Success message
  const [saveMessage, setSaveMessage] = useState("");
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Track if any changes have been made
  const [hasChanges, setHasChanges] = useState(false);

  // GSAP animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 1,
        y: 20,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, []);

  // Handle profile picture change
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      setLabelText("Image Selected!");
      setIsImageSelected(true);
      setHasChanges(true);
    }
  };

  // Reset label text after 5 seconds
  useEffect(() => {
    if (isImageSelected) {
      const timer = setTimeout(() => {
        setLabelText("Choose Profile Picture");
        setIsImageSelected(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isImageSelected]);

  // Auto-save when changes happen
  useEffect(() => {
    if (!hasChanges) return; // Only save if changes have been made

    setUser({
      firstName,
      username,
      email,
      dob,
      gender,
      profilePic: preview,
    });

    setSaveMessage("Changes saved!");
    setShowSaveMessage(true);

    const timer = setTimeout(() => setShowSaveMessage(false), 3000);
    return () => clearTimeout(timer);
  }, [firstName, username, email, dob, gender, preview, setUser, hasChanges]);

  // Mark changes when any input changes
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  return (
    <div
      ref={containerRef}
      className="bg-white w-full h-full p-6 flex flex-col gap-6 rounded-2xl overflow-y-auto"
    >
      <h2 className="text-xl text-center font-bold text-black">Edit Profile</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center gap-3 w-full">
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

      {/* Success message with fade effect */}
      {saveMessage && (
        <div
          className={`text-green-700 font-medium text-center mt-2 transition-opacity duration-500 ${
            showSaveMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          {saveMessage}
        </div>
      )}

      {/* Form Fields */}
      <div className="flex flex-col gap-4 mt-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={handleInputChange(setFirstName)}
            placeholder="Enter first name"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Username</span>
          <input
            type="text"
            value={username}
            onChange={handleInputChange(setUsername)}
            placeholder="Enter username"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Email</span>
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            placeholder="Enter email"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Date of Birth</span>
          <input
            type="date"
            value={dob}
            onChange={handleInputChange(setDob)}
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Gender</span>
          <select
            value={gender}
            onChange={handleInputChange(setGender)}
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
