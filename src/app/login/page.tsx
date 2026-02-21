"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold">Friendly Books</h1>
      <p className="text-sm opacity-80 mt-1">Sign in</p>

      <button
        className="mt-6 w-full rounded-lg bg-black text-white py-2"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Continue with Google
      </button>

      <div className="my-6 text-center text-xs opacity-70">or</div>

      <div className="space-y-3">
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full rounded-lg bg-blue-600 text-white py-2 disabled:opacity-50"
          disabled={!email || password.length < 8}
          onClick={async () => {
            setMsg("");
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false,
              callbackUrl: "/",
            });
            if (res?.error) setMsg("Invalid credentials or password login disabled.");
            else window.location.href = "/";
          }}
        >
          Sign in
        </button>
        {msg ? <div className="text-sm text-red-600">{msg}</div> : null}

        <a className="text-sm underline" href="/register">
          Create an account
        </a>
      </div>
    </div>
  );
}
