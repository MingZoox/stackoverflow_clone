import mongoose from "mongoose";
import env from "./env.config";

mongoose.connect(env.DB_URI as string);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Database connection successful");
});

db.on("error", () => {
    console.log("Error in mongodb connection");
});

export default mongoose;
