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
  const todosSorted = todos.sort((a,b) => { // no side effects so its ok to execute this on every re render
    if (a.completed == b.completed) {
      return a.id - b.id;
    }
    else {
      if (a.completed) {
        return 1;
      }
      else {
        return -1;
      }
    }
  })

  return (
    <>
      <div>
        {todosSorted.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onCompletedChange={onCompletedChange} // prop drilling to todoitem
            onDelete={onDelete}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          No todos yet. Add a new one above.
        </p>
      )}
    </>
    
  )
}

export default TodoList