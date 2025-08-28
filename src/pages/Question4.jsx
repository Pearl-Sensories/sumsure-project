import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Question4() {
  const navigate = useNavigate();

  const options = [
    "Much too thick, I don't like it",
    "A little too thick, I don't like it",
    "Just right, just as I like it",
    "A little too thin/watery, I don't like it",
    "Much too thin/watery, I don't like it",
  ];

  const samples = ["Sample A", "Sample B", "Sample C"];

  // Load existing answers for Q4 if available
  const [answers, setAnswers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    return saved.q4 || {};
  });

  const handleChange = (sample, value) => {
    setAnswers((prev) => ({ ...prev, [sample]: value }));
  };

  const allAnswered = samples.every((sample) => answers[sample]);

  const handleNext = () => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    saved.q4 = answers;
    localStorage.setItem("responses_user1", JSON.stringify(saved));
    navigate("/question5");
  };


  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-[20px] overflow-auto">
      <h1 className="text-2xl sm:text-3xl text-[#791a0f] font-bold text-center pt-[30px] px-4">
        Q4.
        <span className="block mt-2">
          What do you think of the mouthfeel thickness of this drink? <br />
          Would you say the texture of this drink is...?
        </span>
      </h1>

      {/* sample images */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-[100px] pt-[50px]">
        {samples.map((sample, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/images/drink${i + 2}.png`}
              alt={sample}
              className="h-[150px] sm:h-[200px] object-contain"
            />
            <h1 className="text-[#791a0f] text-lg sm:text-2xl mt-2">{sample}</h1>
          </div>
        ))}
      </div>

      {/* options table */}
      <div className="pt-[40px] px-2 sm:px-[40px] overflow-x-auto">
        <table className="w-full min-w-[600px] text-[#791a0f] text-sm sm:text-lg border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Sample</th>
              {options.map((option, i) => (
                <th key={i} className="p-2 font-bold text-left sm:text-center">
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

      {/* navigation buttons */}
      <div className="flex justify-between flex-wrap gap-4 px-4 sm:px-[40px] mt-[50px]">
         <Link to="/question3">
        <button
          className="bg-white p-3 sm:p-5 w-[100px] sm:w-[130px] border-2 border-[#791a0f] text-[#791a0f] text-base sm:text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>
        </Link>


        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`p-3 sm:p-5 w-[100px] sm:w-[130px] text-white text-base sm:text-lg rounded-xl cursor-pointer ${
            allAnswered ? "bg-[#791a0f]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question4;
