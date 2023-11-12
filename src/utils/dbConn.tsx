import mongoose, { ConnectOptions, Mongoose } from "mongoose";

interface CustomGlobal {
    mongoose: {
        conn: Mongoose | null | undefined;
        promise: Promise<Mongoose | undefined> | null;
    };
}

declare const global: CustomGlobal;

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

let cached: { conn: Mongoose | null | undefined; promise: Promise<Mongoose | undefined> | null } =
    global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default dbConnect;
