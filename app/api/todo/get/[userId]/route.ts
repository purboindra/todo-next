import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  userId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    if (!userId) {
      throw new NextResponse("User Not Found", {
        status: 404,
      });
    }

    const todo = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        todos: {
          where: {
            userId,
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
