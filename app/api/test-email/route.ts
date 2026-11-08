import transporter from "@/app/src/Utils/nodemailerTransporter.utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    try{
        await transporter.verify();

        return NextResponse.json({
            success: true,
            message: "GMAIL SMTP connection successful!"
        })
    }catch(err){
        return NextResponse.json({
            success: false,
            message: "Gmail SMTP connection failed.",
            error: err
        })
    }
}