import React from "react";
import { Link } from "react-router";

function SuccessMessage() {
  return (
    <div className="bg-[#f58c81] rounded-none sm:rounded-3xl min-h-screen m-0 sm:m-5 flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-mono text-center">
        Congratulations!
      </h1>

      {/* Image */}
      <img
        src="/images/drink.png"
        alt="image"
        className="w-40 sm:w-60 md:w-80 lg:w-[350px] mt-6"
      />

      {/* Success text */}
      <h1 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center mt-6">
        Answers submitted successfully!
      </h1>

      {/* Admin login link */}
      <Link
        to="/login"
        className="text-lg sm:text-xl md:text-2xl text-white font-bold mt-8 underline hover:text-gray-200 transition"
      >
        Log In as an admin?
      </Link>
    </div>
  );
}

export default SuccessMessage;
