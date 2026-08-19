export function calculateCheckoutTime(
  checkIn: string,
  workHours: number,
  workMinutes: number,
): Date {
  const match = checkIn.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    throw new Error("Invalid check-in time. Use format 09:30 AM");
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12) {
    throw new Error("Invalid hour");
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error("Invalid minutes");
  }

  // Convert 12-hour time to 24-hour time
  if (period === "AM") {
    if (hours === 12) {
      hours = 0;
    }
  } else {
    if (hours !== 12) {
      hours += 12;
    }
  }

  const checkout = new Date();

  checkout.setHours(hours, minutes, 0, 0);

  checkout.setMinutes(checkout.getMinutes() + workHours * 60 + workMinutes);

  return checkout;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getRemainingTime(checkoutTime: number): string {
  const difference = checkoutTime - Date.now();

  if (difference <= 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(difference / 1000);

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}
