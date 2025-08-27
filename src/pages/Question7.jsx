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
    <div className="border-8 border-[#f58c81] rounded-3xl h-[800px] m-[20px] overflow-auto">
      <h1 className="text-3xl text-[#791a0f] font-bold text-center pt-[30px]">
        Q7.
        <span className="flex justify-center">
          What did you particularly like about these drinks?
        </span>
      </h1>

      {/* sample images with textboxes */}
      <div className="flex justify-center gap-[100px] pt-[50px]">
        {samples.map((sample, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={`/images/drink${index + 2}.png`}
              alt={sample}
              className="h-[200px]"
            />
            <h1 className="text-[#791a0f] text-2xl mt-2">{sample}</h1>
            <textarea
              placeholder={`Your response for ${sample}`}
              value={responses[sample]}
              onChange={(e) => handleChange(sample, e.target.value)}
              className="mt-3 border-2 border-[#791a0f] rounded-lg p-2 w-[250px] h-[100px] resize-none"
            />
          </div>
        ))}
      </div>

      {/* navigation buttons */}
      <div className="flex justify-end gap-[30px] pt-[50px] pr-[40px]">
        <button
          onClick={handlePrevious}
          className="bg-white p-5 w-[130px] border-2 border-[#791a0f] text-[#791a0f] text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isComplete}
          className={`p-5 w-[130px] text-lg rounded-xl cursor-pointer ${
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
