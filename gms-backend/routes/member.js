const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/member");
const auth = require("../auth/auth");

router.get("/all-member", auth, MemberController.getAllMember);
router.post("/register-member", auth, MemberController.registerMember);

module.exports = router;
