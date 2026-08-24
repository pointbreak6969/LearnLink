# AGENTS.md

Two-package repo (no root manifest): `Client/` (React 18 + Vite) and `Server/` (Express + MongoDB). Run all commands inside the respective directory.

## Commands

```bash
# Server
cd Server && npm start        # nodemon index.js (no build/test scripts exist)

# Client
cd Client && npm run dev      # Vite dev server on http://localhost:5173
cd Client && npm run lint     # ESLint — the only check available; no tests or typecheck anywhere
```

## Environment

Both `.env` files are committed locally but required for the server to boot. `Server/.env` needs: `PORT`, `MONGODB_URI`, `CORS_ORIGIN`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`, `REFRESH_TOKEN_EXPIRY`, `CLOUDINARY_*`. Without MongoDB reachable, the server exits at startup (`index.js` connects DB before listening). `Client/.env` needs `VITE_BACKEND_URL`.

## Architecture

- **Server entry:** `index.js` → connects Mongo (`db/db.js`) → serves `app.js`. All API routes under `/api/v1/{user,profile,resource,classroom}`.
- **Server pattern per feature:** `routes/*.routes.js` → `controllers/*.controller.js` → `models/*Model.js` (Mongoose). Shared helpers in `utils/` (`ApiError`, `ApiResponse`, `asyncHandler`). Note inconsistent naming: `canvas.route.js` and `resources.routes.js`.
- **Auth:** JWT access/refresh tokens stored in cookies, not Authorization headers. Guards: `middlewares/auth.middleware.js`, ownership checks in `owner.middleware.js`.
- **File uploads** go through `middlewares/multer.middleware.js` then Cloudinary (`utils/cloudinary.js`) — resource upload accepts up to 25 files.
- **Socket.io** is wired via `utils/socket.js` on the same HTTP server as Express.
- API docs with full endpoint list: `Server/readme.md`.
- **Client:** Redux Toolkit (`src/store/`), API layer in `src/services/*.js` (axios), pages in `src/pages/`, shadcn/ui components in `src/components/ui/` (config in `components.json`). Path alias `@/*` → `src/*` (jsconfig.json + vite-tsconfig-paths).
- **Deployment:** `Server/vercel.json` deploys the whole server as a single Vercel serverless function from `index.js`.

## Gotchas

- CORS allows only `CORS_ORIGIN` plus `http://localhost:5173`; running the client on another port breaks auth (cookies are `credentials: true`).
- Rate limit: 300 requests / 15 min globally (`app.js`).
- JSON body limit is 16kb — large payloads fail with 413.
