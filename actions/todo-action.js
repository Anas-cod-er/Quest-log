"use server";

import { connectDB } from "@/lib/db";
import Todo from "../models/todo";
import { todoSchema } from "../schemas/todo-schema";


export async function addTodo(data) {
    await connectDB();
    const validatedFields = todoSchema.safeParse(data)

    if (!validatedFields.success){
        return{error:"Invalid Fields"}
    }
    try{
        const newTodo = await Todo.create(validatedFields.data)
        return JSON.parse(JSON.stringify(newTodo))
    }
    catch(error){
        console.error("Failed to create todo:", error)
        return {error: "Failed to create todo"}
    }
}