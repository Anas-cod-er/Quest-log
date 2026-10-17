"use server";

import { connectDB } from "@/lib/db";
import Todo from "../models/todo";
import { todoSchema } from "../schemas/todo-schema";

export async function addTodo(data) {
    await connectDB();
    const validatedFields = todoSchema.safeParse(data);

    if (!validatedFields.success) {
        throw new Error("Invalid Fields: Title is required (1-100 characters)");
    }
    try {
        const newTodo = await Todo.create(validatedFields.data);
        return JSON.parse(JSON.stringify(newTodo));
    } catch (error) {
        console.error("Failed to create todo:", error);
        throw new Error(error.message || "Failed to create todo");
    }
}

export async function getTodos() {
    await connectDB();

    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(todos));
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        throw new Error(error.message || "Failed to fetch todos");
    }
}

export async function toggleTodo(id) {
    await connectDB();

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        todo.completed = !todo.completed;
        await todo.save();
        return JSON.parse(JSON.stringify(todo));
    } catch (error) {
        console.error("Failed to toggle todo:", error);
        throw new Error(error.message || "Failed to toggle todo");
    }
}

export async function deleteTodo(id) {
    await connectDB();

    try {
        const deleted = await Todo.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error("Todo not found");
        }
        return JSON.parse(JSON.stringify(deleted));
    } catch (error) {
        console.error("Failed to delete todo:", error);
        throw new Error(error.message || "Failed to delete todo");
    }
}