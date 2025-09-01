import { Link, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

function Question9() {
  const navigate = useNavigate();

  const samples = ["Sample A", "Sample B", "Sample C"];

  // State for checkboxes
  const [selectedSamples, setSelectedSamples] = useState([]);

  // State for the textboxes (responses linked to selected samples)
  const [responses, setResponses] = useState({});

  const handleCheckboxChange = (sample) => {
    if (selectedSamples.includes(sample)) {
      // Remove
      const updated = selectedSamples.filter((s) => s !== sample);
      setSelectedSamples(updated);

      // Also remove its response if unchecked
      setResponses((prev) => {
        const copy = { ...prev };
        delete copy[sample];
        return copy;
      });
    } else {
      // Add if less than 2 selected
      if (selectedSamples.length < 2) {
        setSelectedSamples((prev) => [...prev, sample]);
      }
    }
  };

  const handleTextChange = (sample, value) => {
    setResponses((prev) => ({ ...prev, [sample]: value }));
  };

  // Validation: require 2 selected + both textboxes filled
  const isComplete =
    selectedSamples.length === 2 &&
    selectedSamples.every((s) => responses[s]?.trim() !== "");

  const handleSubmit = () => {
    if (!isComplete) return;

    const currentResponse = { selectedSamples, responses };

    // ✅ Save/update inside surveyResponses
    const allResponses =
      JSON.parse(localStorage.getItem("surveyResponses")) || {};
    allResponses.question9 = currentResponse;
    localStorage.setItem("surveyResponses", JSON.stringify(allResponses));

    // ✅ Navigate to success page
    navigate("/success");
  };


  // ✅ Load saved responses if user comes back
  useEffect(() => {
    const allResponses =
      JSON.parse(localStorage.getItem("surveyResponses")) || {};
    if (allResponses.question9) {
      setSelectedSamples(allResponses.question9.selectedSamples || []);
      setResponses(allResponses.question9.responses || {});
    }
  }, []);

  return (
    <div className="border-8 border-[#f58c81] rounded-3xl h-[800px] m-[20px] overflow-auto">
      <h1 className="text-3xl text-[#791a0f] font-bold text-center pt-[30px]">
        Q9.
        <span className="flex justify-center">
          Which of the two samples do you prefer? Please tick below?
        </span>
      </h1>

      {/* sample images with checkboxes */}
      <div className="flex justify-center gap-[100px] pt-[50px] flex-wrap">
        {samples.map((sample, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={`/images/drink${index + 2}.png`}
              alt={sample}
              className="h-[200px]"
            />
            <h1 className="text-[#791a0f] text-2xl mt-2">{sample}</h1>

            <label className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSamples.includes(sample)}
                onChange={() => handleCheckboxChange(sample)}
                className="w-5 h-5 accent-[#791a0f]"
                disabled={
                  !selectedSamples.includes(sample) &&
                  selectedSamples.length >= 2
                }
              />
              Select
            </label>
          </div>
        ))}
      </div>

      {/* textboxes dynamically for selected samples */}
      {selectedSamples.length > 0 && (
        <div className="flex flex-col items-center pt-[30px]">
          <h1 className="text-2xl text-[#791a0f] mb-2">Why?</h1>
          <div className="flex gap-[50px] flex-wrap justify-center">
            {selectedSamples.map((sample) => (
              <textarea
                key={sample}
                placeholder={`Your response for ${sample}`}
                value={responses[sample] || ""}
                onChange={(e) => handleTextChange(sample, e.target.value)}
                className="border-2 border-[#791a0f] rounded-lg p-2 w-[250px] h-[100px] resize-none"
              />
            ))}
          </div>
        </div>
      )}

      {/* navigation & submit */}
      <div className="flex flex-col items-center gap-[20px] pt-[50px] pr-[40px]">
        <div className="flex gap-[30px] flex-wrap justify-center">
          <Link to="/question8">
          <button
            className="bg-white p-5 w-[130px] border-2 border-[#791a0f] text-[#791a0f] text-lg rounded-xl cursor-pointer"
          >
            Back
          </button>
          </Link>

          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`p-5 w-[130px] text-lg rounded-xl cursor-pointer ${
              isComplete
                ? "bg-[#791a0f] text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question9;
