import { RequestHandler } from "express";
import TodoModel from "../models/todo";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getTodos: RequestHandler = async (req, res, next) => {
    try {
        const todos = await TodoModel.find().exec(); 
        // async await syntax is syntactic sugar
        // by default above cannot be used in top level command
        res.status(200).json(todos);
    }
    catch (err) { // catch block does not crash the whole app when an error is thrown
        next(err); // next middleware catches all errors
    }
} 

export const getTodo: RequestHandler = async(req, res, next) => {
    const todoId = req.params.todoId
 
    try {
        // check if id is a valid mongoose/mongodb id
        if (!mongoose.isValidObjectId(todoId)) {
            throw createHttpError(400, "Invalid todo id");
        }
        const todo = await TodoModel.findById(todoId).exec();
        // check if id is found, if not there in db return 404
        if (!todo) {
            throw createHttpError(404, "Todo not found");
        }
        res.status(200).json(todo);
    }
    catch (err) {
        next(err);
    }
}

interface CreateTodoBody {
    title?: string,
    completed?: boolean
}

export const createTodos: RequestHandler<unknown, unknown, CreateTodoBody, unknown> = async (req, res, next) => {
    // unknown is safer than using any type
    const title = req.body.title;
    const completed = req.body.completed;
     
    try {
        if (!title) {
            throw createHttpError(400, "Note must have a tile")
        }
        const newTodo = await TodoModel.create({
            title: title,
            completed: completed
        })
        res.status(201).json(newTodo);
    } catch (err) {
        next(err);
    }
}

interface UpdateNoteParams {
    todoId: string,
}

interface UpdateNoteBody {
    title?: string,
    completed?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const todoId = req.params.todoId;
    const newTitle = req.body.title;
    const newTodoCompleted = req.body.completed;
    try {
        const newTodo = await TodoModel.findByIdAndUpdate(todoId, { title: newTitle, completed: newTodoCompleted }, {new: true});
        // TODO: update this to include error handling
        res.status(200).json(newTodo);
    } catch (err) {
        next(err);
    }
}

export const deleteNote: RequestHandler = async(req, res, next) => {
    const todoId = req.params.todoId;
    try {
        if (!mongoose.isValidObjectId(todoId)) {
            throw createHttpError(400, "Invalid todo id");
        }
        const deletedTodo = await TodoModel.findByIdAndDelete(todoId).exec()
        if (!deletedTodo) {
            throw createHttpError(404, "Todo not found");
        }
        res.sendStatus(204); // no json body so you send status
    } catch (err) {
        next(err);
    }
}
