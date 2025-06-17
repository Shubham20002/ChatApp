import FriendRequest from "../models/FriendRequest.js";
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


export async function sendFriendRequest(req,res) {
     try {
        const myId=req.user.id;
        const {id:recipientId}=req.params;
        

        // prevent sending request to yourself
        // if(myId === recipientId){
        //     return res.status(400).json({message:"you cant send messsage to yourself"})
        // }

        // const recipient=await User.findById({recipientId});
        // if(!recipient){
        //     return res.status(400).json({message:"recipient not found"})
        // }
        //check allredy friend
        // if(recipient.friends.includes(myId)){
        //     return res.status(400).json({message:"You are already friend with this user"})
        // }

        // check if rquest already exist(pending)
        // const existingRequest= await FriendRequest.findOne({
        //     $or:[
        //         {sender:myId, recipient:recipientId},
        //         {sender:recipientId, recipient:myId}
        //     ]
        // })
        // if(existingRequest){
        //     return res.status(400).json({message:"A Friend Request is already exists between you and this user"})
        // }
        const friendRequest= await FriendRequest.create({
            sender:myId,
            recipient:recipientId
        });
        res.status(200).json(friendRequest)
     } catch (error) {
        console.log("Error while sending friend request")
     }
}