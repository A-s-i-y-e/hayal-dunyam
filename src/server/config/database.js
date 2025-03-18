const mongoose = require("mongoose");
const Redis = require("redis");
require("dotenv").config();

// MongoDB Bağlantısı
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Hata: ${error.message}`);
    process.exit(1);
  }
};

// Redis Cloud Bağlantısı
const redisClient = Redis.createClient({
  url: process.env.REDIS_URI,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Bağlantısı Başarılı"));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(`Redis Bağlantı Hatası: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  connectRedis,
  redisClient,
};
