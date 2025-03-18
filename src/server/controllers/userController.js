const User = require("../models/User");
const jwt = require("jsonwebtoken");

// JWT Token Oluşturma
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Kullanıcı Kaydı
exports.register = async (req, res) => {
  try {
    const { username, email, password, role, age, parentId } = req.body;

    // E-posta kontrolü
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Bu e-posta adresi zaten kayıtlı",
      });
    }

    // Kullanıcı oluşturma
    const user = await User.create({
      username,
      email,
      password,
      role,
      age,
      parentId,
    });

    // Token oluşturma
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Kullanıcı Girişi
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // E-posta ve şifre kontrolü
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Lütfen e-posta ve şifre giriniz",
      });
    }

    // Kullanıcı kontrolü
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Geçersiz e-posta veya şifre",
      });
    }

    // Şifre kontrolü
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Geçersiz e-posta veya şifre",
      });
    }

    // Token oluşturma
    const token = generateToken(user._id);

    // Son giriş tarihini güncelleme
    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Kullanıcı Profili
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Profil Güncelleme
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, age } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    // E-posta değişikliği varsa kontrol et
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Bu e-posta adresi zaten kullanımda",
        });
      }
    }

    // Kullanıcı bilgilerini güncelle
    user.username = username || user.username;
    user.email = email || user.email;
    user.age = age || user.age;

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Profil Silme
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profil başarıyla silindi",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Tüm Kullanıcıları Listele (Sadece Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Kullanıcı Detayı (Sadece Admin)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};
