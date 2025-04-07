import { useEffect, useRef, useState } from "react";
import Passport from "../components/Passport";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { countries } from "../data/countries";

export default function PassportPage({ userInfo, country }: any) {
  const [showFireworks, setShowFireworks] = useState(true);
  const fireworksRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowFireworks(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = fireworksRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: any[] = [];
    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6,
        alpha: 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.01;
      });
      ctx.globalAlpha = 1;
      particles = particles.filter((p) => p.alpha > 0);
      if (particles.length > 0) requestAnimationFrame(animate);
    };
    animate();
  }, [showFireworks]);

  const getCountryProbability = (code: string) => {
    const total = countries.reduce((sum, c) => sum + c.population, 0);
    const target = countries.find((c) => c.code === code);
    if (!target) return null;
    return ((target.population / total) * 100).toFixed(2);
  };

  const probability = getCountryProbability(country.code);

  if (!userInfo || !country) {
    return (
      <div className="p-4 text-center">
        <p>No passport generated yet.</p>
        <Link to="/" className="text-blue-600 underline">
          ← Go back
        </Link>
      </div>
    );
  }

  const handleSaveScreenshot = async () => {
    const el = document.getElementById("passport-card");
    if (!el) return;

    const originalStyle = {
      backgroundImage: el.style.backgroundImage,
      backgroundColor: el.style.backgroundColor,
      boxShadow: el.style.boxShadow,
      borderRadius: el.style.borderRadius,
    };

    el.style.backgroundImage = "none";
    el.style.backgroundColor = "#ffffff";
    el.style.boxShadow = "none";
    el.style.borderRadius = "0";

    try {
      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `passport_${userInfo.name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Screenshot error:", error);
    } finally {
      el.style.backgroundImage = originalStyle.backgroundImage;
      el.style.backgroundColor = originalStyle.backgroundColor;
      el.style.boxShadow = originalStyle.boxShadow;
      el.style.borderRadius = originalStyle.borderRadius;
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="text-center text-2xl font-bold mb-2">
        🎉 Congrats, you rebirthed to {country.flag} {country.name}!
      </div>
      {probability && (
        <div className="text-left text-sm text-gray-600 mb-4 max-w-md mx-auto leading-relaxed">
          Do you know? Based on population distribution of this app, you had a
          <span className="font-semibold text-blue-700"> {probability}% </span>
          chance of being reborn in this country.
        </div>
      )}

      <canvas
        ref={fireworksRef}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10"
      />

      <Passport userInfo={userInfo} country={country} />
      <div className="mt-6 text-center space-x-4">
        <Link
          to="/"
          className="inline-block text-sm font-medium text-blue-700 hover:bg-blue-100 border border-blue-600 px-4 py-2 rounded"
        >
          ← Back to Home
        </Link>
        <button
          onClick={handleSaveScreenshot}
          className="inline-block text-sm font-medium text-green-700 hover:bg-green-100 border border-green-600 px-4 py-2 rounded"
        >
          📸 Save Passport
        </button>
      </div>
    </div>
  );
}
