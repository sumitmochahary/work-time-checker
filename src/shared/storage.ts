export interface TimerState {
  checkIn: string;
  workHours: number;
  workMinutes: number;
  checkoutTime: number;
  active: boolean;
}

interface StorageData {
  timer?: TimerState;
}

export async function saveTimer(timer: TimerState): Promise<void> {
  await chrome.storage.local.set({
    timer,
  });
}

export async function getTimer(): Promise<TimerState | undefined> {
  const result = (await chrome.storage.local.get("timer")) as StorageData;

  return result.timer;
}

export async function clearTimer(): Promise<void> {
  await chrome.storage.local.remove("timer");
}
