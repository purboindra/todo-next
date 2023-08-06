"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import todoStore from "./store/todo_store";

export default function Playground() {
  const store = todoStore();
  const { todos, addTodo, removeTodo, changeIsComplete } = store;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      activity: "",
      isComplete: false,
      createdAt: Date.now(),
      updatedAt: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Data", data);
    addTodo(data.activity);
  };

  const changeStatusIsComplete = (id: string) => {
    changeIsComplete(id);
  };

  const deleteTodo = (id: string) => {
    removeTodo(id);
  };

  return (
    <div className="flex flex-col px-12 py-8 items-center ">
      <h1>Hello, what would you to do today?</h1>
      <div className="flex flex-col items-center mt-4">
        <form className="flex flex-row gap-4 items-start ">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="What would yo to do?"
              className="py-1 px-2 rounded-md border border-neutral-500 text-sm font-medium text-neutral-700"
              {...register("activity", { required: true })}
            />
            {errors.activity?.type === "required" && (
              <p className="text-sm font-normal text-rose-500">
                Ooops... you forgot fill the activity yet
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="h-8 py-1 px-5 bg-blue-500 rounded-md hover:bg-blue-700 text-sm font-semibold text-white"
          >
            Let&apos;s Go!
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-5">
        {todos.map((item) => (
          <div
            key={item.id}
            className="items-start justify-start flex flex-row "
          >
            <p className="text-md font-semibold text-neutral-700 mr-5">
              {item.activity}
            </p>
            <button
              onClick={() => changeStatusIsComplete(item.id)}
              className="w-fit py-2 px-4 rounded-md bg-blue-600 text-sm font-medium text-white items-center"
            >
              {item.isCompleted ? "Selesai" : "Belum Selesai"}
            </button>
            <button
              onClick={() => deleteTodo(item.id)}
              className="w-fit ml-2 py-2 px-4 rounded-md bg-rose-600 text-sm font-medium text-white items-center"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
