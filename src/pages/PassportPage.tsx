import Passport from "../components/Passport";
import { Link } from "react-router-dom";

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

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Passport userInfo={userInfo} country={country} />
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline border border-blue-500 px-3 py-1 rounded"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
