const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
require("./DBConnection/conn");

const gymRoutes = require("./Routes/gym");

app.use("/auth", gymRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 4000");
});
