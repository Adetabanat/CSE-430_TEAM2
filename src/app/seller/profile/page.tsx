"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SellerProfile {
  id: number;
  bio?: string;
  story?: string;
  banner?: string;
  location?: string;
  website?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  accountType: "BASIC" | "SELLER" | "ADMIN";
  profile?: SellerProfile | null;
}

export default function SellerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/seller/dashboard");
        const data = await res.json();

        if (!res.ok) {
          router.push("/login");
          return;
        }

        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    }

    fetchDashboard();
  }, [router]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Your role: {user?.accountType}</p>

      {user?.accountType === "SELLER" && !user.profile && (
        <div style={{ marginTop: "20px" }}>
          <p>You haven’t completed your seller profile yet.</p>
          <button
            onClick={() => router.push("/seller/profile")}
            className="profile-btn"
          >
            Complete Seller Profile
          </button>
        </div>
      )}

      {user?.accountType === "SELLER" && user.profile && (
        <>
          <h2>Your Seller Info</h2>
          <p>Story: {user.profile.story}</p>
          <p>Bio: {user.profile.bio}</p>
        </>
      )}

      {/* Render products, stats, etc. here */}
    </div>
  );
}
