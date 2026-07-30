import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginForm } from "@/components/login-form";
import { Icon } from "@/components/icons";

export default async function LoginPage() {
  const token = (await cookies()).get("super_admin_token")?.value;
  if (token) redirect("/dashboard");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[430px] w-[430px] rounded-full bg-blue-50 blur-3xl" />

      <section className="relative w-full max-w-[430px] rounded-[24px] border border-[#e8e8f1] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(36,31,75,0.10)] sm:px-10 sm:py-10">
        <div className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#743cff] to-[#5148eb] text-white shadow-[0_12px_26px_rgba(108,61,244,.28)]">
            <Icon name="shield" className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-2xl font-black tracking-tight text-[#20213a]">Artistry Super Admin</h1>
          <p className="mt-2 text-xs font-medium text-slate-400">Art Competition Management Platform</p>
          <p className="mt-6 text-[11px] text-slate-500">Sign in with your administrator credentials</p>
        </div>

        <div className="mt-7">
          <LoginForm />
        </div>
        <p className="mt-7 text-center text-[9px] text-slate-400">© 2026 Artistry. All rights reserved.</p>
      </section>
    </main>
  );
}
