const axios = require('axios');

const TOTAL = 100;          // total requests
const CONCURRENCY = 50;      // send 50 at a time
const URL = 'http://localhost:3000/compute';

async function run() {
  let success = 0, failure = 0;
  const promises = [];

  for (let i = 0; i < TOTAL; i++) {
    promises.push(
      axios.get(URL, { timeout: 10000 })
        .then(() => success++)
        .catch(() => failure++)
    );
    if (promises.length >= CONCURRENCY) {
      await Promise.all(promises);
      promises.length = 0;
    }
  }
  if (promises.length) await Promise.all(promises);

  //📊 Sync test: 19 succeeded, 81 failed
  console.log(`\n📊 Sync test: ${success} succeeded, ${failure} failed`);
}

run();