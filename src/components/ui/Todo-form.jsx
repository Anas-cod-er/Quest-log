"use client";

import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "../../../actions/todo-action";
import { toast } from "sonner";

export const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const mutation = useMutation({
    mutationFn:(data)=>addTodo(data),
    onSuccess:()=>{
      // todo: invalidation
      toast.success("Todo added successfully")
    },
    onError:(error)=>{
      toast.error("failed to add todo")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({title},{
      onSuccess:()=>{
        setTitle("")
      }
  })
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <Input
        type="text"
        value={title}
        placeholder="Add a new Task"
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
        disabled={mutation.isPending}
      />
      <Button type="submit">
        <Plus size={20} className="mr-2" />
        {
          mutation.isPending ? "adding" : "Add"
        }
      </Button>
    </form>
  );
};
