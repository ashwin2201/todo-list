import { Todo } from '@/types/todo';
import { Trash2 } from 'lucide-react';
import React from 'react'

interface TodoItemProps {
    todo: Todo;
    // TODO for backend: need to change todo model to conform to backend
    onCompletedChange: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, onCompletedChange, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-1">
        <label className="my-2 flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50 grow">
            <input type="checkbox" 
                className="scale-125"
                checked={todo.completed}
                onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
                // callback fn onchange passed up to parent
            />
            <span className={todo.completed ? "line-through text-gray-400" : ""}>
                {todo.title}
            </span>
        </label>
        <button 
            onClick={() => onDelete(todo.id)}
            className="p-2">
            <Trash2 size={20} className="text-gray-500"/>
        </button>
    </div>
  )
}

export default TodoItem