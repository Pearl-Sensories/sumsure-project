import React, { useState } from "react";
import { useNavigate } from "react-router";

function Question3() {
  const navigate = useNavigate();

  const options = [
    "Much too sweet",
    "A little too sweet",
    "Just right",
    "A little too sour",
    "Much too sour",
  ];

  const samples = ["Sample A", "Sample B", "Sample C"];

  // Load existing answers for Q3 if available
  const [answers, setAnswers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    return saved.q3 || { "Sample A": "", "Sample B": "", "Sample C": "" };
  });

  const handleChange = (sample, value) => {
    setAnswers((prev) => ({ ...prev, [sample]: value }));
  };

  const allAnswered = Object.values(answers).every((val) => val !== "");

  const handleNext = () => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    localStorage.setItem(
      "responses_user1",
      JSON.stringify({ ...saved, q3: answers })
    );
    navigate("/question4");
  };

  const handlePrevious = () => {
    navigate("/question2");
  };

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-4 p-4 overflow-auto">
      <h1 className="text-2xl md:text-3xl text-[#791a0f] font-bold text-center pt-6">
        Q3.
        <span className="block mt-2">
          What is your opinion of the taste/sweetness of this drink? <br />
          Would you say the taste is...?
        </span>
      </h1>

      {/* sample images */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-20 pt-8">
        {samples.map((sample, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/images/drink${i + 2}.png`}
              alt={sample}
              className="h-40 md:h-52"
            />
            <h1 className="text-[#791a0f] text-lg md:text-2xl mt-2">
              {sample}
            </h1>
          </div>
        ))}
      </div>

      {/* options table */}
      <div className="pt-8 overflow-x-auto">
        <table className="w-full text-[#791a0f] text-sm md:text-lg border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Sample</th>
              {options.map((option, i) => (
                <th key={i} className="p-2 font-bold">
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
                      className="w-4 h-4 md:w-5 md:h-5 accent-[#791a0f]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* navigation buttons */}
      <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="bg-white px-6 py-3 border-2 border-[#791a0f] text-[#791a0f] text-base md:text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`px-6 py-3 text-white text-base md:text-lg rounded-xl cursor-pointer ${
            allAnswered ? "bg-[#791a0f]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question3;
