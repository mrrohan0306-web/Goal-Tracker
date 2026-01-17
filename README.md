# Goalnote

A beautiful, local-first journaling and task-tracking web application. Write your days, track your moods, and manage your tasks - all stored locally in your browser.

## Features

- ✨ **Beautiful Design** - Serif fonts for UI, sans-serif for content, pastel colors, glass-morphism effects
- 📅 **Year Overview** - Browse months with mini calendars showing your entries
- ✍️ **Daily Canvas** - Write your thoughts, select your mood, save when ready
- ✅ **Today's Tasks** - Simple task management for today
- 💾 **Local Storage** - All data stored in your browser, you own your data
- 📱 **PWA Support** - Installable, works offline
- 📤 **Data Export** - Download your data as JSON backup

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- React Router
- PWA (Service Worker)

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

## App Structure

### Screens

1. **Intro/Splash** (`/`) - Welcome screen with animated sun
2. **Year Overview** (`/year`) - Month cards with mini calendars
3. **Daily Canvas** (`/day/:year/:month/:date`) - Write and track your day
4. **Today's Tasks** (`/tasks`) - Task management

### Typography

- **Serif Font** (Playfair Display) - Used for:
  - App title "Goalnote"
  - Page headings
  - Month names
  - Dates
  
- **Sans-serif Font** (Inter) - Used for:
  - User-written thoughts
  - Task text
  - Input fields

## Usage

1. **Intro Screen**: Wait 3 seconds or click anywhere to proceed
2. **Year Overview**: 
   - Click a month card to view it
   - Click a date in the mini calendar to open that day
   - Click "+" icon to export your data
3. **Daily Canvas**:
   - Select a mood (emoji)
   - Click "Edit" to enable editing
   - Write your thoughts
   - Click "Save" to persist (no auto-save)
4. **Tasks**: Add, complete, and delete tasks for today

## Data Storage

All data is stored in browser LocalStorage:
- Entries: `goalnote-entries`
- Tasks: `goalnote-tasks`

## PWA Icons

The app requires icon files for PWA installation:
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)

You can generate these from the `public/favicon.svg` file or create custom icons.

## License

MIT
