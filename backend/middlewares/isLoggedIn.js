import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import User from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";

const isLoggedIn = asyncHandler(async (req, _res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new CustomError("Not authorized to access this route.", 401);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    req.user = await User.findById(decodedToken._id);
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route.", 401);
  }
});

export default isLoggedIn;
