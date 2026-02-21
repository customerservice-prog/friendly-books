import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error('REDIS_URL required');
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

const w = new Worker('jobs', async (job) => {
  console.log('job', job.name, job.id, job.data);
  // TODO: implement sync + classification
  return { ok: true };
}, { connection });

w.on('completed', (job) => console.log('completed', job.id));
w.on('failed', (job, err) => console.error('failed', job?.id, err));
