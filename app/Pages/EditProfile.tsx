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

  // Track if manual fields changed
  const [manualChanges, setManualChanges] = useState(false);

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

  // Handle profile picture change (auto-save)
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      setLabelText("Image Selected!");
      setIsImageSelected(true);

      // Auto-save profile picture
      setUser({ ...user, profilePic: previewURL });
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

  // Auto-save for DOB and Gender
  useEffect(() => {
    setUser({ ...user, dob, gender });
  }, [dob, gender, setUser]);

  // Handle manual input change
  const handleManualChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(e.target.value);
    setManualChanges(true);
  };

  // Manual save button handler
  const handleManualSave = () => {
    setUser({ ...user, firstName, username, email });
    setSaveMessage("Changes saved!");
    setShowSaveMessage(true);
    setManualChanges(false);

    const timer = setTimeout(() => setShowSaveMessage(false), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div
      ref={containerRef}
      className="bg-white/0 w-full h-full p-4 flex flex-col gap-6 overflow-y-auto"
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

      {/* Success message */}
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
      <div className="flex flex-col gap-4 mt-4 mb-5">
        {/* Manual Save Fields */}
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={handleManualChange(setFirstName)}
            placeholder="Enter first name"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Username</span>
          <input
            type="text"
            value={username}
            onChange={handleManualChange(setUsername)}
            placeholder="Enter username"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Email</span>
          <input
            type="email"
            value={email}
            onChange={handleManualChange(setEmail)}
            placeholder="Enter email"
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        {manualChanges && (
          <button
            type="button"
            onClick={handleManualSave}
            className="mt-2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        )}

        {/* Auto-save Fields */}
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Date of Birth</span>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800">Gender</span>
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
