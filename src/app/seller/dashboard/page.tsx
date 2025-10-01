"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Rating {
  id: number;
  rating: number;
  comment?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  ratings: Rating[];
}

interface SellerProfile {
  story?: string;
  location?: string;
  website?: string;
}

type SellerDashboardResponse =
  | {
      id: number;
      name: string;
      profile?: SellerProfile | null;
      products: Product[];
    }
  | { error: string };

export default function SellerDashboard() {
  const [data, setData] = useState<SellerDashboardResponse | null>(null);

  useEffect(() => {
    fetch("/api/seller/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;
  if ("error" in data) return <p>{data.error}</p>; // type-safe error check

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {data.name}</h1>

      {/* Profile */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p>{data.profile?.story || "No story yet."}</p>
        <p>{data.profile?.location}</p>
        <p>{data.profile?.website}</p>
      </section>

      {/* Products */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Your Products</h2>
        <ul className="grid grid-cols-2 gap-4 mt-2">
          {data.products.map((p) => (
            <li key={p.id} className="border p-3 rounded">
              <Image
                src={p.image || "/placeholder.png"}
                alt={p.name}
                width={300}
                height={200}
                className="h-32 w-full object-cover"
              />
              <h3 className="font-bold">{p.name}</h3>
              <p>${p.price}</p>
              <p>
                Avg Rating:{" "}
                {p.ratings.length
                  ? (
                      p.ratings.reduce((a, r) => a + r.rating, 0) /
                      p.ratings.length
                    ).toFixed(1)
                  : "No ratings"}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
