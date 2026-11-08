import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_URI) {
    throw new Error("MONGODB_CONNECTION_STRING is missing!");
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
    global.mongooseCache ??= {
        conn: null,
        promise: null
    };

const main = async () => {
    // 1. Reuse an existing connection
    if (cached.conn) {
        return cached.conn;
    }

    // 2. Create a connection only if one isn't already in progress
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully!");

        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
};

export default main;