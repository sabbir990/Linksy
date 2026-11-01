
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_CONNECTION_STRING in .env.local");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache =
  globalWithMongoose.mongooseCache ??=
    { conn: null, promise: null };

async function main() {
  // Reuse an established connection.
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse an in-progress connection attempt.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully!");

    return cached.conn;
  } catch (error) {
    // Allow a later request to retry the connection.
    cached.promise = null;
    throw error;
  }
}

export default main;
