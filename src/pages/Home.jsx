import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Home() {
  const navigate = useNavigate();

  const handleTap = () => {
    // delay navigation so animation plays
    setTimeout(() => {
      navigate("/questionnaire");
    }, 400); // slightly longer than animation
  };

  return (
    <div className="bg-[#f58c81] rounded-none sm:rounded-3xl min-h-screen m-0 sm:m-5 flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white font-mono text-center px-4">
        Questionnaire!
      </h1>

      {/* Image */}
      <motion.img
        src="/images/drink.png"
        alt="image"
        className="h-48 sm:h-64 md:h-80 lg:h-[400px] mt-8 cursor-pointer"
        whileTap={{
          x: [5, -12, 15, -12, 12, 5], // shake effect
          scale: [2, 1.1, 2], // zoom in & back
          transition: { duration: 0.4 },
        }}
        onTap={handleTap}
      />

      {/* Tap to start */}
      <h1 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-center mt-6">
        Tap to start <FaArrowUp className="ml-2" />
      </h1>
      <h1 className="text-white text-sm sm:text-md md:text-xl lg:text-2xl mt-5">OR</h1>
       {/* Admin login link */}
            <Link
              to="/login"
              className="text-lg sm:text-xl md:text-2xl text-white font-bold mt-6 underline hover:text-gray-200 transition"
            >
              Log In as an admin?
            </Link>
    </div>
  );
}

export default Home;
