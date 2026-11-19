import UserModel, { FriendType } from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const params = await req.nextUrl.searchParams;
        const userEmail = params.get("userEmail");
        const userExists = await UserModel.findOne({ email: userEmail });

        if (!userExists) {
            return NextResponse.json({
                success: false,
                message: "User doesn't exist!",
                status: 405,
            })
        }

        const allFriends = userExists.friends;
        const allFriendsInDetails = await Promise.all(
            allFriends.map(async (friend: FriendType) => {
                const wholeDetails = await UserModel.findOne({ email: friend.friendEmail }).select("-password").select("-friends");
                return wholeDetails;
            })
        )

        console.log("All Friends: ", allFriendsInDetails);

        return NextResponse.json({
            message: "Successfully fetched all the friends.",
            success: true,
            status: 201,
            allFriends: allFriendsInDetails
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