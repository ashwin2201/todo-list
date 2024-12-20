import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import todosRoutes from "./routes/todos";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev")); // prints out all requests which is nice to see
app.use(express.json()); // can now send json data to server

app.use("/api/todos", todosRoutes) // goes into routes if it matches this endpoint
// then checks all routes in router

app.use((req, res, next) => { // passing in a handler function
    next(createHttpError(404, "Endpoint not found")); 
    // next passes control to next function
    // it does this because we have not ended the req,res cycle
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    // error handling middleware functions always take 4 args
    // must have next as 4th argument to maintain signature
    console.log(err);
    let errorMessage = "An unkown error occurred";
    let statusCode = 500;
    if (isHttpError(err)) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ error: errorMessage }); 
    // ended req,res cycle
}) // error handler amd called every time the app receives a request
// application level middleware

export default app;