const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/member");
const auth = require("../auth/auth");

router.get("/all-member", auth, MemberController.getAllMember);
router.post("/register-member", auth, MemberController.registerMember);

router.get("/searched-members", auth, MemberController.searchMember);
router.get("/monthly-member", auth, MemberController.monthlyMember);
router.get("/within-3-days-expiring", auth, MemberController.expiringWithin3Days);
router.get("/within-4-7-expiring", auth, MemberController.expiringWithIn4To7Days);
router.get("/expired-members", auth, MemberController.expiredMember);
router.get("/inactive-member", auth, MemberController.inactiveMember);

router.get("/get-member/:id", auth, MemberController.getMemberDetails);
router.post("/change-status/:id", auth, MemberController.changeStatus);
router.put("/update-member-plan/:id", auth, MemberController.updateMemberPlan);

module.exports = router;
