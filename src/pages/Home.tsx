import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { selectCountryByPopulation } from "../utils/selectCountryByPopulation";
import { generatePassportNumber } from "../utils/generatePassportNumber";

export default function Home({ setUserInfo, setCountry }: any) {
  const navigate = useNavigate();

  const handleRebirth = (data: any) => {
    const randomCountry = selectCountryByPopulation();
    const passportNumber = generatePassportNumber(randomCountry.code);
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(issueDate.getFullYear() + 10);

    setUserInfo({
      ...data,
      passportNumber,
      issueDate: issueDate.toISOString().split("T")[0],
      expiryDate: expiryDate.toISOString().split("T")[0],
    });
    setCountry(randomCountry);
    navigate("/loading");
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">
          🌀 Rebirth: Your New Passport
        </h1>
      </div>
      <InputForm onRebirth={handleRebirth} />
    </div>
  );
}
