import React from "react";
import { getTodoByUserId } from "../actions/getTodoByUseId";
import { getCurrentUser } from "../actions/getCurrentUser";

const GetTodo = async () => {
  //   const currentUser = await getCurrentUser();
  // const getTodo = await getTodoByUserId();
  //   const getAllTodo = async () => {
  //     try {
  //       const response = await axios.get(`/api/todo/get/${currentUser?.id}`);
  //       const getTodo = response.data.map((item: any) => ({
  //         id: item.id,
  //         userId: "",
  //         createdAt: item.createdAt,
  //         isComplete: item.status,
  //         title: item.title,
  //         updatedAt: item.updatedAt,
  //       }));
  //       console.log("GET TODO", getTodo);
  //     } catch (error) {
  //       console.log(`ERROR GET ALL TODO ${error}`);
  //     } finally {
  //     }
  //   };
  return <div>Hello From Get Todo By User Id</div>;
};
export default GetTodo;
