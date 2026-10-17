import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGO_URI) {
      console.warn("MONGO_URI is not defined in environment variables");
      return null;
    }

    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}