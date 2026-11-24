
import { cookies } from "next/headers";
import crypto from "node:crypto";

import SessionModel from "@/app/src/Models/session";
import UserModel from "@/app/src/Models/Users";
import main from "@/app/src/lib/mongooseConnection";

export const getCurrentUserServer = async () => {
    try {
        await main();

        const cookieStore = await cookies();

        const loginCookie = cookieStore.get("linksy_cookie")?.value;

        if (!loginCookie) {
            return null;
        }

        // Hash the original cookie
        const tokenHash = crypto
            .createHash("sha256")
            .update(loginCookie)
            .digest("hex");

        // Find the corresponding session
        const session = await SessionModel.findOne({
            hashCookie: tokenHash,
            expiresAt: { $gt: new Date() }
        });

        if (!session) {
            return null;
        }

        // Retrieve the user associated with the session
        const user = await UserModel.findById(session.userId)
            .select("-password");

        if (!user) {
            return null;
        }

        return { user };

    } catch (error) {
        console.error("Server authentication error:", error);
        return null;
    }
};
