import FriendRequestModel from "@/app/src/Models/friendRequest";
import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";
import { date } from "zod";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json();
        const selfEmail = body.selfEmail;
        const friendEmail = body.friendEmail;
        const isFriendExists = await UserModel.findOne({ email: friendEmail });

        if (!isFriendExists) {
            return NextResponse.json({
                message: "Friend does not exist anymore!",
                success: false,
                status: 302,
            })
        }

        // adding Friend to the self account

        const addFriend = await UserModel.updateOne({ email: selfEmail }, {
            $push: {
                friends: {
                    friendEmail: friendEmail,
                    status: "accepted",
                    actionDate: Date.now()
                }
            }
        })

        // Adding friend to the friend account too
        await UserModel.updateOne({ email: friendEmail }, {
            $push: {
                friends: {
                    friendEmail: selfEmail,
                    status: "accepted",
                    actionDate: Date.now()
                }
            }
        })

        // Deleting friend request.
        await FriendRequestModel.deleteOne({sender: friendEmail, reciever: selfEmail});

        return NextResponse.json({
            message: "Friend request is accepted!",
            success: true,
            status: 201,
            requestAcceptResponse: addFriend
        })
    } catch (err) {
        console.error(err);

        const errorMessage = err instanceof Error ? err.message : String(err);

        return NextResponse.json({
            success: true,
            message: "Something went wrong!",
            status: 403,
            error: errorMessage
        })
    }
}