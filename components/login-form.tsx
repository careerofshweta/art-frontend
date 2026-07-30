"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icons";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/super-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to sign in");
      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</div>}
      <label className="block">
        <span className="label !text-[11px] !text-[#34364c]">Email Address</span>
        <div className="relative">
          <Icon name="users" className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input name="email" type="email" autoComplete="email" required className="field !h-12 !rounded-xl !border-slate-200 !bg-[#fbfbfe] !pl-11 text-sm" placeholder="admin@artistry.com" />
        </div>
      </label>
      <label className="block">
        <span className="label !text-[11px] !text-[#34364c]">Password</span>
        <div className="relative">
          <Icon name="shield" className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="field !h-12 !rounded-xl !border-slate-200 !bg-[#fbfbfe] !px-11 text-sm" placeholder="Enter your password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 rounded-lg px-2 py-1 text-[10px] font-bold text-violet-600">
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        </div>
      </label>
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-[10px] font-medium text-slate-500">
          <input type="checkbox" name="remember" defaultChecked className="h-3.5 w-3.5 rounded accent-violet-600" />
          Remember me
        </label>
        <span className="text-[10px] font-semibold text-violet-600">Secure admin access</span>
      </div>
      <button disabled={loading} className="btn btn-primary !mt-6 !h-12 w-full !rounded-xl !bg-gradient-to-r !from-[#6538f1] !to-[#5148eb] disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Signing in…" : "Sign in to Dashboard"} {!loading && <span>→</span>}
      </button>
    </form>
  );
}
