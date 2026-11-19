import FriendRequestModel from "@/app/src/Models/friendRequest";
import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";


// Rejecting friend request...

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json();
        const senderEmail = body.friendEmail;
        // const selfEmail = body.selfEmail;

        if(!senderEmail){
            return NextResponse.json({
                message: "Something went wrong. No sender email found!",
                status: 402,
                success: false
            })
        }

        const rejectFriendRequest = await FriendRequestModel.updateOne({sender: senderEmail}, {
            $set: {
                status: "rejected"
            }
        })

        // await UserModel.updateOne({email: selfEmail}, {
        //     $push: {
        //         friends: {
        //             friendEmail: senderEmail,
        //             status: "rejected",
        //             actionDate: Date.now()
        //         }
        //     }
        // })

        return NextResponse.json({
            message: "Friend request rejected successfully!",
            success: false,
            status : 201,
            response: rejectFriendRequest
        })

    } catch (err) {
        console.error(err);

        const errorMessage = err instanceof Error ? err.message : String(err);

        return NextResponse.json({
            success: false,
            message: "Something went wrong!",
            status: 403,
            error: errorMessage
        })
    }
}