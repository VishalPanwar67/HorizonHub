import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import { adminRoutes } from "./routes/index.routes.js";

dotenv.config({ path: "./backend/config/.env" });
const PORT = process.env.PORT || 5000;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use("/api/admin", adminRoutes);

app.use("/public", express.static("public"));
// app.listen(PORT, () => {
//   console.log("Server started on port ", PORT);
// });

connectMongoDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`app is not able to connect :: ${error}`);
      throw error;
    });
    app.listen(PORT || 3000, () => {
      console.log(`app is listening on port :: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`index.js :: connectDB connection failed  :: ${error}`);
  });
