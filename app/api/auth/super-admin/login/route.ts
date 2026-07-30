import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL ?? "http://localhost:4000"}/api/auth/super-admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(await request.json()),
        cache: "no-store",
      },
    );
    const body = await response.json();
    const result = NextResponse.json(body, { status: response.status });
    if (response.ok && body.data?.accessToken) {
      result.cookies.set("super_admin_token", body.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }
    return result;
  } catch {
    return NextResponse.json(
      { success: false, message: "Authentication service is unavailable" },
      { status: 503 },
    );
  }
}
