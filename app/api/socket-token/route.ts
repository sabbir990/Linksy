import { getCurrentUserServer } from "@/app/src/Utils/getCurrentUserServer";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {

        const currentUser = await getCurrentUserServer();

        console.log("Current user:", currentUser);
        console.log("Current user type:", typeof currentUser);
        console.log("Current user keys:", currentUser ? Object.keys(currentUser) : null);

        const userId = currentUser?.user?.userId;

        if (!userId) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                { status: 401 }
            );
        }

        const secret = process.env.SOCKET_TOKEN_SECRET;

        if (!secret) {
            throw new Error("Socket token secret is missing!");
        }

        const token = jwt.sign(
            {
                sub: userId,
            },
            secret,
            {
                algorithm: "HS256",
                expiresIn: "5m",
                issuer: "linksy-api",
                audience: "linksy-socket-server",
            }
        );

        return NextResponse.json({
            success: true,
            token,
        });
    } catch (error) {
        console.log("Socket token generation error: ", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create the token!",
            },
            { status: 500 }
        );
    }
};