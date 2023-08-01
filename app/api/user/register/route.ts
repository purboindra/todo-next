import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const tokenData = {
      id: user.id,
      username: name,
      email: email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    console.log("TOKEN IS", token);

    const updatedUserGetToken = await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        token: token,
      },
    });

    const response = NextResponse.json(updatedUserGetToken, {
      status: 200,
      statusText: "User Successfully Created!",
    });

    response.cookies.set("token", token, { httpOnly: true, path: "/" });

    return response;
  } catch (error: any) {
    console.log("ERROR REGISTER USER CATCH", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
