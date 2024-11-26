"use client"

import AddTodoForm from "@/components/AddTodoForm";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import TodoSummary from "@/components/TodoSummary";
import { todoData } from '@/data/todos'
import useTodos from "@/hooks/useTodos";
import { Todo } from "@/types/todo";
import { useState, useEffect } from 'react'

function Page() {
  const {
    todos, addTodo, setTodoCompleted, deleteTodo, deleteAllCompleted
  } = useTodos();

  return (
    <div className="flex flex-col">
      <Header />
      <AddTodoForm onSubmit={addTodo}/>
      <TodoList 
        todos={todos} 
        onCompletedChange={setTodoCompleted}
        onDelete={deleteTodo}
      />
      <TodoSummary 
        todos={todos}
        deleteAllCompleted={deleteAllCompleted}
      />
    </div>
  )
  }

export default Page