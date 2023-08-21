import User from "../schemas/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError("Name, email, and password are required", 400);
  }

  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) {
    throw new CustomError("User already exists", 409);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Signup Successful",
    user: user,
  });
});

export default signup;
