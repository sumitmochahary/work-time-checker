import { useEffect, useState } from "react";

import {
  calculateCheckoutTime,
  formatTime,
  getRemainingTime,
} from "../shared/time";

import {
  getTimer,
  saveTimer,
  clearTimer,
  type TimerState,
} from "../shared/storage";

export default function App() {
  const [checkIn, setCheckIn] = useState("09:30 AM");

  const [workHours, setWorkHours] = useState(8);

  const [workMinutes, setWorkMinutes] = useState(30);

  const [checkoutTime, setCheckoutTime] = useState<number | null>(null);

  const [remaining, setRemaining] = useState("00:00:00");

  // Load saved timer
  useEffect(() => {
    getTimer().then((timer) => {
      if (!timer) return;

      setCheckIn(timer.checkIn);
      setWorkHours(timer.workHours);
      setWorkMinutes(timer.workMinutes);
      setCheckoutTime(timer.checkoutTime);
    });
  }, []);

  // Countdown
  useEffect(() => {
    if (checkoutTime === null) {
      return;
    }

    const update = () => {
      setRemaining(getRemainingTime(checkoutTime));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [checkoutTime]);

  async function startTimer() {
    const checkout = calculateCheckoutTime(checkIn, workHours, workMinutes);

    const timestamp = checkout.getTime();

    const timer: TimerState = {
      checkIn,
      workHours,
      workMinutes,
      checkoutTime: timestamp,
      active: true,
    };

    await saveTimer(timer);

    await chrome.alarms.create("work-time-checkout", {
      when: timestamp,
    });

    setCheckoutTime(timestamp);
  }

  async function resetTimer() {
    await chrome.alarms.clear("work-time-checkout");

    await clearTimer();

    setCheckoutTime(null);
    setRemaining("00:00:00");
  }

  return (
    <main className="app">
      <h1>Work Time Checker</h1>

      <label>
        Check-in time
        <input
          type="text"
          placeholder="09:30 AM"
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
        />
      </label>

      <label>
        Work hours
        <input
          type="number"
          min="0"
          max="24"
          value={workHours}
          onChange={(event) => setWorkHours(Number(event.target.value))}
        />
      </label>

      <label>
        Work minutes
        <input
          type="number"
          min="0"
          max="59"
          value={workMinutes}
          onChange={(event) => setWorkMinutes(Number(event.target.value))}
        />
      </label>

      {checkoutTime !== null && (
        <section className="result">
          <span>Checkout time</span>

          <strong>{formatTime(new Date(checkoutTime))}</strong>

          <span>Time remaining</span>

          <strong>{remaining}</strong>
        </section>
      )}

      <div className="actions">
        <button onClick={startTimer}>Start Timer</button>

        <button className="secondary" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </main>
  );
}
