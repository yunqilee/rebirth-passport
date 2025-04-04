import Passport from "../components/Passport";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

export default function PassportPage({ userInfo, country }: any) {
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
