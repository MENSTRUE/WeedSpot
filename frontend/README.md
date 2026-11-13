# WeedSpot frontend — React segmentation studio

## Technology and design

React 19 + TypeScript + Vite 6, `lucide-react`, custom CSS (`src/style.css`); blue-gray research dashboard. There is no React Router; the sidebar scrolls to model details in the same screen. `src/main.tsx` mounts `src/App.tsx`. No backend persistence or account management is implemented.

## User workflow and state

File can be selected or dropped. Browser checks JPEG/PNG/WebP and ≤10 MiB; the server additionally enforces 16 MP. Component state tracks readiness/error, selected file, object URL, inference result, loading, drag state, active compare mode, slider percentage and model-detail expansion. The UI queries `/api/v1/ready` on mount and disables Analyze if model unavailable. `POST /api/v1/predict` sends FormData field `file`. Results are displayed as **Compare / Overlay / Mask / Original**, percentages of model-predicted pixels, confidence/timing and downloadable PNG visualization.

Not a measurement instrument: percentages do not mean real-world area, and mean softmax confidence does not establish calibrated accuracy. A new file resets prior analysis.

## Development

```powershell
cd 'D:\porto\100 day\day 35\frontend'
npm ci
npm run dev
# separate terminal
npm run build
```

Open `http://127.0.0.1:5173`. Vite proxies `/api` to `http://127.0.0.1:8000`; start backend first. `npm run build` runs TypeScript check and Vite compilation. No dedicated automated frontend E2E/UI test suite is tracked at audit.

## Accessibility, security and roadmap

Visible input controls/buttons and labeled compare range exist. A formal keyboard/screen-reader/mobile audit is not recorded. Do not assume accessibility compliance without testing. UI download uses client-created data links; the API supplies base64 images, not cloud objects. Before public deployment: audited error states, accessibility testing, mobile validation, privacy notice, authentication integration as appropriate, and production API address/CORS design. See [`docs/en/architecture.md`](../docs/en/architecture.md) and [`docs/en/limitations.md`](../docs/en/limitations.md).
