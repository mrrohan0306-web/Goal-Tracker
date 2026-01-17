import { MoodType } from '../types';

interface MoodPickerProps {
  selectedMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const MOODS: { type: MoodType; emoji: string; color: string; bgColor: string }[] = [
  { type: 'happy', emoji: '😊', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { type: 'neutral', emoji: '😐', color: 'text-green-600', bgColor: 'bg-green-100' },
  { type: 'sad', emoji: '😢', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { type: 'very-sad', emoji: '😔', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { type: 'angry', emoji: '😠', color: 'text-red-600', bgColor: 'bg-red-100' },
];

export default function MoodPicker({ selectedMood, onMoodSelect }: MoodPickerProps) {
  return (
    <div className="flex gap-3 justify-center">
      {MOODS.map((moodOption) => (
        <button
          key={moodOption.type}
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
      ))}
    </div>
  );
}
