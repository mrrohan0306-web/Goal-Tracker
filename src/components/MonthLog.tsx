import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MonthName, MONTHS, MoodStatus } from '../types';
import { useGoalStore } from '../store/useGoalStore';
import { getCalendarGrid } from '../utils/calendar';

const MOOD_COLORS: Record<MoodStatus, string> = {
  BLUE: 'bg-blue-200',
  GOLD: 'bg-yellow-200',
  GREY: 'bg-gray-200',
  GREEN: 'bg-green-200',
};

const MOOD_BORDERS: Record<MoodStatus, string> = {
  BLUE: 'border-blue-400',
  GOLD: 'border-yellow-400',
  GREY: 'border-gray-400',
  GREEN: 'border-green-400',
};

export default function MonthLog() {
  const { monthName } = useParams<{ monthName: MonthName }>();
  const navigate = useNavigate();
  const { saveEntry, getEntry } = useGoalStore();

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [goal, setGoal] = useState('');
  const [achievement, setAchievement] = useState('');
  const [mood, setMood] = useState<MoodStatus>('GREY');

  const year = 2026;
  const validMonth = monthName && MONTHS.includes(monthName as MonthName);

  useEffect(() => {
    if (!validMonth) {
      navigate('/dashboard');
      return;
    }
  }, [validMonth, navigate]);

  useEffect(() => {
    // Load existing entry when date is selected
    if (selectedDate && monthName) {
      const entry = getEntry(year, monthName, selectedDate);
      if (entry) {
        setGoal(entry.goal);
        setAchievement(entry.achievement);
        setMood(entry.mood);
      } else {
        setGoal('');
        setAchievement('');
        setMood('GREY');
      }
    }
  }, [selectedDate, monthName, getEntry]);

  if (!validMonth || !monthName) {
    return null;
  }

  const calendarGrid = getCalendarGrid(monthName, year);

  const handleDateClick = (date: number | null) => {
    if (date !== null) {
      setSelectedDate(date);
    }
  };

  const handleSave = () => {
    if (selectedDate && monthName) {
      saveEntry(year, monthName, selectedDate, {
        date: selectedDate,
        goal,
        achievement,
        mood,
      });
      
      // Show feedback
      const button = document.getElementById('save-button');
      if (button) {
        button.classList.add('animate-pulse');
        setTimeout(() => {
          button.classList.remove('animate-pulse');
        }, 500);
      }
    }
  };

  const getDateStatus = (date: number | null): MoodStatus | null => {
    if (date === null || !monthName) return null;
    const entry = getEntry(year, monthName, date);
    return entry ? entry.mood : null;
  };

  return (
    <div className="min-h-screen w-full bg-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-900 font-handwritten text-lg mb-4 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl md:text-5xl font-handwritten font-bold text-gray-900">
            {monthName}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div
                    key={idx}
                    className="text-center font-handwritten text-sm md:text-base font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="space-y-2">
                {calendarGrid.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-7 gap-2">
                    {week.map((date, dayIdx) => {
                      const status = getDateStatus(date);
                      const isSelected = date === selectedDate;
                      const hasData = status !== null;
                      // Use current mood for selected cell, or saved status for others
                      const displayMood = isSelected ? mood : (status || null);

                      return (
                        <motion.button
                          key={dayIdx}
                          whileHover={date !== null ? { scale: 1.05 } : {}}
                          whileTap={date !== null ? { scale: 0.95 } : {}}
                          onClick={() => handleDateClick(date)}
                          disabled={date === null}
                          className={`
                            aspect-square
                            rounded-lg
                            border-2
                            font-handwritten
                            text-sm
                            md:text-base
                            transition-all
                            duration-200
                            ${
                              date === null
                                ? 'bg-transparent border-transparent cursor-default'
                                : isSelected
                                ? `${MOOD_BORDERS[displayMood!]} ${MOOD_COLORS[displayMood!]} border-4 shadow-md`
                                : hasData
                                ? `${MOOD_BORDERS[status!]} ${MOOD_COLORS[status!]} border-2`
                                : 'bg-white border-gray-300 hover:border-gray-400'
                            }
                            ${date !== null ? 'cursor-pointer' : ''}
                          `}
                        >
                          {date}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-handwritten font-bold text-gray-900 mb-6">
                Input Panel
              </h2>

              {/* Selected Date Display */}
              {selectedDate ? (
                <div className="mb-6">
                  <p className="text-lg font-handwritten text-gray-700 mb-2">
                    Selected Date:
                  </p>
                  <p className="text-2xl font-handwritten font-bold text-gray-900">
                    {monthName} {selectedDate}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-lg font-handwritten text-gray-400 italic">
                    Click a date to start
                  </p>
                </div>
              )}

              {/* Goal Input */}
              <div className="mb-6">
                <label className="block text-lg font-handwritten font-semibold text-gray-700 mb-2">
                  Goal
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={!selectedDate}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-handwritten text-base focus:outline-none focus:border-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  rows={3}
                  placeholder="Enter your goal..."
                />
              </div>

              {/* Achievement Input */}
              <div className="mb-6">
                <label className="block text-lg font-handwritten font-semibold text-gray-700 mb-2">
                  Achievement
                </label>
                <textarea
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  disabled={!selectedDate}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-handwritten text-base focus:outline-none focus:border-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  rows={3}
                  placeholder="What did you achieve?"
                />
              </div>

              {/* Mood Select */}
              <div className="mb-6">
                <label className="block text-lg font-handwritten font-semibold text-gray-700 mb-3">
                  Mood Select
                </label>
                <div className="space-y-2">
                  {(['BLUE', 'GOLD', 'GREY', 'GREEN'] as MoodStatus[]).map(
                    (moodOption) => (
                      <label
                        key={moodOption}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                          ${
                            mood === moodOption
                              ? `${MOOD_BORDERS[moodOption]} ${MOOD_COLORS[moodOption]}`
                              : 'border-gray-300 bg-white hover:bg-gray-50'
                          }
                          ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <input
                          type="radio"
                          name="mood"
                          value={moodOption}
                          checked={mood === moodOption}
                          onChange={() => setMood(moodOption)}
                          disabled={!selectedDate}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="font-handwritten text-base font-semibold text-gray-800">
                          {moodOption}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                id="save-button"
                whileHover={selectedDate ? { scale: 1.02 } : {}}
                whileTap={selectedDate ? { scale: 0.98 } : {}}
                onClick={handleSave}
                disabled={!selectedDate}
                className={`
                  w-full
                  py-3
                  px-6
                  rounded-lg
                  border-2
                  font-handwritten
                  text-lg
                  font-bold
                  transition-all
                  duration-200
                  ${
                    selectedDate
                      ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 cursor-pointer'
                      : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                  }
                `}
              >
                [Save]
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
