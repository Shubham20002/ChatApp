import { StreamChat } from 'stream-chat'
import dotenv from 'dotenv';

dotenv.config(); 


const apiKey = "ykpy9qz7acuc"
const apiSecret ="yquxxv9hfh27ktwd5mny68je3rrp25udhbd4n9vjhjn24ku4vesdtx85fghqc2jp"

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser= async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }
    catch(error){
        console.error("Error upseting Stream User",error)
    }
}