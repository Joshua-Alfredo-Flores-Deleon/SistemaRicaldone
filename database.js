import mongoose from "mongoose";
import {config} from "./config.js";

mongoose.connect(config.db.URL);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database connected");
});

connection.on("disconnected", (error) => {
    console.log("Database disconnected: " + error);
});

connection.on("error", (err) => {
    console.log("Database error: " + err);
});

export default connection;