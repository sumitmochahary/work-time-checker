import { useEffect, useState } from "react";

interface TimerData {
  checkoutTime: number;
}

export default function Checkout() {
  const [checkoutTime, setCheckoutTime] = useState("");

  useEffect(() => {
    chrome.storage.local.get("timer").then((result) => {
      const timer = result.timer as TimerData | undefined;

      if (!timer?.checkoutTime) {
        return;
      }

      setCheckoutTime(
        new Date(timer.checkoutTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    });
  }, []);

  return (
    <main className="checkout">
      <div className="checkout-icon">⏰</div>

      <h1>Time to Check Out</h1>

      <p>Your working hours are complete.</p>

      {checkoutTime && (
        <div className="checkout-time">Checkout: {checkoutTime}</div>
      )}
    </main>
  );
}
