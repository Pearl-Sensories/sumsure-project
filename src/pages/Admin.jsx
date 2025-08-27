import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AdminDashboard() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const candidateKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      candidateKeys.push(localStorage.key(i));
    }

    const relevantKeys = candidateKeys.filter((k) =>
      Boolean(
        k &&
          (k.startsWith("responses_") ||
            k.startsWith("user_") ||
            k === "surveyResponses")
      )
    );

    const parsedList = [];
    relevantKeys.forEach((key) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") parsedList.push(parsed);
      } catch {}
    });

    const normalizeQuestionKey = (k) => {
      const qMatch = k.match(/^q([1-9])$/i);
      if (qMatch) return `question${qMatch[1]}`;
      return k;
    };

    const merged = {};
    parsedList.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        const nk = normalizeQuestionKey(key);
        const existing = merged[nk];
        const incoming = obj[key];

        if (
          existing &&
          typeof existing === "object" &&
          incoming &&
          typeof incoming === "object" &&
          !Array.isArray(existing) &&
          !Array.isArray(incoming)
        ) {
          merged[nk] = { ...existing, ...incoming };
        } else {
          merged[nk] = incoming;
        }
      });
    });

    try {
      localStorage.setItem("responses_user1", JSON.stringify(merged));
    } catch {}

    setResponses([{ userId: "responses_user1", ...merged }]);
  }, []);

  const formatField = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.join(", ");

    if (typeof value === "object") {
      if (value.selectedSamples || value.responses) {
        const selected = value.selectedSamples
          ? `Selected: ${value.selectedSamples.join(", ")}`
          : "";
        const responsesText = value.responses
          ? Object.entries(value.responses)
              .map(([sample, text]) => `${sample}: ${text}`)
              .join(" | ")
          : "";
        return [selected, responsesText].filter(Boolean).join(" || ");
      }

      const sampleKeys = ["Sample A", "Sample B", "Sample C"];
      const hasSampleKeys = sampleKeys.some((k) =>
        Object.prototype.hasOwnProperty.call(value, k)
      );
      if (hasSampleKeys) {
        return Object.entries(value)
          .map(([s, v]) => `${s}: ${v}`)
          .join(", ");
      }

      try {
        return Object.entries(value)
          .map(([k, v]) =>
            `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`
          )
          .join(", ");
      } catch {
        return JSON.stringify(value);
      }
    }

    return String(value);
  };

  const exportToExcel = () => {
    const sheetData = responses.map((resp) => ({
      UserID: resp.userId,
      Q1: formatField(resp.question1 || resp.q1),
      Q2: formatField(resp.question2 || resp.q2),
      Q3: formatField(resp.question3 || resp.q3),
      Q4: formatField(resp.question4 || resp.q4),
      Q5: formatField(resp.question5 || resp.q5),
      Q6: formatField(resp.question6 || resp.q6),
      Q7: formatField(resp.question7 || resp.q7),
      Q8: formatField(resp.question8 || resp.q8),
      Q9: formatField(resp.question9 || resp.q9),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Responses");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "survey_responses.xlsx");
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#791a0f]">
        Admin Dashboard
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-2">
        <button
          onClick={exportToExcel}
          className="bg-[#791a0f] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#f58c81] transition"
        >
          Export Excel
        </button>
      </div>

      {responses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs md:text-sm">
            <thead>
              <tr className="bg-[#f58c81] text-white">
                <th className="border p-2">User ID</th>
                <th className="border p-2">Q1</th>
                <th className="border p-2">Q2</th>
                <th className="border p-2">Q3</th>
                <th className="border p-2">Q4</th>
                <th className="border p-2">Q5</th>
                <th className="border p-2">Q6</th>
                <th className="border p-2">Q7</th>
                <th className="border p-2">Q8</th>
                <th className="border p-2">Q9</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((resp, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{resp.userId}</td>
                  <td className="border p-2">{formatField(resp.question1 || resp.q1)}</td>
                  <td className="border p-2">{formatField(resp.question2 || resp.q2)}</td>
                  <td className="border p-2">{formatField(resp.question3 || resp.q3)}</td>
                  <td className="border p-2">{formatField(resp.question4 || resp.q4)}</td>
                  <td className="border p-2">{formatField(resp.question5 || resp.q5)}</td>
                  <td className="border p-2">{formatField(resp.question6 || resp.q6)}</td>
                  <td className="border p-2">{formatField(resp.question7 || resp.q7)}</td>
                  <td className="border p-2">{formatField(resp.question8 || resp.q8)}</td>
                  <td className="border p-2">{formatField(resp.question9 || resp.q9)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
