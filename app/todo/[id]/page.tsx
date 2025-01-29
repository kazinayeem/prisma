"use client";

import { getTodo } from "@/app/actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
export default function Page() {
  const searchParams = useParams();
  const [todo, setTodo] = useState<Todo>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const loadTodo = async () => {
      setLoading(true);
      const res = await getTodo(searchParams.id as string);
      if (res) {
        setLoading(false);
        setTodo(res);
      }
    };
    loadTodo();
  }, [searchParams]);

  //   loading check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-col flex items-center justify-center bg-gray-100">
      {/* show todo information and edit and del button */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Task
        </h1>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-800">{todo?.title}</span>
          <span
            className={`text-sm text-${todo?.completed ? "green" : "red"}-500`}
          >
            {todo?.completed ? "Completed" : "Not Completed"}
          </span>
        </div>
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
