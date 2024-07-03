const { createClient } = require("redis");

const client = createClient({
    host: 'redis', // use the service name 'redis'
    port: 6379
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  await client.connect();
})();

module.exports = client;
