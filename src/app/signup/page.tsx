"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    accountType: "BASIC" as "BASIC" | "SELLER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          accountType: formData.accountType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful, redirect to login
      router.push("/login?message=Registration successful! Please log in.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#8B4513',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '1rem'
          }}>
            Handcrafted Haven
          </Link>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.5rem', 
            color: '#333',
            fontWeight: 'bold'
          }}>
            Create your account
          </h2>
          <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
            Or{" "}
            <Link
              href="/login"
              style={{ color: '#8B4513', textDecoration: 'none', fontWeight: '500' }}
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                border: '1px solid #f5c6cb',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}
            
            <div style={{ marginBottom: '1rem' }}>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              >
                <option value="BASIC">Basic User</option>
                <option value="SELLER">Seller</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? '#a0785a' : '#8B4513',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}