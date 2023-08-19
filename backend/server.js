import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT;

(async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log("DB Connected");

    app.on("error", (error) => {
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
