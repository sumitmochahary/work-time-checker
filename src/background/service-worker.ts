const ALARM_NAME = "work-time-checkout";

const CHECKOUT_WIDTH = 420;
const CHECKOUT_HEIGHT = 360;

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) {
    return;
  }

  await openCheckoutPopup();
});

async function openCheckoutPopup() {
  const windows = await chrome.windows.getAll({
    windowTypes: ["popup"],
  });

  const alreadyOpen = windows.some((window) =>
    window.tabs?.some((tab) => tab.url?.includes("checkout.html")),
  );

  if (alreadyOpen) {
    return;
  }

  const currentWindow = await chrome.windows.getLastFocused();

  const browserWidth = currentWindow.width ?? 1280;

  const browserHeight = currentWindow.height ?? 800;

  const browserLeft = currentWindow.left ?? 0;

  const browserTop = currentWindow.top ?? 0;

  const left =
    browserLeft + Math.max(0, Math.round((browserWidth - CHECKOUT_WIDTH) / 2));

  const top =
    browserTop + Math.max(0, Math.round((browserHeight - CHECKOUT_HEIGHT) / 2));

  await chrome.windows.create({
    url: "checkout.html",
    type: "popup",
    width: CHECKOUT_WIDTH,
    height: CHECKOUT_HEIGHT,
    left,
    top,
    focused: true,
  });

  const result = await chrome.storage.local.get("timer");

  if (result.timer) {
    await chrome.storage.local.set({
      timer: {
        ...result.timer,
        active: false,
      },
    });
  }
}
