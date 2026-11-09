import { randomBytes, createHash } from "crypto";

export const generateCookieHash = () => {
    const randomCookie = randomBytes(32).toString("hex");

    const tokenHash = createHash("sha256").update(randomCookie).digest("hex");

    return {randomCookie, tokenHash};
}