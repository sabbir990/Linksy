import UserModel from "@/app/src/Models/Users";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { generateCookieHash } from "@/app/src/Utils/cookieGenerator";
import main from "@/app/src/lib/mongooseConnection";
import SessionModel, { SessionType } from "@/app/src/Models/session";
import { date } from "zod";
import { cookies } from "next/headers";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {

        await main();

        const { email, password } = await req.json();
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            const compairPassword = await bcrypt.compare(password, userExists.password);

            if (compairPassword) {
                const { randomCookie, tokenHash } = generateCookieHash();
                const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                const sessionObject: SessionType = {
                    userId: userExists._id,
                    hashCookie: tokenHash,
                    expiresAt: sessionExpiresAt
                }

                const isSessionExists = await SessionModel.findOne({ userId: userExists._id });

                if (isSessionExists) {
                    const previousSessionDeleteResponse = await SessionModel.deleteOne({ userId: userExists._id });
                    const newSessionAddResponse = await SessionModel.create(sessionObject);

                    const newCookies = await cookies();

                    newCookies.set("linksy_cookie", randomCookie, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        expires: sessionExpiresAt,
                        path: "/"
                    })

                    return NextResponse.json({
                        success: true,
                        message: "Login Successful!",
                        status: 200
                    })
                }

                const sessionAddRespnse = await SessionModel.create(sessionObject);

                const allCookes = await cookies();

                allCookes.set("linksy_cookie", randomCookie, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    expires: sessionExpiresAt,
                    path: "/"
                })

                return NextResponse.json({
                    status: 200,
                    success: true,
                    message: "Login successful!",
                    user: userExists
                })
            } else {
                return NextResponse.json({
                    status: 401,
                    success: false,
                    message: "Login failed! Please recheck your password!",
                })
            }
        } else {
            return NextResponse.json({
                status: 402,
                success: false,
                message: "This user is not registered! Please register first!"
            })

        }

    } catch (error) {
        console.error(error)
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while registering!",
            errorMessage,
            status: 405
        })
    }
}