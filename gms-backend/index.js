const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const MemberRoutes = require("./routes/member");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cookieParser());

require("./DBConnection/conn");

const gymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./routes/membership");

app.use("/auth", gymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MemberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
