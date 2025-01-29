"use client";
import React, { useState } from "react";
import { postTodo } from "./actions";
import Link from "next/link";

const Page = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const submitForm = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postTodo({
        title: title,
        completed: isCompleted,
      });
      setLoading(false);
      console.log(res);
      console.log({ title, isCompleted });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Task Form
        </h1>
        <form onSubmit={submitForm} method="post">
          <div className="mb-4">
            <label
              htmlFor="task"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Task Title
            </label>
            <input
              type="text"
              id="task"
              name="task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="completed"
              checked={isCompleted}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="completed"
              className="ml-2 text-gray-700 text-sm font-medium"
            >
              Completed
            </label>
          </div>

          <div className="flex justify-center mt-6">
            <button
              disabled={loading}
              type="submit"
              className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {/* show  all todos page */}
      <div className="mt-4">
        <Link href="/todo" className="text-indigo-600 hover:underline">
          Show all tasks
        </Link>
      </div>
    </div>
  );
};

export default Page;
