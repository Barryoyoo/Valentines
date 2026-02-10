## Valentines App for Zari

**Tech stack**
- **Frontend**: React + Vite (SPA with React Router)
- **Styling**: CSS with Google Fonts (`Dancing Script`, `Quicksand`)
- **Backend**: Node.js + Express (serves React build and logs visits/clicks)

### Setup

1. **Install server dependencies** (at project root):

```bash
npm install
```

2. **Install client dependencies**:

```bash
cd client
npm install
cd ..
```

### Development

In one terminal, run the Express server:

```bash
npm run dev
```

In another terminal, run the React dev server:

```bash
cd client
npm run dev
```

The Vite dev server will open (by default on port `5173`) and proxies API calls (`/api/...`) to the Express server on port `5000`.

### Production build

1. **Build the React app**:

```bash
npm run build
```

This runs `client`'s Vite build and outputs to `client/dist`.

2. **Start the Express server** (it will serve the built React files):

```bash
npm start
```

Open `http://localhost:5000` in your browser.

### Logging

- **Visit logs**: `logs/visits.json`
- **Click logs**: `logs/clicks.json`

Both are simple JSON arrays that record timestamps, basic page info, and user agent.

