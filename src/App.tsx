// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PassportPage from "./pages/PassportPage";
import Loading from "./pages/Loading";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [country, setCountry] = useState<any>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home setUserInfo={setUserInfo} setCountry={setCountry} />}
        />
        <Route
          path="/passport"
          element={<PassportPage userInfo={userInfo} country={country} />}
        />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Analytics />
    </Router>
  );
}
