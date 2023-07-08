import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    const { createdAt, updatedAt, title, isComplete } = body;

    if (!currentUser) {
      throw new NextResponse("Invalid Credentials", {
        status: 401,
      });
    }

    const todo = await prisma.todo.create({
      data: {
        isComplete,
        title,
        createdAt,
        updatedAt,
        userId: currentUser?.id,
      },
    });

    console.log("BODY ADD TODO", body);

    if (!todo) {
      throw new NextResponse("Failed Create TODO", { status: 401 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.log(`ERROR ADD TODO ${error}`);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
