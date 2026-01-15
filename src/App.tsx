import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import MonthLog from './components/MonthLog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/month/:monthName" element={<MonthLog />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
