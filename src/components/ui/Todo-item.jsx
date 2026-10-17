"use client";

import React from "react";
import { Check, Trash2, Loader2 } from "lucide-react";
import { Button } from "./button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodo, deleteTodo } from "../../../actions/todo-action";
import { toast } from "sonner";

export const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: () => toggleTodo(todo._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update todo");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete todo");
    },
  });

  const isUpdating = toggleMutation.isPending || deleteMutation.isPending;

  return (
    <div
      className={`flex items-center justify-between p-3.5 bg-card border rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 ${
        todo.completed ? "opacity-60 bg-muted/40" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
        <button
          type="button"
          onClick={() => toggleMutation.mutate()}
          disabled={isUpdating}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
            todo.completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-slate-300 dark:border-zinc-700 hover:border-primary"
          }`}
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        >
          {toggleMutation.isPending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : todo.completed ? (
            <Check size={12} className="stroke-[3]" />
          ) : null}
        </button>
        <span
          className={`text-sm truncate select-none transition-all ${
            todo.completed
              ? "line-through text-muted-foreground"
              : "text-foreground font-medium"
          }`}
        >
          {todo.title}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteMutation.mutate()}
        disabled={isUpdating}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 h-8 w-8 cursor-pointer"
        title="Delete task"
        aria-label="Delete task"
      >
        {deleteMutation.isPending ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Trash2 size={15} />
        )}
      </Button>
    </div>
  );
};
