import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Intro from './pages/Intro';
import YearView from './pages/YearView';
import DayCanvas from './pages/DayCanvas';
import Tasks from './pages/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/year" element={<YearView />} />
        <Route path="/day/:year/:month/:date" element={<DayCanvas />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
