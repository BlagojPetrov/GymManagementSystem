const express = require("express");
const router = express.Router();
const MembershipController = require("../controllers/membership");
const auth = require("../auth/auth");

router.post("/add-membership", auth, MembershipController.addMembership);
router.get("/get-membership", auth, MembershipController.getMembership);

module.exports = router;
