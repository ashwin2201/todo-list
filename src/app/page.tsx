"use client"

import AddTodoForm from "@/components/AddTodoForm";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import { todoData } from '@/data/todos'
import { useState } from 'react'

function Page() {
  const [todos, setTodos] = useState(todoData);

  function setTodoCompleted(id: number, completed: boolean) {
    // alert(`Todo with id ${id} is ${completed ? 'completed' : 'not completed'}`)
      setTodos((prevTodos) => 
        prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      ); // passing arrow function, everything returned is the new state of todos
    }   // map returns completely new array and does not modify the existing array.
  
  function addTodo(title: string) {
    setTodos(prevTodos => [
      {
        id: prevTodos.length + 1,
        title,
        completed: false
      },
      ...prevTodos,
    ]);
  }

  return (
    <div className="flex flex-col">
      <Header />
      <AddTodoForm onSubmit={addTodo}/>
      <TodoList todos={todos} onCompletedChange={setTodoCompleted}/>
    </div>
  )
  }

export default Page