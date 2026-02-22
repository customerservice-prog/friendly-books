export { default } from "next-auth/middleware";

export const config = {
  // Protect app routes, but DO NOT block public assets in /public (e.g. /friendly-books.jpg)
  matcher: [
    "/((?!api/auth|login|register|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
