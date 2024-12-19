import { Todo } from "@/types/todo";

// create a wrapper to handle errors in the fe

async function fetchData(input: RequestInfo, init?:RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        throw Error(errorBody)
    }
}

export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetchData("http://localhost:5000/api/todos", { method: "GET"});
    return response.json();
}

export interface TodoInput {
    title: string,
    completed: boolean
}

export async function createTodo(todo: TodoInput) {
    const response = await fetchData("http://localhost:5000/api/todos", 
    { 
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json",
          },
    });
    return response.json();
}