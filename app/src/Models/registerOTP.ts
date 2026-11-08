import mongoose from "mongoose";

interface RegisterOTPType{
    email: string,
    otp: number,
    expiresAt: Date;
}

const registerOTPSchema = new mongoose.Schema<RegisterOTPType>({
    email: {type: String, required: true, lowercase: true, trim: true},
    otp: {type: Number, required: true},
    expiresAt: {type: Date, default: () => new Date(Date.now() + 5 * 60 * 1000), expires: 0}
}, {timestamps: true});

const RegisterOTPModel = mongoose.models.registerotps || mongoose.model("registerotps", registerOTPSchema);

export default RegisterOTPModel;