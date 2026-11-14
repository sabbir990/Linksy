import mongoose from "mongoose";

interface FriendRequestType{
    sender: string,
    reciever: string,
    requestDate: Date,
    status: "accepted" | "pending" | "rejected"
}

const friendRequestSchema = new mongoose.Schema<FriendRequestType>({
    sender: {type: String, required: true, lowercase: true},
    reciever: {type: String, required: true, lowercase: true},
    requestDate: {type: Date, required: true, default: Date.now()},
    status: {type: String, required: true, lowercase: true, default: "pending"}
})

const FriendRequestModel = mongoose.models.friendRequest || mongoose.model("friendRequest", friendRequestSchema);

export default FriendRequestModel;