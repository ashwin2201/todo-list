import { useState } from "react"

interface AddTodoFormProps {
    onSubmit: (title: string) => void;
}

function AddTodoForm({ onSubmit }: AddTodoFormProps) {
    const  [input, setInput] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // react form event so need e
        e.preventDefault();

        if (!input.trim()) return;

        onSubmit(input);
        setInput("");
    }

    return (
        <form action="flex grow" onSubmit={handleSubmit}>
            <div className="flex mt-4 mb-8">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What needs to be done?"
                    className="grow rounded-s-md border border-gray-400 p-2"
                />
                <button 
                    type="submit"
                    className="w-20 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
                >
                    Add
                </button>
            </div>
            
        </form>
    )
}

export default AddTodoForm