import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const store = await cookies();
  const token = store.get("super_admin_token")?.value;
  if (token) {
    await fetch(
      `${process.env.BACKEND_URL ?? "http://localhost:4000"}/api/auth/super-admin/logout`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
    ).catch(() => undefined);
  }
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete("super_admin_token");
  return response;
}
