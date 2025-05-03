// ==UserScript==
// @name          Keep Focus
// @namespace     https://github.com/karan5p/KeepFocus
// @version       1.0.1
// @description   Prevents websites from knowing that you switched tabs or unfocused the window
// @include       *
// @run-at        document-start
// ==/UserScript==

(() => {
  // === Spoof focus state ===
  unsafeWindow.onblur = null;
  unsafeWindow.blurred = false;

  unsafeWindow.document.hasFocus = () => true;
  unsafeWindow.window.onFocus = () => true;

  // Kill DOM property names related to visibility
  ["hidden", "mozHidden", "msHidden", "webkitHidden"].forEach((prop_name) => {
    Object.defineProperty(document, prop_name, { value: false });
  });

  Object.defineProperty(document, "visibilityState", { get: () => "visible" });
  Object.defineProperty(document, "webkitVisibilityState", {
    get: () => "visible",
  });

  unsafeWindow.document.onvisibilitychange = undefined;

  // === Block focus/blur events entirely ===
  const blockedEvents = new Set([
    "visibilitychange",
    "webkitvisibilitychange",
    "blur",
    "focus",
    "hasFocus",
    "mouseleave",
    "mouseout",
    "mozvisibilitychange",
    "msvisibilitychange",
  ]);

  const eventHandler = (event) => {
    // Allow specific blur events for whitelisted elements
    const blurWhitelist = [
      HTMLInputElement,
      HTMLAnchorElement,
      HTMLSpanElement,
      HTMLParagraphElement,
    ];

    if (
      event.type === "blur" &&
      (blurWhitelist.some((type) => event.target instanceof type) ||
        event.target.classList?.contains("ql-editor")) // Quill.js fix
    ) {
      return;
    }

    // Block mouseleave and mouseout events for blacklisted elements
    const hoverBlacklist = [
      HTMLIFrameElement,
      HTMLHtmlElement,
      HTMLBodyElement,
      HTMLHeadElement,
      HTMLFrameSetElement, // obsolete but included for completeness
      HTMLFrameElement, // obsolete but included for completeness
    ];

    if (
      ["mouseleave", "mouseout"].includes(event.type) &&
      !hoverBlacklist.some((type) => event.target instanceof type)
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  };

  // Add event listeners to block unwanted events
  blockedEvents.forEach((event_name) => {
    window.addEventListener(event_name, eventHandler, true);
    document.addEventListener(event_name, eventHandler, true);
  });

  // === Continuously neutralize focus/blur handlers ===
  const neutralizeHandlers = () => {
    if (window.onfocus !== null) window.onfocus = null;
    if (window.onblur !== null) window.onblur = null;
    if (document.onfocus !== null) document.onfocus = null;
    if (document.onblur !== null) document.onblur = null;
  };

  // Run neutralization immediately and periodically
  neutralizeHandlers();
  setInterval(neutralizeHandlers, 500);

  // === Prevent MutationObserver spying ===
  const originalObserver = MutationObserver.prototype.observe;
  MutationObserver.prototype.observe = function (target, options) {
    if (target === document || target === document.documentElement) return;
    return originalObserver.call(this, target, options);
  };

  // === Keep activity alive (optional) ===
  setInterval(() => {
    document.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Shift", bubbles: true })
    );
  }, 10000);
})();
