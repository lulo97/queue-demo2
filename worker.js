const { Worker } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis({ host: 'localhost', port: 6379, maxRetriesPerRequest: null });

function doWork(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    Math.sqrt(Math.random() * 100000);
  }
}

const worker = new Worker('work', async (job) => {
  console.log(`🔄 Processing job ${job.id}`);
  doWork(job.data.duration);
  console.log(`✅ Job ${job.id} completed`);
  return { ok: true };
}, { connection, concurrency: 4 }); // 4 parallel workers

console.log('👷 Worker started, concurrency = 4');