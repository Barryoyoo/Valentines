const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;
const LOG_DIR = path.join(__dirname, 'logs');
const VISITS_LOG = path.join(LOG_DIR, 'visits.json');
const CLICKS_LOG = path.join(LOG_DIR, 'clicks.json');

app.use(express.json());

async function ensureLogFile(filePath) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.access(filePath);
  } catch (err) {
    // Create file with empty array if it doesn't exist
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

async function appendLog(filePath, data) {
  await ensureLogFile(filePath);
  const raw = await fs.readFile(filePath, 'utf8');
  let arr;
  try {
    arr = JSON.parse(raw);
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }
  arr.push(data);
  await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8');
}

app.post('/api/log-visit', async (req, res) => {
  const { page } = req.body || {};
  const entry = {
    page: page || 'unknown',
    userAgent: req.headers['user-agent'] || '',
    ip: req.ip,
    timestamp: new Date().toISOString()
  };

  try {
    await appendLog(VISITS_LOG, entry);
  } catch (err) {
    console.error('Failed to log visit', err);
  }

  res.status(204).end();
});

app.post('/api/log-click', async (req, res) => {
  const { type } = req.body || {};
  const entry = {
    type: type || 'unknown',
    userAgent: req.headers['user-agent'] || '',
    ip: req.ip,
    timestamp: new Date().toISOString()
  };

  try {
    await appendLog(CLICKS_LOG, entry);
  } catch (err) {
    console.error('Failed to log click', err);
  }

  res.status(204).end();
});

// Serve static React build
const clientDistPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDistPath));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

