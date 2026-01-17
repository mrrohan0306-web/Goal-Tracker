import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoodType, MONTHS } from '../types';
import { useGoalStore } from '../store/useGoalStore';
import MoodPicker from '../components/MoodPicker';
import SaveBar from '../components/SaveBar';
import GlassNavbar from '../components/GlassNavbar';

const MOOD_BG_COLORS: Record<MoodType, string> = {
  happy: 'bg-yellow-50',
  neutral: 'bg-green-50',
  sad: 'bg-blue-50',
  'very-sad': 'bg-orange-50',
  angry: 'bg-red-50',
};

export default function DayCanvas() {
  const { year, month, date } = useParams<{ year: string; month: string; date: string }>();
  const navigate = useNavigate();
  const { getDayEntry, saveDayEntry } = useGoalStore();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const [mood, setMood] = useState<MoodType | undefined>(undefined);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [originalMood, setOriginalMood] = useState<MoodType | undefined>(undefined);

  const yearNum = parseInt(year || '2026');
  const monthName = month?.toLowerCase() as any;
  const dateNum = parseInt(date || '1');

  useEffect(() => {
    // Load existing entry when date changes
    const entry = getDayEntry(yearNum, monthName, dateNum);
    if (entry) {
      const entryText = entry.text || '';
      const entryMood = entry.mood;
      setText(entryText);
      setMood(entryMood);
      setOriginalText(entryText);
      setOriginalMood(entryMood);
    } else {
      setText('');
      setMood(undefined);
      setOriginalText('');
      setOriginalMood(undefined);
    }
    setIsEditing(false);
    setHasChanges(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearNum, monthName, dateNum]); // getDayEntry is stable from Zustand

  useEffect(() => {
    // Check if there are changes
    const textChanged = text !== originalText;
    const moodChanged = mood !== originalMood;
    setHasChanges(textChanged || moodChanged);
  }, [text, mood, originalText, originalMood]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save to LocalStorage
    saveDayEntry(yearNum, monthName, dateNum, {
      text: text.trim() || undefined,
      mood: mood,
    });
    
    // Update original values to reflect saved state
    const savedText = text.trim();
    setOriginalText(savedText);
    setOriginalMood(mood);
    setIsEditing(false);
    setHasChanges(false);
    
    // Optional: subtle feedback (non-intrusive)
    const saveButton = document.querySelector('[aria-label="Save"]') as HTMLElement;
    if (saveButton) {
      saveButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        saveButton.style.transform = '';
      }, 200);
    }
  };

  const handleMoodSelect = (selectedMood: MoodType) => {
    // Allow mood selection anytime, but only save when Save is clicked
    setMood(selectedMood);
  };

  const formatDate = () => {
    const monthIndex = MONTHS.indexOf(monthName);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[monthIndex]} ${dateNum}`;
  };

  const moodBg = mood ? MOOD_BG_COLORS[mood] : 'bg-white';

  return (
    <div className={`min-h-screen w-full ${moodBg} transition-colors duration-300 pb-24`}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/year')}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-serif-ui font-bold text-gray-900">
            {formatDate()}
          </h1>
          <button
            onClick={() => {
              if (window.confirm('Delete this entry?')) {
                saveDayEntry(yearNum, monthName, dateNum, {});
                navigate('/year');
              }
            }}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Mood Picker */}
          <div className="py-4">
            <MoodPicker selectedMood={mood} onMoodSelect={handleMoodSelect} />
          </div>

          {/* Writing Canvas */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-white/20">
            <textarea
              value={text}
              onChange={(e) => {
                if (isEditing) {
                  setText(e.target.value);
                }
              }}
              readOnly={!isEditing}
              placeholder="Write your thoughts here..."
              className={`
                w-full min-h-[400px] resize-none
                font-sans-content text-base md:text-lg
                focus:outline-none
                ${!isEditing ? 'cursor-default bg-transparent' : 'bg-white'}
              `}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              disabled={!isEditing}
              className="p-3 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              😊
            </button>
            <button
              disabled={!isEditing}
              className="p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔗
            </button>
            <button
              disabled={!isEditing}
              className="p-3 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋
            </button>
            <button
              disabled={!isEditing}
              className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️
            </button>
          </div>

          {/* Save Bar */}
          <SaveBar
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            hasChanges={hasChanges}
          />
        </motion.div>
      </div>

      <GlassNavbar />
    </div>
  );
}
