import RegisterOTPModel from "@/app/src/Models/registerOTP";
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {
        const { email, otp } = await req.json();

        const isOtpExists = await RegisterOTPModel.find({ email }).sort({ createdAt: -1 });

        if (isOtpExists) {
            if (isOtpExists[0].otp == otp) {
                return NextResponse.json({
                    success: true,
                    message: "OTP matched!",
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "OTP is not matching! It might be expired or wrong!",
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "OTP is expired!",
                response: isOtpExists
            })
        }

    } catch (error) {
        console.log("error: ", error);

        const errorMessage = error instanceof Error ? error.message : String(error)
        return NextResponse.json({
            success: false,
            errorMessage
        })
    }


}