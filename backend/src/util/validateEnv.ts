import { cleanEnv, port, str } from "envalid"; // in brackets
import "dotenv/config";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
})
