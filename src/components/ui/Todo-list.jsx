"use client";

import React from "react";
import { TodoItem } from "./Todo-item";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../../actions/todo-action";
import { Loader2 } from "lucide-react";

const Todolist = () => {
  const {
    data: todos,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-destructive text-sm">
        Failed to load todos: {error.message || "Unknown error"}
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground text-sm">
        No tasks yet. Add one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default Todolist;