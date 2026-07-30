import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("super_admin_token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL ?? "http://localhost:4000"}/api/auth/super-admin/verify`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
    );
    if (response.ok) return NextResponse.next();
  } catch {
    // Fail closed when the authentication service cannot verify the session.
  }
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("super_admin_token");
  return response;
}

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
