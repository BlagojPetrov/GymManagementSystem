const express = require("express");
const router = express.Router();
const gymController = require("../Controllers/gym");

router.post("/register", gymController.register);
router.post("/login", gymController.login);
router.post("/reset-password/sendOtp", gymController.sendOtp);
router.post("/reset-password/checkOtp", gymController.checkOtp);
router.post("/reset-password", gymController.resetPassword);
router.post("/logout", gymController.logout);

module.exports = router;
