const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token kontrolü
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Bu işlem için giriş yapmanız gerekiyor",
      });
    }

    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcı kontrolü
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Geçersiz token",
      error: error.message,
    });
  }
};

// Rol bazlı yetkilendirme
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Bu işlem için yetkiniz yok",
      });
    }
    next();
  };
};
