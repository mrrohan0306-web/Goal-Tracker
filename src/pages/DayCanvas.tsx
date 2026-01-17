import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoodType, MONTHS } from '../types';
import { useGoalStore } from '../store/useGoalStore';
import MoodPicker from '../components/MoodPicker';
import GlassNavbar from '../components/GlassNavbar';

const MOOD_BG_COLORS: Record<MoodType, string> = {
  happy: 'bg-yellow-50',
  neutral: 'bg-green-50',
  sad: 'bg-blue-50',
  'very-sad': 'bg-orange-50',
  angry: 'bg-red-50',
};

const MOOD_EMOJIS: Record<MoodType, string> = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
  'very-sad': '😔',
  angry: '😠',
};

export default function DayCanvas() {
  const { year, month, date } = useParams<{ year: string; month: string; date: string }>();
  const navigate = useNavigate();
  const { getDayEntry, saveDayEntry } = useGoalStore();
  const editorRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(true); // Default to editable
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType | undefined>(undefined);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [originalMood, setOriginalMood] = useState<MoodType | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const yearNum = parseInt(year || '2026');
  const monthName = month?.toLowerCase() as any;
  const dateNum = parseInt(date || '1');

  useEffect(() => {
    // Load existing entry when date changes
    const entry = getDayEntry(yearNum, monthName, dateNum);
    if (entry) {
      const entryContent = entry.content || entry.text || '';
      const entryMood = entry.mood;
      setContent(entryContent);
      setMood(entryMood);
      setOriginalContent(entryContent);
      setOriginalMood(entryMood);
      // If there's content, load it into editor
      if (editorRef.current && entryContent) {
        editorRef.current.innerHTML = entryContent;
      } else if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    } else {
      setContent('');
      setMood(undefined);
      setOriginalContent('');
      setOriginalMood(undefined);
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    }
    setIsEditing(true); // Always start in edit mode
    setHasChanges(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearNum, monthName, dateNum]); // getDayEntry is stable from Zustand

  useEffect(() => {
    // Check if there are changes
    const contentChanged = content !== originalContent;
    const moodChanged = mood !== originalMood;
    setHasChanges(contentChanged || moodChanged);
  }, [content, mood, originalContent, originalMood]);

  // Auto-focus editor when entering edit mode
  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const contentToSave = content.trim() || '';
    // Save to LocalStorage
    saveDayEntry(yearNum, monthName, dateNum, {
      text: contentToSave,
      content: contentToSave, // Support both fields
      mood: mood,
    });
    
    // Update original values
    setOriginalContent(contentToSave);
    setOriginalMood(mood);
    setIsEditing(false);
    setHasChanges(false);
    
    // Show subtle feedback
    const saveButton = document.querySelector('[data-save-button]') as HTMLElement;
    if (saveButton) {
      saveButton.textContent = '💾 Saved!';
      setTimeout(() => {
        saveButton.textContent = '💾 Save';
      }, 1500);
    }
  };

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    saveDayEntry(yearNum, monthName, dateNum, {});
    navigate('/year');
  };

  const handleCopy = async () => {
    const textToCopy = editorRef.current?.innerText || content;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
  const savedMoodEmoji = mood && !hasChanges ? MOOD_EMOJIS[mood] : null;

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
          <h1 className="text-2xl md:text-3xl font-serif-ui font-bold text-gray-900 flex items-center gap-2">
            {formatDate()}
            {savedMoodEmoji && (
              <span className="text-xl" title={`Mood: ${mood}`}>
                {savedMoodEmoji}
              </span>
            )}
          </h1>
          <button
            onClick={handleDelete}
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

          {/* Formatting Toolbar */}
          {isEditing && (
            <div className="bg-white/60 rounded-lg p-2 flex gap-2 flex-wrap items-center border border-white/40">
              <button
                onClick={() => handleFormat('bold')}
                className="p-2 rounded hover:bg-white/80 transition-colors font-bold text-sm"
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                onClick={() => handleFormat('italic')}
                className="p-2 rounded hover:bg-white/80 transition-colors italic text-sm"
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                onClick={() => handleFormat('underline')}
                className="p-2 rounded hover:bg-white/80 transition-colors underline text-sm"
                title="Underline"
              >
                <u>U</u>
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <button
                onClick={() => handleFormat('insertUnorderedList')}
                className="p-2 rounded hover:bg-white/80 transition-colors text-sm"
                title="Bullet List"
              >
                •
              </button>
              <button
                onClick={() => handleFormat('insertOrderedList')}
                className="p-2 rounded hover:bg-white/80 transition-colors text-sm"
                title="Numbered List"
              >
                1.
              </button>
            </div>
          )}

          {/* Writing Canvas */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-white/20">
            <div
              ref={editorRef}
              contentEditable={isEditing}
              onInput={handleContentChange}
              suppressContentEditableWarning
              className={`
                w-full min-h-[400px] resize-none
                font-sans-content text-base md:text-lg
                focus:outline-none
                ${!isEditing ? 'cursor-default' : 'cursor-text'}
                [&:empty]:before:content-[attr(placeholder)]
                [&:empty]:before:text-gray-400
              `}
              placeholder="Write your thoughts here... Use formatting toolbar for structure."
            />
          </div>

          {/* Action Buttons - Only Copy */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCopy}
              className={`p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors relative ${
                copyFeedback ? 'bg-green-100 text-green-600' : ''
              }`}
              title="Copy note content"
            >
              {copyFeedback ? '✓ Copied!' : '📋'}
            </button>
          </div>

          {/* Save/Edit Bar */}
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-3 rounded-lg bg-blue-100 text-blue-700 font-sans-content font-medium hover:bg-blue-200 transition-colors"
              >
                ✏️ Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                data-save-button
                className={`
                  flex-1 px-4 py-3 rounded-lg font-sans-content font-medium
                  transition-all duration-200
                  ${
                    !hasChanges
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }
                `}
              >
                💾 Save
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-xl font-serif-ui font-bold text-gray-900 mb-4">
              Delete Note
            </h3>
            <p className="text-gray-700 mb-6 font-sans-content">
              Are you sure you want to delete this note?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-sans-content hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-sans-content hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <GlassNavbar />
    </div>
  );
}
