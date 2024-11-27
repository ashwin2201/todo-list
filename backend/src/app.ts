import "dotenv/config";
import express from "express";
// import TodoModel from "./models/todo";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World");
})

export default app;