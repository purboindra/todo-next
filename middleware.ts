import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("PATH NAME", path);

  const isPublicUrl = path === "/";

  const token = request.cookies.get("token")?.value ?? "";

  if (path == "/todo") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/todo", "/test"],
};
