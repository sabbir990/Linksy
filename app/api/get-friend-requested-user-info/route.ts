import UserModel from "@/app/src/Models/Users";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const params = await req.nextUrl.searchParams;
        const senderEmail = params.get("sender");

        if (!senderEmail) {
            return NextResponse.json({
                message: "Something went wrong! Make sure that the user exists!",
                status: 402,
                success: false
            })
        }

        const userDetails = await UserModel.findOne({email: senderEmail});

        return NextResponse.json({
            message: "User found!",
            success: true,
            status: 201,
            user: userDetails
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