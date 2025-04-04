import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/passport");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="animate-spin-slow text-6xl">🌍</div>
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Rebirthing to a new world...
      </p>
    </div>
  );
}
