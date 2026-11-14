import FriendRequestModel from "@/app/src/Models/friendRequest";
import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {

        const friendRequestObject = await req.json();

        const isRequestAlreadyExists = await FriendRequestModel.findOne({
            $and: [
                { sender: friendRequestObject.requestSender },
                { reciever: friendRequestObject.requestReciever }
            ]
        })

        if (isRequestAlreadyExists) {
            console.log("request already exists: ", isRequestAlreadyExists);

            return NextResponse.json({
                message: "Friend request was sent already!",
                success: true,
                status: 204,
            })
        }

        const saveFriendRequest = await FriendRequestModel.create({
            sender: friendRequestObject.requestSender,
            reciever: friendRequestObject.requestReciever
        });

        if (saveFriendRequest) {
            return NextResponse.json({
                message: "Friend request sent!",
                success: true,
                status: 201,
            })
        }

        return NextResponse.json({
            success: false,
            message: "Friend request is not sent!",
            status: 304,
            response: saveFriendRequest
        })
    } catch (error) {
        console.log(error);
        const errorMessage = error instanceof Error ? error.message : String(error);

        return NextResponse.json({
            success: false,
            status: 405,
            error_message: errorMessage,
            error,
        })
    }
}