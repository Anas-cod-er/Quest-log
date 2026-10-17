"use client";

import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Plus, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../../../actions/todo-action";
import { toast } from "sonner";

export const TodoForm = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo added successfully");
      setTitle("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add todo");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error("Please enter a task");
      return;
    }
    mutation.mutate({ title: trimmedTitle });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={title}
        placeholder="Add a new task..."
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
        disabled={mutation.isPending}
      />
      <Button type="submit" disabled={mutation.isPending || !title.trim()}>
        {mutation.isPending ? (
          <Loader2 size={18} className="animate-spin mr-1" />
        ) : (
          <Plus size={18} className="mr-1" />
        )}
        {mutation.isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
};
