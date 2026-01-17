import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 3 seconds
    const timer = setTimeout(() => {
      navigate('/year');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleClick = () => {
    navigate('/year');
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-200 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Sun illustration */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="relative"
        >
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className="drop-shadow-lg"
          >
            {/* Sun face */}
            <circle
              cx="75"
              cy="75"
              r="60"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="3"
            />
            {/* Closed eyes */}
            <path
              d="M 55 65 Q 65 65 75 65"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 75 65 Q 85 65 95 65"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Smile */}
            <path
              d="M 50 90 Q 75 110 100 90"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Wavy lines */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <svg width="200" height="20" viewBox="0 0 200 20">
            <path
              d="M 0 10 Q 50 5 100 10 T 200 10"
              stroke="#87CEEB"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          <svg width="200" height="20" viewBox="0 0 200 20">
            <path
              d="M 0 10 Q 50 15 100 10 T 200 10"
              stroke="#90EE90"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-5xl md:text-6xl font-serif-ui font-bold text-gray-900 text-center"
        >
          Welcome to Goalnote
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl md:text-2xl font-serif-ui text-gray-700 text-center"
        >
          Write your days. Track your moods.
        </motion.p>
      </motion.div>

      {/* Navigation dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 flex gap-2"
      >
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
      </motion.div>
    </div>
  );
}
