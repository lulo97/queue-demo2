const express = require('express');
const app = express();
const port = 3000;

// Real CPU work: burn CPU for ~500ms
function doWork(ms = 500) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    Math.sqrt(Math.random() * 100000); // waste time
  }
}

app.get('/compute', (req, res) => {
  doWork(500);
  res.json({ result: 'done', timestamp: Date.now() });
});

app.listen(port, () => {
  console.log(`⚡ Sync server running on http://localhost:${port}`);
});