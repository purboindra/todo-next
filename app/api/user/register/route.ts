import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const findEmail = await prisma.user.findUnique({
      where: {
        email: body.data.email,
      },
    });

    if (findEmail) {
      throw new NextResponse("Invalid Email", {
        status: 401,
        statusText: "Email already used!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.data.password, salt);

    const user = await prisma.user.create({
      data: {
        createdAt: body.data.createdAt,
        email: body.data.email,
        emailVerified: body.data.email,
        hashedPassword: hashedPassword,
        image: "",
        name: body.data.name,
        updatedAt: null,
        todos: {
          create: {
            isComplete: false,
            title: "",
            createdAt: undefined,
            updatedAt: undefined,
          },
        },
      },
    });

    await prisma.user.findMany({
      include: {
        todos: true,
      },
    });

    if (!user) {
      throw new NextResponse("Failed Create User", {
        status: 401,
      });
    }

    return NextResponse.json(user, {
      status: 200,
      statusText: "User Successfully Created!",
    });
  } catch (error) {
    console.log("ERROR REGISTER USER ROUTE", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
