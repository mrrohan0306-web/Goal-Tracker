import { useNavigate, useLocation } from 'react-router-dom';

export default function GlassNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/year';
  const isTasks = location.pathname === '/tasks';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 px-6 py-3 flex items-center justify-around">
          {/* Home icon */}
          <button
            onClick={() => navigate('/year')}
            className={`p-2 rounded-lg transition-all ${
              isHome ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>

          {/* Task icon */}
          <button
            onClick={() => navigate('/tasks')}
            className={`p-2 rounded-lg transition-all ${
              isTasks ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
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
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
