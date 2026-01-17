import { MoodType } from '../types';

interface MoodPickerProps {
  selectedMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const MOODS: { 
  type: MoodType; 
  emoji: string; 
  color: string; 
  bgColor: string;
  label: string;
}[] = [
  { type: 'happy', emoji: '😊', color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Happy' },
  { type: 'neutral', emoji: '😐', color: 'text-green-600', bgColor: 'bg-green-100', label: 'Neutral' },
  { type: 'sad', emoji: '😢', color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Sad' },
  { type: 'very-sad', emoji: '😔', color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Very Sad' },
  { type: 'angry', emoji: '😠', color: 'text-red-600', bgColor: 'bg-red-100', label: 'Angry' },
];

export default function MoodPicker({ selectedMood, onMoodSelect }: MoodPickerProps) {
  return (
    <div className="flex gap-3 justify-center">
      {MOODS.map((moodOption) => (
        <div key={moodOption.type} className="relative group">
          <button
            onClick={() => onMoodSelect(moodOption.type)}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-2xl
              transition-all duration-200 cursor-pointer
              ${
                selectedMood === moodOption.type
                  ? `${moodOption.bgColor} ${moodOption.color} scale-110 shadow-md`
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              }
            `}
            type="button"
          >
            {moodOption.emoji}
          </button>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            {moodOption.emoji} {moodOption.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
