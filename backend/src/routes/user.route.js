import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getmyFriends, getrecommendedUser } from "../controllers/user.cotroller.js";

const router=express.Router();

router.use(protectRoute);

router.get('/', getrecommendedUser);
router.get('/friends', getmyFriends);

export default router