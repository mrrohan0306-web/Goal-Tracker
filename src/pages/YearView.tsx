import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MONTHS, MonthName } from '../types';
import MonthCard from '../components/MonthCard';
import GlassNavbar from '../components/GlassNavbar';
import { downloadData } from '../utils/storage';

export default function YearView() {
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const year = 2026;
  const monthRefs = useRef<Record<MonthName, HTMLDivElement | null>>(
    {} as Record<MonthName, HTMLDivElement | null>
  );
  const prefersReducedMotion = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Active month handling
  const today = new Date();
  const currentMonthName = MONTHS[today.getMonth()] as MonthName;
  const [activeMonth, setActiveMonth] = useState<MonthName | null>(currentMonthName);

  useEffect(() => {
    // Auto-scroll to current month on load
    const currentRef = monthRefs.current[currentMonthName];
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }
  }, [currentMonthName, prefersReducedMotion]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const centerY = window.innerHeight / 2;
        let closest: { month: MonthName; distance: number } | null = null;

        MONTHS.forEach((month) => {
          const el = monthRefs.current[month as MonthName];
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - centerY);
          if (!closest || distance < closest.distance) {
            closest = { month: month as MonthName, distance };
          }
        });

        const nextActive = (closest as { month: MonthName } | null)?.month ?? null;
        if (nextActive && nextActive !== activeMonth) {
          setActiveMonth(nextActive);
        }
        ticking = false;
      });
    };

    handleScroll(); // initialize on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMonth]);

  const handleExportClick = () => {
    setShowExportConfirm(true);
  };

  const handleExportConfirm = () => {
    downloadData();
    setShowExportConfirm(false);
  };

  const handleExportCancel = () => {
    setShowExportConfirm(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-serif-ui font-bold text-gray-900">
            Goalnote
          </h1>
          <button
            onClick={handleExportClick}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Export data"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Month Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MONTHS.map((month, index) => (
            <motion.div
              key={month}
              ref={(el) => {
                monthRefs.current[month as MonthName] = el;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <MonthCard
                month={month as MonthName}
                year={year}
                isActive={activeMonth === month}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export Confirmation */}
      {showExportConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-xl font-serif-ui font-bold text-gray-900 mb-4">
              Export Data
            </h3>
            <p className="text-gray-700 mb-6 font-sans-content">
              Do you want to download your data?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleExportCancel}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-sans-content hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleExportConfirm}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-sans-content hover:bg-blue-700 transition-colors"
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
