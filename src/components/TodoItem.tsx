import { Todo } from '@/types/todo';
import React from 'react'

interface TodoItemProps {
    todo: Todo;
    onTodoItemCompletedChange: (id: number, completed: boolean) => void;
}

function TodoItem({ todo, onTodoItemCompletedChange }: TodoItemProps) {
  return (
    <div>
        <label className="my-2 flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50">
            <input type="checkbox" 
                className="scale-125"
                checked={todo.completed}
                onChange={(e) => onTodoItemCompletedChange(todo.id, e.target.checked)}
                // callback fn onchange passed up to parent
            />
            <span className={todo.completed ? "line-through text-gray-400" : ""}>
                {todo.title}
            </span>
        </label>
    </div>
  )
}

export default TodoItem