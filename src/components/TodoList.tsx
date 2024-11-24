import { todoData } from '@/data/todos'
import { useState } from 'react'
import TodoItem from './TodoItem'

function TodoList() {
  //const [todos, setTodos] = useState(todoData);

  function setTodoCompleted(id: number, completed: boolean) {
    alert(`Todo with id ${id} is ${completed ? 'completed' : 'not completed'}`)
  }

  return (
    <>
      {
        todoData.map(todo => (
          <TodoItem 
            todo={todo}
            onCompletedChange={setTodoCompleted}
          />
        ))
      }
    </>
    
  )
}

export default TodoList