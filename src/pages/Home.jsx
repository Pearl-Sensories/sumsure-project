import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";


function Home() {
  const navigate = useNavigate();

  const handleTap = () => {
    // delay navigation so animation plays
    setTimeout(() => {
      navigate('/questionnaire');
    }, 400); // slightly longer than animation
  };

  return (
    <div className="bg-[#f58c81] rounded-3xl h-[800px] m-[20px]">
      <h1 className="text-9xl font-bold text-white flex justify-center pt-[100px] font-mono">
        Questionnaire!
      </h1>

      <motion.img
        src="/images/drink.png"
        alt="image"
        className="h-[400px] pl-[700px] pt-[50px] cursor-pointer"
        whileTap={{
          x: [5, -12, 15, -12, 12, 5], // shake effect
          scale: [2, 1.1, 2],           // zoom in & back
          transition: { duration: 0.4 },
        }}
        onTap={handleTap}
      />

      <h1 className="text-white text-4xl flex justify-center pt-[40px]">
        Tap to start <FaArrowUp className="ml-2" />
      </h1>
    </div>
  );
}

export default Home;
