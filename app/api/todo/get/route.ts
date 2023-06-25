import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
  try {
    const todo = await prisma?.todo.findMany();
    return NextResponse.json(todo, {
      status: 200,
    });
  } catch (error) {
    console.log(`ERROR GET ALL TODO ${error}`);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
