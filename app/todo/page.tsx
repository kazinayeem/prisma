"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteTodo, getTodos } from "../actions";

export default function Page() {
  const [todos, setTodos] = useState<
    { id: string; title: string; completed: boolean }[]
  >([]);

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const deleteTodoHandeler = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Task List
        </h1>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2 flex justify-between">
              <Link
                href={`/todo/${todo.id}`}
                className="text-gray-800 hover:underline"
              >
                {todo.title}
              </Link>

              <span
                className={`text-sm text-${
                  todo.completed ? "green" : "red"
                }-500`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </span>

              <button
                onClick={() => deleteTodoHandeler(todo.id)}
                className="text-red-500 hover:underline "
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Link href="/add-todo" className="text-indigo-600 hover:underline">
          Add a new task
        </Link>
      </div>
    </div>
  );
}
