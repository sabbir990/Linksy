import mongoose from "mongoose";

export interface SessionType {
    userId: string,
    hashCookie: string,
    expiresAt: Date,
}

const sessionSchema = new mongoose.Schema<SessionType>({
    userId: {type: String, required: true},
    hashCookie: {type: String, required: true},
    expiresAt: {type: Date, required: true, expires: 0},
}, {timestamps: true})

const SessionModel = mongoose.models.sessions || mongoose.model("sessions", sessionSchema);

export default SessionModel;