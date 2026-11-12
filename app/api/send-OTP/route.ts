import transporter from "@/app/src/Utils/nodemailerTransporter.utils";
import generateOTP from "@/app/src/Utils/registrationOTPCreationFunc";
import { NextRequest, NextResponse } from "next/server";
import RegisterOTPModel from "@/app/src/Models/registerOTP";
import main from "@/app/src/lib/mongooseConnection";
import { sendRegisterOTP } from "@/app/Email Templates/otpTemplates";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();
        console.log(email)
        const otp = Number(generateOTP());
        const otpObject = {
            email, otp
        }

        const saveOTP = await RegisterOTPModel.create(otpObject);

        if (saveOTP.email) {
            const emailSendingResponse = await sendRegisterOTP(otpObject);

            if (emailSendingResponse.success) {
                return NextResponse.json({
                    success: true,
                    message: "OTP is sent to the user!",
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Something went wrong while sending the OTP!",
                    response: emailSendingResponse
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong while sending the OTP!",
                response: saveOTP
            })
        }

        // console.log("Saving OTP response: ", saveOTP)
    } catch (err: unknown) {
        console.error("Error sending otp: ", err);

        const errorMessage = err instanceof Error ? err.message : String(err);

        return NextResponse.json({
            success: false,
            message: "Something went wrong while sending OTP",
            error: errorMessage
        })
    }
}