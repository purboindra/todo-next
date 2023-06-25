import { NextResponse } from "next/server";

interface IParams {
  todoId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { todoId } = params;

    if (!todoId) {
      throw new NextResponse("Invalid ID", {
        status: 404,
      });
    }

    const updateTodo = await prisma?.todo.update({
      where: {
        id: todoId,
      },
      data: {
        status: true,
      },
    });

    return NextResponse.json(updateTodo, { status: 200 });
  } catch (error) {
    console.log(`ERROR UPDATE TODO STATUS ${error}`);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
