# Goal 2026

A beautiful, minimal goal-tracking web application for 2026. Track your daily goals, achievements, and moods with a handwritten, paper-like aesthetic.

## Features

- ✨ **Splash Screen** - Animated star with floating and rotation effects
- 📅 **Dashboard** - Beautiful month selector with unique hover colors
- 📝 **Month Log** - Interactive calendar with daily goal tracking
- 💾 **LocalStorage Persistence** - Your data is saved locally
- 🎨 **Handwritten Design** - Organic, paper-like UI with handwritten fonts
- 📱 **Responsive** - Works beautifully on mobile and desktop

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- React Router
- Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Usage

1. **Splash Screen**: Wait 3 seconds or press Enter/Click to continue
2. **Dashboard**: Click on any month to view its log
3. **Month Log**: 
   - Click on a date to select it
   - Enter your goal and achievement
   - Select a mood (BLUE, GOLD, GREY, GREEN)
   - Click [Save] to persist your entry
   - Calendar cells will color based on saved status

## Mood Colors

- **BLUE** - Goal set
- **GOLD** - Achieved
- **GREY** - Neutral / missed
- **GREEN** - Excellent

## Month Hover Colors

Each month has a unique soft color that appears on hover:
- JAN → Light Blue
- FEB → Lavender
- MAR → Soft Green
- APR → Peach
- MAY → Mint
- JUN → Yellow
- JUL → Sky Blue
- AUG → Coral
- SEP → Olive
- OCT → Orange
- NOV → Plum
- DEC → Teal

## Data Storage

All data is stored in your browser's LocalStorage. Your entries persist across sessions and page refreshes.

## License

MIT
