# Hayal Dünyam

Yapay Zeka Destekli Okul Öncesi Hikaye Oluşturma Platformu

## Proje Hakkında

Hayal Dünyam, okul öncesi dönem çocuklarının (3-7 yaş) yaratıcılıklarını ve hayal güçlerini geliştirmeyi amaçlayan, yapay zeka destekli interaktif bir hikaye oluşturma platformudur.

## Teknolojik Altyapı

### Frontend (Web)

- React.js (v18.2.0)
- HTML5 Canvas
- Tailwind CSS (v3.3.0)
- Redux Toolkit (v1.9.0)

### Frontend (Mobil)

- React Native (v0.71.0)
- React Native Canvas (v0.1.38)
- React Native Voice (v3.2.4)

### Backend

- Node.js (v18.15.0)
- Express.js (v4.18.2)

### Veritabanı

- MongoDB Atlas
- Redis Cloud

### Yapay Zeka ve Veri İşleme

- TensorFlow.js (v4.4.0)
- Web Speech API

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

1. Gerekli yazılımları yükleyin:

   - Node.js (v18.15.0 veya üzeri)
   - MongoDB (v6.0 veya üzeri)
   - Redis (v7.0 veya üzeri)

2. Projeyi klonlayın:

   ```bash
   git clone https://github.com/A-s-i-y-e/hayal-dunyasi.git
   cd hayal-dunyasi
   ```

3. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

4. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:

   ```env
   PORT=3002
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   REDIS_URI=your_redis_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

5. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
