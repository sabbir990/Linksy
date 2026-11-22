import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";
import { VscCommentUnresolved } from "react-icons/vsc";

export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ email: string }> }
) => {
    try {

        const { email } = await params;
        const isUserExists = await UserModel.findOne({ email }).select("-friends");

        if (!isUserExists) {
            return NextResponse.json({
                success: false,
                message: "This user doesn't exist anymore...",
                status: 304
            })
        }

        return NextResponse.json({
            success: true,
            message: "User found! Here's the userInfo.",
            status: 201,
            friend: isUserExists
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