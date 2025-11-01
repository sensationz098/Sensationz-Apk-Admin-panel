import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();


  if (!token && (url.pathname.startsWith("/admin/dashboard") || url.pathname.startsWith("/teacher/dashboard"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (!token) return NextResponse.next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string ,name:string};


    if (url.pathname.startsWith("/admin/dashboard")) {
      if (decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
      }
    }

    if (url.pathname.startsWith("/teacher/dashboard")) {
      if (decoded.role !== "TEACHER") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

    if (url.pathname.startsWith("/signin")) {
      if (decoded.role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      if (decoded.role === "TEACHER") return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/signin/:path*",
    "/admin/dashboard/:path*",
    "/teacher/dashboard/:path*",
  ],
};
