import Redis from 'ioredis';

const redis = new Redis({
  host: 'adapted-donkey-28488.upstash.io',
  port: 6379,
  password: 'AW9IAAIjcDE3ZGExODkxMGI3M2Q0ZTE2YjkwYzgxMjkxYWRlZDE4Y3AxMA', // Replace with your actual password
  tls: {}, // Ensures SSL is used
});

redis.on('connect', () => {
  console.log('Connected to Redis successfully!');
});

redis.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});
export default redis;
