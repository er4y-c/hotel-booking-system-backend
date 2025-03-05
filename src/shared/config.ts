export default () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  mongo_url: process.env.MONGO_URL,
  database: process.env.DATABASE,
  supabase_url: process.env.SUPABASE_URL,
  supabase_key: process.env.SUPABASE_KEY,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  redisTTL: parseInt(process.env.REDIS_TTL || '3600', 10),
});
