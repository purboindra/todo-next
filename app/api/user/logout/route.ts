import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Success!",
      status: 200,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    console.log("COOKIES", response.cookies.get);
    return response;
  } catch (error: any) {
    console.log("ERROR LOG OUT", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
