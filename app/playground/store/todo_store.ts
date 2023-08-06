import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface ITodo {
  id: string;
  activity: string;
  isCompleted: boolean;
  createdAt: number;
  updatedAt?: number | null;
}

interface TodoState {
  todos: ITodo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  changeIsComplete: (id: string) => void;
}

const todoStore = create<TodoState>()((set) => ({
  todos: [],
  addTodo: (title: string) => {
    return set((state) => ({
      todos: [
        ...state.todos,
        {
          id: uuidv4(),
          activity: title,
          isCompleted: false,
          createdAt: Date.now(),
          updatedAt: null,
        },
      ],
    }));
  },
  removeTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  changeIsComplete: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    })),
}));

export default todoStore;
