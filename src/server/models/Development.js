const mongoose = require("mongoose");

const developmentSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  metrics: {
    creativity: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    language: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    motor: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    social: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  activities: [
    {
      type: {
        type: String,
        enum: ["drawing", "storytelling", "reading", "listening", "sharing"],
        required: true,
      },
      duration: {
        type: Number, // Dakika cinsinden
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
      notes: {
        type: String,
        trim: true,
      },
    },
  ],
  achievements: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      type: {
        type: String,
        enum: ["story", "drawing", "interaction", "learning"],
        required: true,
      },
    },
  ],
  goals: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      targetDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active",
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
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
developmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Development", developmentSchema);
