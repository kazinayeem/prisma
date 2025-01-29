"use server";

import { PrismaClient } from "@prisma/client";

interface Todo {
  title: string;
  completed: boolean;
}
const prisma = new PrismaClient();
export const postTodo = async (todo: Todo) => {
  try {
    await prisma.todo.create({
      data: {
        title: todo.title,
        completed: todo.completed,
      },
    });

    return "Todo posted successfully";
  } catch (error) {
    console.error("Error posting todo:", error);
    throw error;
  }
};

// show todos
export const getTodos = async () => {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};
// get a single todo
export const getTodo = async (id: string) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return todo;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};
