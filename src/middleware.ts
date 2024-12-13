import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });
  // const pathName = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // ----------Admin Protected route------
  // if (
  //     adminRoutes.some((route) =>
  //         pathName.match(new RegExp(`^${route.replace(":id", "[^/]+")}$`))
  //     )
  // ) {
  //     if (token.role === "admin") {
  //         return NextResponse.next();
  //     }
  //     return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  // }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/my-pending-bookings/:path*",
    "/add-service/:path*",
    "/my-services/:path*",
    "/service/book",
    "/services/:id/book-form",
  ],
};
