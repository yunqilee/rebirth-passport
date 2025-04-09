// src/components/InputForm.tsx

import React, { useState } from "react";

interface Props {
  onRebirth: (data: any) => void;
}

export default function InputForm({ onRebirth }: Props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [birthday, setBirthday] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthday) return;

    onRebirth({ name, gender, birthday, photo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Birthday</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </div>

      <label className="block text-sm font-medium mb-1">Upload Photo</label>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => document.getElementById("photoInput")?.click()}
          className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 px-3 py-2 rounded"
        >
          📷 Choose File
        </button>

        {photo && (
          <span className="text-xs text-green-600">✔️ Photo uploaded</span>
        )}

        <input
          id="photoInput"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPhoto(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="hidden"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔁 Rebirth!
      </button>
    </form>
  );
}
