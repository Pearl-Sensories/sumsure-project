import {Link, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

function Question8() {
  const navigate = useNavigate();

  const samples = ["Sample A", "Sample B", "Sample C"];

  const [responses, setResponses] = useState({
    "Sample A": "",
    "Sample B": "",
    "Sample C": "",
  });

  const handleChange = (sample, value) => {
    setResponses((prev) => ({ ...prev, [sample]: value }));
  };

  const isComplete = Object.values(responses).every((val) => val.trim() !== "");

  const handleNext = () => {
    if (!isComplete) return;
    const allResponses =
      JSON.parse(localStorage.getItem("surveyResponses")) || {};
    allResponses.question8 = responses;
    localStorage.setItem("surveyResponses", JSON.stringify(allResponses));
    navigate("/question9");
  };

  const handlePrevious = () => {
    navigate("/question7");
  };

  useEffect(() => {
    const allResponses =
      JSON.parse(localStorage.getItem("surveyResponses")) || {};
    if (allResponses.question8) {
      setResponses(allResponses.question8);
    }
  }, []);

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl min-h-screen m-[20px] overflow-auto">
      <h1 className="text-3xl text-[#791a0f] font-bold text-center pt-[30px] px-4">
        Q8.
        <span className="block mt-2">
          What if anything, did you particularly dislike about these drinks?
        </span>
      </h1>

      {/* sample images with textboxes */}
      <div className="flex flex-wrap justify-center gap-10 pt-[50px] px-4">
        {samples.map((sample, index) => (
          <div key={index} className="flex flex-col items-center w-full sm:w-[250px]">
            <img
              src={`/images/drink${index + 2}.png`}
              alt={sample}
              className="h-[150px] sm:h-[200px] object-contain"
            />
            <h1 className="text-[#791a0f] text-xl sm:text-2xl mt-2">{sample}</h1>
            <textarea
              placeholder={`Your response for ${sample}`}
              value={responses[sample]}
              onChange={(e) => handleChange(sample, e.target.value)}
              className="mt-3 border-2 border-[#791a0f] rounded-lg p-2 w-full sm:w-[250px] h-[100px] resize-none"
            />
          </div>
        ))}
      </div>

      {/* navigation buttons */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-5 pt-[50px] pr-[40px]">
        <Link to="/question7">
        <button
          className="bg-white px-6 py-3 w-[130px] border-2 border-[#791a0f] text-[#791a0f] text-lg rounded-xl cursor-pointer"
        >
          Back
        </button>
        </Link>

        <button
          onClick={handleNext}
          disabled={!isComplete}
          className={`px-6 py-3 w-[130px] text-lg rounded-xl cursor-pointer ${
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

export default Question8;
