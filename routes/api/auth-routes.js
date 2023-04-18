const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/authController");

const { authenticate, upload, validateBody } = require("../../middlewars");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSchema),
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
