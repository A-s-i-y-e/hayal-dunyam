const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./config/database");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// Express uygulamasını oluştur
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar
app.use(express.static(path.join(__dirname, "public")));

// Veritabanı bağlantıları
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Ana route
app.get("/", (req, res) => {
  res.send("Hayal Dünyam API çalışıyor!");
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, "localhost", () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
  console.log(`http://localhost:${PORT} adresinden erişebilirsiniz`);
});

// Hata yakalama
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(
      `Port ${PORT} zaten kullanımda. Lütfen başka bir port deneyin.`
    );
  } else {
    console.error("Sunucu hatası:", error);
  }
});
