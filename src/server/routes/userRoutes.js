const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");
const { cache } = require("../config/cache");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, cache(300), getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);

// Admin routes
router.get("/users", protect, authorize("admin"), cache(300), getAllUsers);
router.get("/users/:id", protect, authorize("admin"), cache(300), getUserById);

module.exports = router;
