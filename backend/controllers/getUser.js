import asyncHandler from "../utils/asyncHandler.js";

const getUser = asyncHandler(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    success: true,
    user: user,
  });
});

export default getUser;
