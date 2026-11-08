import UserModel from "@/app/src/Models/Users";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {

        const { email, password } = await req.json();
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            const compairPassword = await bcrypt.compare(password, userExists.password);

            if (compairPassword) {
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