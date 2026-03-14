# Bloom Break

A browser extension that adds a floating flower icon to every page. Click it to open a full-screen bloom overlay and play a calming video.

##  Features

- Floating flower icon injected into all pages
- Click to open a immersive full-screen overlay with bloom video
- Dismiss by clicking close button, backdrop, or pressing Escape
- Auto-close when video ends
- Respects a single overlay instance at a time

##  Files

- `manifest.json` — Extension metadata and permissions
- `content.js` — Content script behavior for flower + overlay lifecycle
- `style.css` — UI styling for floating flower and overlay
- `icons/` — Extension icons
- `flower.gif` — Floating flower icon image
- `bloom.mp4` — full-screen video asset

##  Install locally (developer mode)

1. Open `chrome://extensions` (or `edge://extensions`) in your browser.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this project folder (`Flower-Bloom`).
4. Visit any website; the flower icon appears in the lower-right.
5. Click the flower to open the bloom overlay.

##  Usage

- Click the floating flower to open the overlay.
- Close by clicking the close button, clicking outside the video, or pressing Escape.
- The overlay automatically closes when the video finishes.

##  Development

- Edit `content.js` and `style.css` for interactive behavior and design.
- Reload the extension from the browser extensions page after changes.
- Confirm console logs in the page context to debug injection issues.

##  Packaging

1. In `chrome://extensions`, click **Pack extension**.
2. Choose this project folder as the root.
3. Upload the generated `.crx` or `.zip` to your browser or store.

##  License

This project is open source. Use and modify freely.

