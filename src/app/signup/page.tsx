"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BASIC",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!form.name || !form.email || !form.password) {
      setMessage("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          becomeSeller: form.role === "SELLER",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form" autoComplete="on">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="form-input"
            placeholder="Name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-input"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="form-input"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            className="form-input"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="BASIC">Basic</option>
            <option value="SELLER">Seller</option>
          </select>
        </div>

        <button type="submit" className="auth-btn">Signup</button>
      </form>

      {message && (
        <p className={`auth-message ${success ? "success-message" : "error-text"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
