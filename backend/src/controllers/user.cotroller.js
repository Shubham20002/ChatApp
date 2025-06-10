import User from "../models/User.js";

export async function getrecommendedUser(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    console.log("pp", currentUserId);
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude self
        { _id: { $nin: currentUser.friends } }, // exclude existing friends
        { isOnboarded: true }, // only onboarded users
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in recommendedUser");
  }
}

export async function getmyFriends(req,res) {
    try {
        console.log(req.user)
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
      
        console.log("suee",user)
        res.status(200).json(user.friends)
        
    } catch (error) {
        console.log("Error in friend list",error);
    }

}
