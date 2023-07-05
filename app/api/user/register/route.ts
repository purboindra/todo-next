import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body.data;

    const findEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findEmail) {
      throw new NextResponse("Invalid Credentials", {
        status: 401,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        emailVerified: "",
        name: name,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(user, {
      status: 200,
      statusText: "User Successfully Created!",
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
