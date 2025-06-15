const Member = require("../modals/member");
const Membership = require("../modals/membership");

exports.getAllMember = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const members = await Member.find({ gym: req.gym._id });
    const totalMember = members.length;

    const limitedMembers = await Member.find({ gym: req.gym._id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: members.length
        ? "Fetched members Successfully"
        : "No any member registered yet",
      members: limitedMembers,
      totalMembers: totalMember,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

function addMonthsToDate(months, joiningDate) {
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  const adjustedMonth = futureMonth % 12;

  const futureDate = new Date(futureYear, adjustedMonth, 1);

  const lastDayOfFutureMonth = new Date(
    futureYear,
    adjustedMonth + 1,
    0
  ).getDate();

  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

  futureDate.setDate(adjustedDay);

  return futureDate;
}

exports.registerMember = async (req, res) => {
  try {
    const { name, mobileNo, address, membership, profilePic, joiningDate } =
      req.body;
    const member = await Member.findOne({ gym: req.gym._id, mobileNo });
    if (member) {
      return res
        .status(409)
        .json({ error: "Already registered with this mobile number" });
    }

    const memberShip = await Membership.findOne({
      _id: membership,
      gym: req.gym._id,
    });
    const membershipMonth = memberShip.months;
    if (memberShip) {
      let jngDate = new Date(joiningDate);
      const nextBillDate = addMonthsToDate(membershipMonth, jngDate);
      let newMember = new Member({
        name,
        mobileNo,
        address,
        membership,
        gym: req.gym._id,
        profilePic,
        nextBillDate,
      });
      await newMember.save();
      res
        .status(200)
        .json({ message: "Member registered successfully", newMember });
    } else {
      return res.status(409).json({ error: "No such membership are there" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.searchMember = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    const members = await Member.find({
      gym: req.gym._id,
      $or: [
        { name: { $regex: "^" + searchTerm, $options: "i" } },
        { mobileNo: { $regex: "^" + searchTerm, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: members.length
        ? "Fetched members successfully"
        : "No such member registered yet",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.monthlyMember = async (req, res) => {
  try {
    const now = new Date();
    // Get the first day of the current month

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get the last day of the current month
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const member = await Member.find({
      gym: req.gym._id,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: member.length
        ? "Fetched members successfully"
        : "No such member registered yet",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.expiringWithin3Days = async (req, res) => {
  try {
    const today = new Date();
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);

    const member = await Member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: today,
        $lte: nextThreeDays,
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched members successfully"
        : "No such member is expiring within 3 days",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.expiringWithIn4To7Days = async (req, res) => {
  try {
    const today = new Date();
    const next4Days = new Date();
    next4Days.setDate(today.getDate() + 4);

    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const member = await Member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: next4Days,
        $lte: next7Days,
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched members successfully"
        : "No such member is expiring within 4-7 days",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.expiredMember = async (req, res) => {
  try {
    const today = new Date();
    const member = await Member.find({
      gym: req.gym._id,
      status: "Active",
      nextBillDate: {
        $lt: today,
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched members successfully"
        : "No such member has been expired",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.inactiveMember = async (req, res) => {
  try {
    const member = await Member.find({
      gym: req.gym._id,
      status: "Pending",
    });

    res.status(200).json({
      message: member.length
        ? "Fetched inactive members successfully"
        : "No such member is pending...",
      member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMemberDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id, gym: req.gym._id });
    if (!member) {
      return res.status(400).json({
        error: "No such member",
      });
    }
    res.status(200).json({
      message: "Member data fetched",
      member: member,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const member = await Member.findOne({ _id: id, gym: req.gym._id });
    if (!member) {
      return res.status(400).json({
        error: "No such member",
      });
    }
    member.status = status;
    await member.save();
    res.status(200).json({
      message: "Status changed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;
    const { id } = req.params;
    const memberShip = await Membership.findOne({
      gym: req.gym._id,
      _id: membership,
    });

    if (memberShip) {
      let getMonth = memberShip.months;
      let today = new Date();
      let nextBillDate = addMonthsToDate(getMonth, today);
      const member = await Member.findOne({ gym: req.gym._id, _id: id });
      if (!member) {
        return res.status(409).json({ error: "No such member are there" });
      }
      member.nextBillDate = nextBillDate;
      member.lastPayment = today;

      await member.save();
      res.status(200).json({ message: "Member renewed successfully", member });
      
    } else {
      return res.status(400).json({ error: "No such membership are there" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
