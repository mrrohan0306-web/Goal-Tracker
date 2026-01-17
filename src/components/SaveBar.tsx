interface SaveBarProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  hasChanges: boolean;
}

export default function SaveBar({ isEditing, onEdit, onSave, hasChanges }: SaveBarProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onEdit}
        disabled={isEditing}
        className={`
          flex-1 px-4 py-3 rounded-lg font-sans-content font-medium
          transition-all duration-200
          ${
            isEditing
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }
        `}
      >
        ✏️ Edit
      </button>
      <button
        onClick={onSave}
        disabled={!isEditing || !hasChanges}
        aria-label="Save"
        className={`
          flex-1 px-4 py-3 rounded-lg font-sans-content font-medium
          transition-all duration-200
          ${
            !isEditing || !hasChanges
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }
        `}
      >
        💾 Save
      </button>
    </div>
  );
}
