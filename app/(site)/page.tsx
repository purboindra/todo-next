"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toast";
import { FiCheck, FiDelete } from "react-icons/fi";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

interface TodoProps {
  id: string;
  title: string;
  isComplete: boolean;
  createdAt: number;
  updatedAt?: number | null;
}

export default function Home() {
  const [todo, setTodo] = useState<TodoProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTodo, setIsLoadingTodo] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  const getAllTodo = async () => {
    try {
      setIsLoadingTodo(true);
      setTodo([]);
      const response = await axios.get("/api/todo/get");
      const getTodo = response.data.map((item: any) => ({
        id: item.id,
        userId: "",
        createdAt: item.createdAt,
        isComplete: item.status,
        title: item.title,
        updatedAt: item.updatedAt,
      }));
      setTodo((prev) => prev.concat(getTodo));
    } catch (error) {
      console.log(`ERROR GET ALL TODO ${error}`);
    } finally {
      setIsLoadingTodo(false);
    }
  };

  useEffect(() => {
    setIsLoadingTodo(true);
    getAllTodo();
  }, []);

  const addTodo: SubmitHandler<FieldValues> = (value) => {
    // registerModal.onOpen();
    // setIsLoading(true);
    // const date = new Date(Date.now());
    // const body = {
    //   title: value.title,
    //   status: false,
    //   createdAt: date,
    //   updatedAt: date,
    // };
    // axios
    //   .post("/api/todo/create", {
    //     ...body,
    //   })
    //   .then((resp) => {
    //     toast.success("Todo has been successfully created!");
    //     setTodo((prev) =>
    //       prev.concat({
    //         id: resp.data.id,
    //         title: resp.data.title,
    //         isComplete: false,
    //         createdAt: Date.now(),
    //         updatedAt: null,
    //       })
    //     );
    //     reset();
    //   })
    //   .catch((e: any) => {
    //     console.log(`ERROR ${e}`);
    //     toast.success("Sorry, something went wrong");
    //   })
    //   .finally(() => setIsLoading(false));
  };

  const updateTodo = (todoId: string) => {
    axios
      .post(`/api/todo/update-status/${todoId}`)
      .then((resp) => {
        if (resp.data) {
          getAllTodo();
        }
        console.log(`UPDAATE STATUS TODO ${resp.data}`);
      })
      .catch((e) => {
        console.log(`ERROR UPDATE STATUS TODO ${e}`);
      });
  };

  const removeTodo = (todoId: string) => {
    axios
      .delete(`/api/todo/delete/${todoId}`)
      .then((resp) => {
        console.log(`DELETE SUCCESS ${resp.status}`);
        getAllTodo();
      })
      .catch((error: any) => {
        console.log(`DELETE FAIL ${error}`);
      });
  };

  const Pending = ({ status }: { status: string }) => {
    return (
      <div className="mt-2 py-1 px-4 rounded-md bg-orange-600 text-sm font-semibold text-white">
        {status}
      </div>
    );
  };

  const Complete = ({ status }: { status: string }) => {
    return (
      <div className="mt-2 py-1 px-4 rounded-md bg-green-600 text-sm font-semibold text-white">
        {status}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className=" h-[180px] w-full bg-gradient-to-b from-purple-800 to-blue-800 justify-center flex">
        <div className="py-5">
          <h1 className="text-2xl font-semibold text-white">Todo List</h1>
        </div>
      </div>
      <div className="flex flex-col items-center absolute top-24">
        <div className="w-[1048px] py-5 top-24 h-fit bg-white shadow-md rounded-md">
          <form
            onSubmit={handleSubmit(addTodo)}
            className="flex flex-col items-center gap-3 mx-5"
          >
            <label className="block text-gray-800 font-semibold text-2xl w-full">
              What would you do?
            </label>
            <input
              className=" shadow-md appearance-none rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              {...register("title", { required: true })}
              placeholder="Do Something Today!"
            />
            {errors?.title?.type === "required" && (
              <p className="text-red-600">Title is required</p>
            )}
            <button
              disabled={isLoading}
              // onClick={() => handleSubmit(addTodo)}
              onClick={loginModal.onOpen}
              className={
                !isLoading
                  ? "mt-4 bg-orange-500 px-5 py-2 shadow-lg shadow-orange-300 rounded-md  text-white font-semibold text-lg"
                  : "mt-4 bg-gray-400 px-5 py-2 shadow-lg rounded-md text-white font-semibold text-lg cursor-none"
              }
            >
              Add To Do
            </button>
          </form>
        </div>
        {todo.length === 0 && !isLoadingTodo ? (
          <div className="py-5 flex justify-center mt-5 rounded-md items-center h-fit bg-white shadow-md w-[1048px]">
            <h1 className="text-2xl font-bold text-gray-700">
              You Don&apos;t Have Any Activity Yet
            </h1>
          </div>
        ) : (
          <div className=" w-[1048px] py-5 px-4 h-fit bg-white shadow-md rounded-md mt-5 flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-700">
              Your Todo List
            </h1>
            <div className="mt-3 px-8 w-full flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-gray-700 font-medium text-lg">List</p>
                  {todo.map((item, index) => (
                    <p
                      className="text-lg font-semibold text-gray-700"
                      key={index}
                    >
                      {item.title}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-700 font-medium text-lg">Status</p>
                  {todo.map((item, index) =>
                    item.isComplete ? (
                      <Complete key={index} status="Complete" />
                    ) : (
                      <Pending key={item.id} status="Pending" />
                    )
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-700 font-medium text-lg">
                    Selesai / Hapus
                  </p>
                  {todo.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 gap-x-2 items-center flex"
                    >
                      <button
                        onClick={() => updateTodo(item.id)}
                        className="w-fit py-1 px-4 bg-green-200 border border-green-400 rounded-md text-gray-700"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => removeTodo(item.id)}
                        className="w-fit py-1 px-4 bg-red-200 border border-red-400 rounded-md text-gray-700"
                      >
                        <FiDelete size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
