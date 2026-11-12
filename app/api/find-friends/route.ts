import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextRequest) => {
    try {

        const searchBody = await req.nextUrl.searchParams;
        const searchInput = searchBody.get("usernameOrEmail");
        const isUserExists = await UserModel.find({
            $or: [
                {
                    email: {
                        $regex: searchInput,
                        $options: "i"
                    }
                },
                {
                    username: {
                        $regex: searchInput,
                        $options: "i"
                    }
                }
            ]
        }).select("-password");

        return NextResponse.json({
            success: true,
            message: "Users found",
            users: isUserExists,
            status: 201
        })

    } catch (err) {
        console.error(err);

        const errorMessage = err instanceof Error ? err.message : String(err);

        return NextResponse.json({
            status: 405,
            success: false,
            error: errorMessage
        })
    }
}