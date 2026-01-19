import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MonthName, MONTH_COLORS, MONTHS } from '../types';
import { getCalendarGrid } from '../utils/calendar';
import { useGoalStore } from '../store/useGoalStore';

interface MonthCardProps {
  month: MonthName;
  year: number;
  isActive?: boolean;
}

export default function MonthCard({ month, year, isActive = false }: MonthCardProps) {
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
    return !!entry && (!!entry.mood || !!entry.text || !!entry.content);
  };

  const getMoodForDate = (date: number | null): string | null => {
    if (date === null) return null;
    const entry = getDayEntry(year, month, date);
    if (!entry?.mood) return null;
    
    const moodEmojis: Record<string, string> = {
      happy: '😊',
      neutral: '😐',
      sad: '😢',
      'very-sad': '😔',
      angry: '😠',
    };
    return moodEmojis[entry.mood] || null;
  };

  // Today highlight helpers
  const today = new Date();
  const isTodayMonth = today.getFullYear() === year && MONTHS[today.getMonth()] === month;
  const todayDate = today.getDate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`
        ${monthColors}
        border-2 rounded-xl p-4 shadow-md cursor-pointer
        transition-all duration-300
        ${isActive ? 'scale-105 opacity-100 z-10' : 'scale-95 opacity-70'}
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
            const moodEmoji = getMoodForDate(date);
            const isToday = isTodayMonth && date === todayDate;
            return (
              <button
                key={`${weekIdx}-${dayIdx}`}
                onClick={(e) => handleDateClick(date, e)}
                className={`
                  aspect-square rounded text-xs font-serif-ui relative
                  transition-all duration-200
                  ${
                    date === null
                      ? 'bg-transparent'
                      : hasData
                      ? 'bg-blue-200 text-blue-800 font-semibold hover:bg-blue-300'
                      : 'bg-white/50 text-gray-700 hover:bg-white/80'
                  }
                  ${isToday ? 'ring-2 ring-offset-1 ring-blue-400 ring-offset-white/70' : ''}
                `}
              >
                {date}
                {moodEmoji && (
                  <span className="absolute bottom-0 right-0 text-[8px] leading-none transform translate-x-[2px] translate-y-[2px]">
                    {moodEmoji}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
