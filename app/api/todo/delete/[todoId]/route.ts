import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  todoId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { todoId } = params;

    console.log(`TODO ID ${todoId}`);

    if (!todoId) {
      throw new NextResponse("Invalid ID", {
        status: 401,
      });
    }

    const deleteTodo = await prisma?.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json(deleteTodo, {
      status: 200,
    });
  } catch (error) {
    console.log(`ERROR DELETE TODO ${error}`);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
