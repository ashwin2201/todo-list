import { todoData } from "@/data/todos";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import * as TodosApi from "../network/todos_api";


function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]) /*() => {
    const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]"); // TODO: fetch from server instead
        return savedTodos.length > 0 ? savedTodos : todoData;
    });*/
    
    useEffect(() => {
        async function loadTodos() {
            try {
                const todos = await TodosApi.fetchTodos();
                setTodos(todos);
            } catch (err) {
                console.error(err);
                alert(err);
            }
        }
        loadTodos();
    }, []); // executes one time
    
    /*
    useEffect(() => { // useeffect as this is an expensive side effect
        localStorage.setItem("todos", JSON.stringify(todos)) 
    }, [todos]) */

    function setTodoCompleted(id: number, completed: boolean) {
    // alert(`Todo with id ${id} is ${completed ? 'completed' : 'not completed'}`)
        setTodos((prevTodos) => 
            prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
        ); // passing arrow function, everything returned is the new state of todos
    }   // map returns completely new array and does not modify the existing array.
    
    function addTodo(title: string) {
        return;
        /*
        setTodos(prevTodos => [ // passing in prevTodos as an argument to the cb
                                // this is to ensure that it doesnt copy stale todo state
            {
            id: prevTodos.length + 1,
            title,
            completed: false
            },
            ...prevTodos,
        ]); */
    }
    
    function deleteTodo(id: number) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    }

    function deleteAllCompleted() {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
    }

    return {
        todos, setTodoCompleted, addTodo, deleteTodo, deleteAllCompleted
    }
}

export default useTodos