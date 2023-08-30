import User from "../schemas/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid Credential", 400);
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new CustomError("Invalid Credential", 400);
  }

  user.password = undefined;

  const token = await user.getJwtToken();

  res.status(200).json({
    success: true,
    message: "Login Successful",
    user: user,
    token: {
      value: token,
      expiresIn: process.env.JWTEXPIRY,
    },
  });
});

export default login;
