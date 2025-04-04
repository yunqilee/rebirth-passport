// src/components/Passport.tsx
import { Link } from "react-router-dom";

interface Props {
  userInfo: {
    name: string;
    gender: string;
    birthday: string;
    passportNumber: string;
    issueDate: string;
    expiryDate: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
}

export default function Passport({ userInfo, country }: Props) {
  return (
    <div
      id="passport-card"
      className="relative border rounded-lg p-6 shadow-md max-w-md mx-auto overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, #f0f4f8, #ffffff),
          url("https://www.transparenttextures.com/patterns/white-wall-3.png")
        `,
        backgroundColor: "#ffffff",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-xl font-bold mb-4">🛂 Passport</h2>
      <div className="flex items-start">
        <div
          className="w-24 h-32 rounded flex items-center justify-center text-sm flex-shrink-0"
          style={{ backgroundColor: "rgb(229, 231, 235)" }}
        >
          photo
        </div>

        <div className="text-sm ml-15 flex-1">
          <div className="space-y-1">
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Gender:</strong> {userInfo.gender}
            </p>
            <p>
              <strong>Birthday:</strong> {userInfo.birthday}
            </p>
            <p>
              <strong>Nationality:</strong> {country.flag} {country.name}
            </p>
            <p>
              <strong>Passport No:</strong> {userInfo.passportNumber}
            </p>
            <p>
              <strong>Issue Date:</strong> {userInfo.issueDate}
            </p>
            <p>
              <strong>Expiry Date:</strong> {userInfo.expiryDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
