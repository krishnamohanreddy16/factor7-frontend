# Fastor React Assignment - PWA Demo

## What this includes
- React + Vite project scaffold
- Tailwind CSS configuration (requires install & build)
- Login (mobile) -> OTP (123456) flow (simulated authentication saved in localStorage)
- Restaurant list using a mock API (local data)
- Restaurant detail page with HTML Canvas image merge (restaurant image + Fastor logo)
- Share image using Web Share API (if supported)
- Bonus: Drag to reposition logo on the canvas

## How to run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open the app at the URL printed by Vite (usually http://localhost:5173)

## Notes
- The Fastor logo is placed in `public/fastor-logo.svg` and referenced by the canvas code.
- OTP is hardcoded as `123456`.
- This project uses Tailwind — if styles don't appear, ensure you installed dev dependencies and restarted the dev server.
