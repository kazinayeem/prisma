import Link from "next/link";
import { getTodos } from "../actions";

export default async function page() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* show todos  */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Task List
        </h1>
        <ul className="space-y-2 space-x-2">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2 flex justify-between">
              <Link
                href={`todo/${todo.id}`}
                //   link to todo page
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
            </li>
          ))}
        </ul>
      </div>

      {/* go to todo add page */}
      <div className="mt-4 ">
        <Link href="/" className="text-indigo-600 hover:underline">
          Add a new task
        </Link>
      </div>
    </div>
  );
}
