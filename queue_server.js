const express = require('express');
const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const app = express();
const port = 3001;
const connection = new IORedis({ host: 'localhost', port: 6379, maxRetriesPerRequest: null });
const workQueue = new Queue('work', { connection });

app.get('/compute', async (req, res) => {
  const job = await workQueue.add('cpu-job', { duration: 500 });
  res.status(202).json({ jobId: job.id }); // immediate ack
});

app.listen(port, () => {
  console.log(`📦 Queue server running on http://localhost:${port}`);
});