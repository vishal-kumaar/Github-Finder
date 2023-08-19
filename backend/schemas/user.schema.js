import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

userSchema.methods = {
  comparePassword: async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
  },
  getJwtToken: function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      process.env.JWTSECRET,
      {
        expiresIn: process.env.JWTEXPIRY,
      }
    );
  },
};

export default mongoose.model("User", userSchema);
