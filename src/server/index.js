const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
require("dotenv").config();

// Express uygulamasını oluştur
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Veritabanı bağlantıları
connectDB();

// Ana route
app.get("/", (req, res) => {
  res.json({ message: "Hayal Dünyam API çalışıyor" });
});

// Port tanımla
const PORT = process.env.PORT || 3000;

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
