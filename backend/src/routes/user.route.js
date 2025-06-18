import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getmyFriends, getrecommendedUser,sendFriendRequest } from "../controllers/user.cotroller.js";

const router=express.Router();

router.use(protectRoute);

router.get('/', getrecommendedUser);
router.get('/friends', getmyFriends);

router.post("/friend-request/:id",sendFriendRequest)
router.post("/accept-request/:id",acceptFriendRequest)
export default router