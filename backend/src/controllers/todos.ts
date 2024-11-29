import { RequestHandler } from "express";
import TodoModel from "../models/todo";

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
        const todo = await TodoModel.findById(todoId).exec();
        res.status(200).json(todo);
    }
    catch (err) {
        next(err);
    }
}

export const createTodos: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    
    try {
        const newTodo = await TodoModel.create({
            title: title
        })
        res.status(201).json(newTodo);
    } catch (err) {
        next(err);
    }
}