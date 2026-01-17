import { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { useGoalStore } from '../store/useGoalStore';
import GlassNavbar from '../components/GlassNavbar';

export default function Tasks() {
  const { getTodayTasks, addTask, updateTask, deleteTask } = useGoalStore();
  const tasks = getTodayTasks();
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      addTask(task);
      setNewTaskText('');
    }
  };

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-3xl md:text-4xl font-serif-ui font-bold text-gray-900">
            Today's Tasks
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Add Task Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white/80 rounded-2xl p-4 shadow-lg border border-white/20 flex gap-3">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 font-sans-content text-base focus:outline-none bg-transparent"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-sans-content font-medium hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </motion.div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500 font-sans-content"
            >
              No tasks for today. Add one above!
            </motion.div>
          ) : (
            tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 rounded-xl p-4 shadow-md border border-white/20 flex items-center gap-3"
              >
                {/* Checkbox */}
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`
                    w-6 h-6 rounded border-2 flex items-center justify-center
                    transition-all duration-200
                    ${
                      task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  {task.completed && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>

                {/* Task Text */}
                <div className="flex-1">
                  <p
                    className={`
                      font-sans-content text-base
                      ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}
                    `}
                  >
                    {task.text}
                  </p>
                  {task.time && (
                    <p className="text-sm text-gray-500 font-sans-content mt-1">
                      {task.time}
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
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
              </motion.div>
            ))
          )}
        </div>
      </div>

      <GlassNavbar />
    </div>
  );
}
