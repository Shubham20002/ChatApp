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

export async function acceptFriendRequest(req,res) {
  try {
    const {id:requestId}=req.params;
    const friendRequest=await FriendRequest.findById(requestId);

    if(!friendRequest){
      res.status(400).json({message:"Friend request not found"})
    }
    
    friendRequest.status="accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender,{
      $addToSet:{friends:friendRequest.recipient}
    })

    await User.findByIdAndUpdate(friendRequest.recipient,{
      $addToSet:{friends:friendRequest.sender}
    })

    res.status(200).json({message:"Friend request accepted successfully"})
    
  } catch (error) {
    res.status(500).json({message:"Internal server error"})
  }
  
}

export async function getFriendRequests(req,res){
  try {
    const incomingReqs= await FriendRequest.find({
      recipient:req.user.id,
      status:"pending"
    }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

    const acceptReqs= await FriendRequest.find({
      sender:req.user.id,
      status:"accepted"
    }).populate("recipient","fullName profilePic");

    res.status(200).json({incomingReqs,acceptReqs})
    
  } catch (error) {
   res.status(400).json({message:"error in get friendrequest"}) 
  }
}

export async function getOutgoingFriendReqs(req,res){
  try {
    const outgoingRequests=await FriendRequest.find({
      sender:req.user.id,
      status:"pending"
    }).populate("recipient","fullName profilePic nativeLanguage learningLanguage")
    res.send(200).json({outgoingRequests})
  } catch (error) {
    res.send(400).json({message:"error in outgoing friendrequest api"})
  }

}