const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Kullanıcı adı zorunludur"],
    unique: true,
    trim: true,
    minlength: [3, "Kullanıcı adı en az 3 karakter olmalıdır"],
  },
  email: {
    type: String,
    required: [true, "E-posta adresi zorunludur"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Geçerli bir e-posta adresi giriniz",
    ],
  },
  password: {
    type: String,
    required: [true, "Şifre zorunludur"],
    minlength: [6, "Şifre en az 6 karakter olmalıdır"],
  },
  role: {
    type: String,
    enum: ["child", "parent", "admin"],
    default: "child",
  },
  age: {
    type: Number,
    min: [3, "Yaş 3'ten küçük olamaz"],
    max: [7, "Yaş 7'den büyük olamaz"],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Şifre hashleme middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Şifre karşılaştırma metodu
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
