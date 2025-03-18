const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URI);

// Cache middleware
const cache = (duration) => {
  return async (req, res, next) => {
    try {
      // Cache key oluştur
      const key = `cache:${req.originalUrl}`;

      // Cache'den veri kontrolü
      const cachedData = await redis.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      // Orijinal response.json metodunu sakla
      const originalJson = res.json;
      res.json = function (data) {
        // Veriyi cache'e kaydet
        redis.setex(key, duration, JSON.stringify(data));
        // Orijinal json metodunu çağır
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error("Cache Error:", error);
      next();
    }
  };
};

// Cache temizleme fonksiyonu
const clearCache = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error("Cache Clear Error:", error);
  }
};

module.exports = {
  redis,
  cache,
  clearCache,
};
