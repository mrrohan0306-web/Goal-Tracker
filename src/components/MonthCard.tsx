import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MonthName, MONTH_COLORS, MONTHS } from '../types';
import { getCalendarGrid } from '../utils/calendar';
import { useGoalStore } from '../store/useGoalStore';

interface MonthCardProps {
  month: MonthName;
  year: number;
}

export default function MonthCard({ month, year }: MonthCardProps) {
  const navigate = useNavigate();
  const getDayEntry = useGoalStore((state) => state.getDayEntry);
  const calendarGrid = getCalendarGrid(month, year);
  const monthColors = MONTH_COLORS[month];

  const handleDateClick = (date: number | null, e: React.MouseEvent) => {
    e.stopPropagation();
    if (date !== null) {
      navigate(`/day/${year}/${month}/${date}`);
    }
  };

  const handleCardClick = () => {
    // Navigate to first day of month or today if in current month
    const today = new Date();
    if (today.getFullYear() === year && today.getMonth() === MONTHS.indexOf(month)) {
      navigate(`/day/${year}/${month}/${today.getDate()}`);
    } else {
      navigate(`/day/${year}/${month}/1`);
    }
  };

  const hasDataForDate = (date: number | null): boolean => {
    if (date === null) return false;
    const entry = getDayEntry(year, month, date);
    return !!entry && (!!entry.mood || !!entry.text);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`
        ${monthColors}
        border-2 rounded-xl p-4 shadow-md cursor-pointer
        transition-all duration-300
      `}
    >
      {/* Month name */}
      <h3 className="text-xl font-serif-ui font-bold text-gray-800 mb-3 capitalize">
        {month}
      </h3>

      {/* Mini calendar */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
          <div
            key={idx}
            className="text-xs font-serif-ui text-gray-600 text-center"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarGrid.map((week, weekIdx) =>
          week.map((date, dayIdx) => {
            const hasData = hasDataForDate(date);
            return (
              <button
                key={`${weekIdx}-${dayIdx}`}
                onClick={(e) => handleDateClick(date, e)}
                className={`
                  aspect-square rounded text-xs font-serif-ui
                  transition-all duration-200
                  ${
                    date === null
                      ? 'bg-transparent'
                      : hasData
                      ? 'bg-blue-200 text-blue-800 font-semibold hover:bg-blue-300'
                      : 'bg-white/50 text-gray-700 hover:bg-white/80'
                  }
                `}
              >
                {date}
              </button>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
