import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/config/.env" });
const PORT = process.env.PORT || 5000;

const app = express();

app.use("/public", express.static("public"));
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
