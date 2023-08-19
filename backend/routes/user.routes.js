import express from "express";
import getUser from "../controllers/getUser.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/", isLoggedIn, getUser);

export default router;
