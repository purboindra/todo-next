import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const todo = await prisma?.todo.create({
      data: body,
    });

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
