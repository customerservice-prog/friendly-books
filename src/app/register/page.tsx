"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold">Create account</h1>
      <div className="space-y-3 mt-6">
        <input className="w-full rounded-lg border px-3 py-2" placeholder="Name (optional)" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="w-full rounded-lg border px-3 py-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full rounded-lg border px-3 py-2" placeholder="Password (min 8)" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button
          className="w-full rounded-lg bg-blue-600 text-white py-2 disabled:opacity-50"
          disabled={!email || password.length < 8}
          onClick={async () => {
            setMsg("");
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, name: name || undefined }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) setMsg(data.error || "registration_failed");
            else window.location.href = "/login";
          }}
        >
          Create
        </button>
        {msg ? <div className="text-sm text-red-600">{msg}</div> : null}
        <a className="text-sm underline" href="/login">Back to login</a>
      </div>
    </div>
  );
}
