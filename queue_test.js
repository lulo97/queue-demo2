const axios = require('axios');

const TOTAL = 100;
const CONCURRENCY = 50;
const URL = 'http://localhost:3001/compute';

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

  //📊 Queue test: 100 succeeded, 0 failed
  console.log(`\n📊 Queue test: ${success} succeeded, ${failure} failed`);
}

run();