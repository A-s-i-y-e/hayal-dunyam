const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Hikaye başlığı zorunludur"],
    trim: true,
    maxlength: [100, "Başlık en fazla 100 karakter olabilir"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pages: [
    {
      pageNumber: {
        type: Number,
        required: true,
      },
      drawing: {
        type: String, // Base64 formatında çizim verisi
        required: true,
      },
      audio: {
        type: String, // Ses dosyası URL'i
      },
      text: {
        type: String,
        trim: true,
      },
      aiAnalysis: {
        characters: [
          {
            name: String,
            type: String,
            description: String,
          },
        ],
        scene: String,
        emotions: [String],
        suggestions: [String],
      },
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  category: {
    type: String,
    enum: ["macera", "bilim", "fantastik", "egitici", "diger"],
    default: "diger",
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Güncelleme tarihini otomatik güncelle
storySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Story", storySchema);
