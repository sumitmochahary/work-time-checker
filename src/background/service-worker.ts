const ALARM_NAME = "work-time-checkout";

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) {
    return;
  }

  await chrome.notifications.create("checkout-notification", {
    type: "basic",
    iconUrl: "work-time-icon.png",
    title: "⏰ Time to check out",
    message: "Your working time is complete.",
    priority: 2,
  });

  await chrome.storage.local.set({
    "timer.active": false,
  });
});
