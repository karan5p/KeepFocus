# KeepFocus

**Tampermonkey Userscript** to prevent websites from detecting tab switches, focus changes, or monitoring visibility.

---

## Test Functionality [Here](https://www.proginosko.com/test/WindowFocusEvents.html)

## Features

* Prevents websites from detecting when you switch tabs or unfocus the window.
* Overrides `document.hasFocus()` to always return `true`.
* Forces `document.visibilityState` and related properties to always indicate the page is visible.
* Blocks focus-related events (`blur`, `focus`, `visibilitychange`, etc.) from propagating.
* Allows specific `blur` events for whitelisted elements like input fields and fixes compatibility with Quill.js editors.
* Blocks `mouseleave` and `mouseout` events for blacklisted elements like `iframe` and `html`.
* Continuously neutralizes `onblur` and `onfocus` handlers to prevent websites from overriding them.
* Prevents `MutationObserver` from spying on the `document` or `documentElement`.
* Sends fake `mousemove` and `keydown` events every 10 seconds to simulate activity and avoid idle detection.
* Works silently in the background with minimal performance impact.

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (browser extension).
2. Open the Tampermonkey dashboard and click the **+** (Create a new script).
3. Paste the entire script code into the editor [View Raw Script](placeholder), replacing the default template.
4. Save the script (File > Save or press `Ctrl+S`).
5. The script will now run automatically on all websites.

---

## How It Works

This script:

* Overrides `document.hidden`, `document.visibilityState`, and related properties to spoof visibility.
* Blocks focus-related events (`blur`, `focus`, `visibilitychange`, etc.) from propagating.
* Continuously neutralizes `onblur` and `onfocus` handlers to prevent websites from overriding them.
* Prevents `MutationObserver` from spying on the `document` or `documentElement`.
* Sends fake `mousemove` and `keydown` events every 10 seconds to simulate activity and avoid idle detection.
* Allows specific `blur` events for whitelisted elements like input fields and fixes compatibility with Quill.js editors.
* Blocks `mouseleave` and `mouseout` events for blacklisted elements like `iframe` and `html`.

---

## Disclaimer

This script is provided for educational and personal use only. Bypassing site behavior may violate terms of service or acceptable use policies. Use responsibly and at your own risk. The author assumes no liability for misuse or any consequences arising from the use of this script.

---
## Credit
Originally inspired by [daijro/always-on-focus](https://github.com/daijro/always-on-focus)