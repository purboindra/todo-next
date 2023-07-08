import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new NextResponse("User Not Found", {
        status: 404,
      });
    }

    const todo = await prisma?.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        todos: {
          where: {
            userId: currentUser?.id,
          },
        },
      },
    });

    return NextResponse.json(todo, {
      status: 200,
    });
  } catch (error: any) {
    console.log("ERROR FROM GET TODO BY USER ID", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
