import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

function Question7() {
  const navigate = useNavigate();

  const samples = ["Sample A", "Sample B", "Sample C"];

  // local state for text inputs
  const [responses, setResponses] = useState({
    "Sample A": "",
    "Sample B": "",
    "Sample C": "",
  });

  const handleChange = (sample, value) => {
    setResponses((prev) => ({ ...prev, [sample]: value }));
  };

  // check if all fields are filled
  const isComplete = Object.values(responses).every(
    (val) => val.trim() !== ""
  );

  const handleNext = () => {
    if (!isComplete) return;

    // read existing user responses
    const saved =
      JSON.parse(localStorage.getItem("responses_user1")) || {};

    // add/update Q7
    const updated = { ...saved, q7: responses };

    // save back to localStorage
    localStorage.setItem("responses_user1", JSON.stringify(updated));

    navigate("/question8");
  };

  const handlePrevious = () => {
    navigate("/question6");
  };

  // load saved responses when returning back
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("responses_user1")) || {};
    if (saved.q7) {
      setResponses(saved.q7);
    }
  }, []);

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-[10px] sm:m-[20px] p-4 sm:p-8 overflow-auto">
      <h1 className="text-2xl sm:text-3xl text-[#791a0f] font-bold text-center pt-4">
        Q7.
        <span className="block mt-2 text-lg sm:text-xl">
          What did you particularly like about these drinks?
        </span>
      </h1>

      {/* sample images with textboxes */}
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-[100px] pt-8">
        {samples.map((sample, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white/20 rounded-xl p-4 shadow-md"
          >
            <img
              src={`/images/drink${index + 2}.png`}
              alt={sample}
              className="h-[150px] sm:h-[200px] object-contain"
            />
            <h1 className="text-[#791a0f] text-lg sm:text-2xl mt-2 font-semibold">
              {sample}
            </h1>
            <textarea
              placeholder={`Your response for ${sample}`}
              value={responses[sample]}
              onChange={(e) => handleChange(sample, e.target.value)}
              className="mt-3 border-2 border-[#791a0f] rounded-lg p-2 w-[90%] sm:w-[250px] h-[100px] resize-none text-sm sm:text-base"
            />
          </div>
        ))}
      </div>

      {/* navigation buttons */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 sm:gap-[30px] pt-8 sm:pr-[40px]">
        <Link to="/question6">
        <button
          className="bg-white px-5 py-3 w-full sm:w-[130px] border-2 border-[#791a0f] text-[#791a0f] text-base sm:text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>
        </Link>

        <button
          onClick={handleNext}
          disabled={!isComplete}
          className={`px-5 py-3 w-full sm:w-[130px] text-base sm:text-lg rounded-xl cursor-pointer ${
            isComplete
              ? "bg-[#791a0f] text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question7;
