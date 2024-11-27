import env from "./util/validateEnv";
import mongoose from "mongoose";
import app from "./app";

const port = env.PORT; // server does not start unless port is defined as a number

mongoose.connect(env.MONGO_CONNECTION_STRING) // guaranteed to be a string
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("server running on port: " + port);
        })
    })
    .catch(console.error);

