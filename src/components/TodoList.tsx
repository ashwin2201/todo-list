import { todoData } from '@/data/todos'
import { useState } from 'react'
import TodoItem from './TodoItem'
import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

function TodoList({ todos, onCompletedChange, onDelete }: TodoListProps) {
  const todosSorted = todos.sort()
  return (
    <>
      {
        todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onTodoItemCompletedChange={onCompletedChange} // prop drilling to todoitem
          />
        ))
      }
    </>
    
  )
}

export default TodoList