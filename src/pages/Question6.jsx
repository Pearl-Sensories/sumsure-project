import { useState } from "react";
import { useNavigate } from "react-router";

function Question6() {
  const navigate = useNavigate();

  const options = [
    "I would definitely buy",
    "I would probably buy",
    "I might or might not buy",
    "I probably would not buy",
    "I definitely would not buy",
  ];

  const samples = ["Sample A", "Sample B", "Sample C"];

  // Load existing answers for Q6 if available
  const [answers, setAnswers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    return saved.q6 || {};
  });

  const handleChange = (sample, value) => {
    setAnswers((prev) => ({ ...prev, [sample]: value }));
  };

  const allAnswered = Object.keys(answers).length === samples.length;

  const handleNext = () => {
    if (!allAnswered) {
      alert("Please select one option for each sample before proceeding.");
      return;
    }

    // Save Q6 answers to localStorage
    const saved = JSON.parse(localStorage.getItem("responses_user1") || "{}");
    localStorage.setItem(
      "responses_user1",
      JSON.stringify({ ...saved, q6: answers })
    );

    navigate("/question7");
  };

  const handlePrevious = () => {
    navigate("/question5");
  };

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-4 p-4 overflow-auto">
      <h1 className="text-2xl md:text-3xl text-[#791a0f] font-bold text-center pt-6 px-2">
        Q6.
        <span className="block mt-2 text-base md:text-lg">
          If this drink is to be available in the market, <br className="hidden md:block" />
          how likely would you accept and buy it?
        </span>
      </h1>

      {/* sample images */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 pt-10">
        {samples.map((sample, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/images/drink${i + 2}.png`}
              alt={sample}
              className="h-40 md:h-52 object-contain"
            />
            <h1 className="text-[#791a0f] text-lg md:text-2xl mt-2">{sample}</h1>
          </div>
        ))}
      </div>

      {/* options table */}
      <div className="pt-8 px-2 md:px-10 overflow-x-auto">
        <table className="w-full text-[#791a0f] text-sm md:text-lg border-collapse min-w-max">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Sample</th>
              {options.map((option, i) => (
                <th key={i} className="p-2 font-bold text-left whitespace-nowrap">
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
      <div className="flex flex-col md:flex-row justify-center md:justify-end gap-6 mt-10 px-4">
        <button
          onClick={handlePrevious}
          className="bg-white py-3 px-6 border-2 border-[#791a0f] text-[#791a0f] text-base md:text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`py-3 px-6 text-base md:text-lg rounded-xl cursor-pointer ${
            !allAnswered
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#791a0f] text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question6;
