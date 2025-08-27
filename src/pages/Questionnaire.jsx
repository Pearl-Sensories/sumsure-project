import React, { useState } from "react";
import { useNavigate } from "react-router";

function Questionnaire() {
  const navigate = useNavigate();

  const options = [
    "Excellent",
    "Very Good",
    "Good",
    "Neither Good nor Poor",
    "Poor",
    "Very Poor",
    "Extremely Poor",
  ];

  const samples = ["Sample A", "Sample B", "Sample C"];

  // Load saved answers for Q1 if available
  const [answers, setAnswers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    return saved.q1 || { "Sample A": "", "Sample B": "", "Sample C": "" };
  });

  const handleChange = (sample, value) => {
    setAnswers((prev) => ({ ...prev, [sample]: value }));
  };

  const allAnswered = Object.values(answers).every((val) => val !== "");

  const handleNext = () => {
    // Save Q1 answers into localStorage
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    localStorage.setItem(
      "responses_user1",
      JSON.stringify({ ...saved, q1: answers })
    );

    // Move to Question 2
    navigate("/question2");
  };

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-5 overflow-auto p-5">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#791a0f] font-bold text-center">
        Q1.
        <span className="block mt-2">
          What do you think of the appearance/colour of this drink? <br />
          Would you say that the appearance of this drink is...?
        </span>
      </h1>

      {/* sample images */}
      <div className="flex flex-col md:flex-row justify-center gap-10 pt-10">
        {samples.map((sample, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/images/drink${i + 2}.png`}
              alt={sample}
              className="h-40 sm:h-48 md:h-52 lg:h-[200px] object-contain"
            />
            <h1 className="text-[#791a0f] text-lg sm:text-xl md:text-2xl mt-2">
              {sample}
            </h1>
          </div>
        ))}
      </div>

      {/* options table */}
      <div className="pt-10 overflow-x-auto">
        <table className="w-full text-[#791a0f] text-sm sm:text-base md:text-lg border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Sample</th>
              {options.map((option, i) => (
                <th key={i} className="p-2 font-bold text-center">
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {samples.map((sample, i) => (
              <tr key={i} className="text-center">
                <td className="text-left font-bold p-2">{sample}</td>
                {options.map((option, j) => (
                  <td key={j} className="p-2">
                    <input
                      type="radio"
                      name={sample}
                      value={option}
                      checked={answers[sample] === option}
                      onChange={() => handleChange(sample, option)}
                      className="w-4 h-4 sm:w-5 sm:h-5 accent-[#791a0f]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* navigation */}
      <div className="flex justify-center md:justify-end mt-8">
        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`p-3 sm:p-4 md:p-5 w-32 sm:w-40 text-white text-base sm:text-lg rounded-xl ${
            allAnswered ? "bg-[#791a0f]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
