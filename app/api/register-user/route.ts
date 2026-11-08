import UserModel from "@/app/src/Models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const userRegistrationPayload = await req.json();
        const password = userRegistrationPayload.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const registerableUserPayload = {...userRegistrationPayload, password: hashedPassword};

        const isUserExists = await UserModel.findOne({ email: userRegistrationPayload.email });

        if (isUserExists) {
            return NextResponse.json({
                success: false,
                message: "User already registered!",
                status: 204,
                userInfo: isUserExists
            })
        } else {
            const userRegisteringRequest = await UserModel.create(registerableUserPayload);

            return NextResponse.json({
                success: true,
                message: "User is registered successfully!",
                status: 200,
                userInfo: userRegisteringRequest
            })
        }
    } catch (error) {
        console.error(error)
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong while registering!",
            errorMessage
        })
    }
}