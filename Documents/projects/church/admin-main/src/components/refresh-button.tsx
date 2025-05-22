import { RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function Refresh() {
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = () => {
    setIsRotating(true);
    // Refresh the current page
    window.location.reload();
  };

  return (
    <motion.div
      className="bg-[var(--purple)] rounded-full text-white w-12 h-12 flex flex-col items-center justify-center cursor-pointer fixed bottom-8 right-8 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleRefresh}
    >
      <motion.div
        animate={{ rotate: isRotating ? 360 : 0 }}
        transition={{ duration: 1, ease: "linear" }}
      >
        <RotateCw className="size-5" />
      </motion.div>
      <span className="text-[10px] mt-0.5">Refresh</span>
    </motion.div>
  );
}

export default Refresh;