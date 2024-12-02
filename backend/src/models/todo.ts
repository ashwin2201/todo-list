import { InferSchemaType, model, Schema } from "mongoose";

const todoSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
}, { timestamps: true });

type Todo = InferSchemaType<typeof todoSchema>;

export default model<Todo>("Todo", todoSchema);