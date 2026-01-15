import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MONTHS, MONTH_HOVER_COLORS, MonthName } from '../types';
import { useGoalStore } from '../store/useGoalStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const hasMonthData = useGoalStore((state) => state.hasMonthData);

  const handleMonthClick = (month: MonthName) => {
    navigate(`/month/${month}`);
  };

  return (
    <div className="min-h-screen w-full bg-white p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-handwritten font-bold text-gray-900 mb-2">
            Goal 2026
          </h1>
          <p className="text-2xl md:text-3xl font-handwritten text-gray-600">
            Track Your Year
          </p>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MONTHS.map((month, index) => {
            const hasData = hasMonthData(2026, month);
            const hoverColor = MONTH_HOVER_COLORS[month];

            return (
              <motion.button
                key={month}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMonthClick(month)}
                className={`
                  relative
                  aspect-square
                  bg-white
                  border-2
                  border-gray-300
                  rounded-lg
                  ${hoverColor}
                  transition-all
                  duration-300
                  ease-out
                  shadow-sm
                  hover:shadow-md
                  flex
                  items-center
                  justify-center
                  font-handwritten
                  text-xl
                  md:text-2xl
                  font-semibold
                  text-gray-800
                  hover:text-gray-900
                  ${hasData ? 'border-gray-400' : ''}
                `}
              >
                {month}
                {hasData && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
