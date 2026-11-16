import FriendRequestModel from "@/app/src/Models/friendRequest";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {

        const params = await req.nextUrl.searchParams;
        const userEmail = params.get("userEmail");

        if (!userEmail) {
            return NextResponse.json({
                message: "User not found! Please log in first!",
                success: false,
                status: 402
            })
        }

        const friendRequests = await FriendRequestModel.find({reciever: userEmail});

        return NextResponse.json({
            message: "All friend request are here!",
            success: true,
            status: 201,
            friendRequests
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