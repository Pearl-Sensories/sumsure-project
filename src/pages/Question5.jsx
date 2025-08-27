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
    <div className="border-8 border-[#f58c81] rounded-3xl h-[800px] m-[20px] overflow-auto">
      <h1 className="text-3xl text-[#791a0f] font-bold text-center pt-[30px]">
        Q5.
        <span className="flex justify-center text-center">
          What's your overall liking of this drink? <br />
          Would you say that this drink is...?
        </span>
      </h1>

      {/* sample images */}
      <div className="flex justify-center gap-[100px] pt-[50px]">
        {samples.map((sample, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={`/images/drink${i + 2}.png`}
              alt={sample}
              className="h-[200px]"
            />
            <h1 className="text-[#791a0f] text-2xl mt-2">{sample}</h1>
          </div>
        ))}
      </div>

      {/* options table */}
      <div className="pt-[40px] px-[40px]">
        <table className="w-full text-[#791a0f] text-xl border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold">Sample</th>
              {options.map((option, i) => (
                <th key={i} className="p-2 text-xl font-bold">
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
                      className="w-5 h-5 accent-[#791a0f]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* navigation buttons */}
      <span className="flex gap-[30px]">
        <button
          onClick={handlePrevious}
          className="bg-white p-5 w-[130px] border-2 border-[#791a0f] text-[#791a0f] text-lg rounded-xl ml-[90rem] mt-[50px] cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`p-5 w-[130px] text-lg rounded-xl mt-[50px] cursor-pointer ${
            allAnswered
              ? "bg-[#791a0f] text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </span>
    </div>
  );
}

export default Question5;
