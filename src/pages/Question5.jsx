import { useState } from "react";
import { useNavigate } from "react-router";

function Question5() {
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

  // Load existing answers for Q5 if available (Option 1 style)
  const [answers, setAnswers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    return saved.q5 || {};
  });

  const handleChange = (sample, value) => {
    setAnswers((prev) => ({ ...prev, [sample]: value }));
  };

  const allAnswered = samples.every((sample) => answers[sample]);

  const handleNext = () => {
    if (!allAnswered) {
      alert("Please select one option for each sample before proceeding.");
      return;
    }

    // Save Q5 answers to localStorage (Option 1 style)
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    saved.q5 = answers;
    localStorage.setItem("responses_user1", JSON.stringify(saved));

    navigate("/question6"); // Navigate to next question
  };

  const handlePrevious = () => {
    navigate("/question4");
  };

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-5 p-4 overflow-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#791a0f] font-bold text-center pt-6">
        Q5.
        <span className="block mt-2 text-center">
          What's your overall liking of this drink? <br />
          Would you say that this drink is...?
        </span>
      </h1>

      {/* sample images */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-12 pt-10">
        {samples.map((sample, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/images/drink${i + 2}.png`}
              alt={sample}
              className="h-32 sm:h-40 md:h-52 object-contain"
            />
            <h1 className="text-[#791a0f] text-lg sm:text-xl md:text-2xl mt-2 text-center">
              {sample}
            </h1>
          </div>
        ))}
      </div>

      {/* options table */}
      <div className="pt-8 overflow-x-auto">
        <table className="w-full min-w-[600px] text-[#791a0f] text-sm sm:text-base md:text-lg border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Sample</th>
              {options.map((option, i) => (
                <th key={i} className="p-2 font-bold whitespace-nowrap">
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
                      className="w-4 h-4 accent-[#791a0f]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* navigation buttons */}
      <div className="flex justify-between items-center flex-wrap gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="bg-white px-6 py-3 border-2 border-[#791a0f] text-[#791a0f] text-base sm:text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`px-6 py-3 text-base sm:text-lg rounded-xl cursor-pointer ${
            allAnswered
              ? "bg-[#791a0f] text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question5;
