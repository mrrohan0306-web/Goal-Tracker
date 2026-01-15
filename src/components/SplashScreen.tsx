import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-transition after 3 seconds
    const timer = setTimeout(() => {
      handleTransition();
    }, 3000);

    // Handle Enter key press
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTransition();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTransition}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Floating and rotating star */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          className="relative"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="drop-shadow-lg"
          >
            <path
              d="M60 10 L70 45 L105 45 L78 68 L88 103 L60 80 L32 103 L42 68 L15 45 L50 45 Z"
              fill="#1a1a1a"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-6xl md:text-7xl font-handwritten font-bold text-gray-900 tracking-wide"
        >
          Goal 2026
        </motion.h1>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 0.5 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm text-gray-400 font-handwritten mt-4"
        >
          Press Enter or Click to Continue
        </motion.p>
      </motion.div>
    </div>
  );
}
