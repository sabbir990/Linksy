import main from "@/app/src/lib/mongooseConnection";
import SessionModel from "@/app/src/Models/session";
import UserModel from "@/app/src/Models/Users";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import mongoose from 'mongoose'

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await main();
        const allCookies = await cookies();
        const sessionCookie = allCookies.get("linksy_cookie")?.value || null;

        if (sessionCookie) {

            const hashSessionToken = createHash("sha256").update(sessionCookie).digest("hex");
            const isSessionExists = await SessionModel.findOne({ hashCookie: hashSessionToken });

            if (isSessionExists?.hashCookie) {

                const findUserById = await UserModel.findOne(new mongoose.Types.ObjectId(isSessionExists.userId));

                return NextResponse.json({
                    message: "User is still logged in with their session!",
                    user: findUserById,
                    status: 201
                })
            }

            return NextResponse.json({
                success: false,
                message: "Session expired! Please log in again!",
                status: 402
            })

        }

        return NextResponse.json({
            success: false,
            message: "No session cookies found!",
            status: 403
        })

    } catch (err) {
        console.error(err);

        const errorMessage = err instanceof Error ? err.message : String(err);

        return NextResponse.json({
            message: "testing...",
            error: errorMessage
        })
    }
}