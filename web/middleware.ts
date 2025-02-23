import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const userToken = req.cookies.get("user_2225");
  const { pathname } = req.nextUrl;

  // Exclude Next.js internal assets, static files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/youtube-thumbnail.jpg") ||
    pathname.startsWith("/not-found.svg") ||
    pathname.startsWith("/noise.webp")
  ) {
    return NextResponse.next();
  }

  console.log(`Middleware executed for: ${pathname}`);

  let authenticated = false;

  if (userToken) {
    try {
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_WEB_SERVER_URL_DEV
            : process.env.NEXT_PUBLIC_WEB_SERVER_URL_PRO
        }/user/auth/token-verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken.value}`,
          },
        }
      );
      authenticated = data.success;
    } catch (error) {
      console.error("Token verification failed:", error);
      authenticated = false;
    }
  }

  // Redirect authenticated users away from login page
  if (authenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users to login page
  if (!authenticated && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Match only actual page routes (exclude static assets & APIs automatically)
export const config = {
  matcher: ["/((?!_next|static|api|favicon.ico).*)"],
};
