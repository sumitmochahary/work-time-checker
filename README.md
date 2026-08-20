# Work Time Checker ⏰

A lightweight Chrome extension that calculates your expected checkout time based on your check-in time and fixed working hours.

The extension is designed for people who have a fixed working duration, such as **8 hours 30 minutes**, and want a reminder when their work time is complete.

## How It Works

The extension uses three pieces of information:

- **Check-in time** — for example, `09:30 AM`
- **Work hours** — for example, `8 hours`
- **Work minutes** — for example, `30 minutes`

It then calculates the expected checkout time.

```text
Check-in Time + Work Duration = Checkout Time
```

Example:

```text
Check-in Time:    09:30 AM
Work Duration:    8 hours 30 minutes
                  ─────────────────
Checkout Time:    06:00 PM
```

The extension also displays the remaining time until checkout.

```text
Checkout Time: 06:00 PM
Time Remaining: 03:45:21
```

When the checkout time is reached, the extension sends a Chrome desktop notification.

> ⏰ Time to check out
> Your working time is complete.

## Features

### Current Features

- Enter check-in time
- Support 12-hour time format such as `09:30 AM`
- Set working hours
- Set working minutes
- Automatically calculate checkout time
- Display countdown until checkout
- Save timer state using Chrome Storage
- Run checkout reminder in the background
- Send Chrome desktop notification
- Reset the current timer

### Planned Features

- Automatically detect current check-in time
- Default working duration
- 5-minute warning notification
- Notification sound
- Start/stop timer
- Automatic daily reset
- Better time picker
- Improved UI
- Dark mode
- Multiple work schedules
- Break-time support
- Extension icon and branding
- Chrome Web Store publishing

## Example

Suppose you start work at:

```text
09:30 AM
```

and your required working time is:

```text
8 hours 30 minutes
```

The extension calculates:

```text
09:30 AM
   +
08:30
   =
06:00 PM
```

If the current time is `02:00 PM`, the extension shows:

```text
Time Remaining
04:00:00
```

When the countdown reaches zero, the background service worker triggers the checkout notification.

## Technology Stack

- React
- TypeScript
- Vite
- Chrome Extension Manifest V3
- Chrome Storage API
- Chrome Alarms API
- Chrome Notifications API

## Project Structure

```text
work-time-checker/
│
├── public/
│   ├── manifest.json
│   └── work-time-icon.png
│
├── src/
│   │
│   ├── background/
│   │   └── service-worker.ts
│   │
│   ├── popup/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── shared/
│   │   ├── storage.ts
│   │   └── time.ts
│   │
│   └── styles.css
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## Architecture

The extension consists of two main parts:

```text
┌─────────────────────────────┐
│        Popup UI             │
│                             │
│  Check-in Time              │
│  Work Hours                 │
│  Work Minutes               │
│                             │
│       ↓                     │
│  Calculate Checkout Time    │
└──────────────┬──────────────┘
               │
               ↓
       Chrome Storage
               │
               ↓
       Chrome Alarms API
               │
               ↓
┌─────────────────────────────┐
│     Service Worker          │
│                             │
│  Waits for checkout time    │
└──────────────┬──────────────┘
               │
               ↓
       Chrome Notification
               │
               ↓
       ⏰ Time to Check Out
```

## Data Model

The timer state is stored using Chrome Storage.

```ts
interface TimerState {
  checkIn: string;
  workHours: number;
  workMinutes: number;
  checkoutTime: number;
  active: boolean;
}
```

Example:

```json
{
  "checkIn": "09:30 AM",
  "workHours": 8,
  "workMinutes": 30,
  "checkoutTime": 1787229000000,
  "active": true
}
```

## Time Calculation

The checkout time is calculated by converting the 12-hour check-in time into a 24-hour representation and adding the configured work duration.

Conceptually:

```text
checkoutTime =
    checkInTime
    + workHours
    + workMinutes
```

For example:

```text
09:30 AM + 8 hours + 30 minutes
= 06:00 PM
```

The countdown is calculated from the current time:

```text
timeRemaining =
    checkoutTime - currentTime
```

## Development

### Requirements

You need:

- Node.js
- npm or pnpm
- Chrome or another Chromium-based browser
- Git

### Install Dependencies

Clone the repository and install dependencies:

```bash
git clone https://github.com/sumitmochahary/work-time-checker.git

cd work-time-checker

npm install
```

### Development

Run the Vite development server:

```bash
npm run dev
```

For the Chrome extension build, use:

```bash
npm run build
```

The production extension will be generated in:

```text
dist/
```

## Load the Extension in Chrome

After building the project:

```bash
npm run build
```

Open:

```text
chrome://extensions
```

Enable:

**Developer mode**

Then select:

**Load unpacked**

Choose the project's:

```text
dist/
```

directory.

Chrome should then display **Work Time Checker** in the extensions list.

## Testing

For a quick notification test, use a short working duration.

Example:

```text
Check-in:     09:30 AM
Work hours:   0
Work minutes: 1
```

Click **Start Timer**.

The extension should calculate a checkout time one minute after the check-in time and trigger the Chrome notification when the alarm fires.

For normal usage:

```text
Check-in:     09:30 AM
Work hours:   8
Work minutes: 30
```

Expected checkout:

```text
06:00 PM
```

## Git Workflow

Check the current repository state:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Update work time checker"
```

Push:

```bash
git push
```

## Future Improvements

The project will gradually evolve from a simple checkout reminder into a polished productivity extension.

Potential improvements include:

1. Automatic check-in time
2. Configurable default work duration
3. 5-minute checkout warning
4. Notification sound
5. Start/stop controls
6. Daily timer reset
7. Better time input component
8. Break-time support
9. Persistent settings
10. Dark/light themes
11. Improved extension icon
12. Chrome Web Store release

## Goal

The goal of Work Time Checker is to provide a simple solution for people who already know their required working duration.

Instead of manually calculating:

```text
09:30 AM + 8 hours 30 minutes
```

the extension automatically calculates:

```text
Checkout: 06:00 PM
```

and reminds the user when it is time to finish work.

## License

This project is currently for personal development and learning purposes.
