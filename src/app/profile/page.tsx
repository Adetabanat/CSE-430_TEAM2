"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  name: string;
  accountType: string;
  about_me?: string;
  createdAt: string;
  sellerProfile?: any;
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    createdAt: string;
  }>;
  reviews: Array<{
    id: number;
    rating: number;
    comment?: string;
    createdAt: string;
    product: {
      name: string;
    };
  }>;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/profile");
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to fetch profile");
      }

      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '1rem' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-red-600 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => router.push("/login")}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-600 text-center">No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e0e0e0', 
        padding: '1rem 0' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div>
            <Link href="/" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#8B4513',
              textDecoration: 'none'
            }}>
              Handcrafted Haven
            </Link>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#6d3410'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8B4513'}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        {/* Profile Card */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#8B4513',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', color: '#333' }}>{user.name}</h1>
              <p style={{ margin: '0', color: '#666' }}>{user.email}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{
              backgroundColor: user.accountType === 'SELLER' ? '#d4edda' : '#cce5ff',
              color: user.accountType === 'SELLER' ? '#155724' : '#004085',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              border: `1px solid ${user.accountType === 'SELLER' ? '#c3e6cb' : '#b3d7ff'}`
            }}>
              {user.accountType === 'SELLER' ? '🏪 Seller' : '👤 Customer'}
            </span>
          </div>

          <p style={{ margin: '0', color: '#888', fontSize: '0.9rem' }}>
            Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              timeZone: 'UTC'
            })}
          </p>

          {user.about_me && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderLeft: '4px solid #8B4513',
              borderRadius: '4px'
            }}>
              <p style={{ margin: '0', color: '#555' }}>{user.about_me}</p>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid #e0e0e0',
            padding: '0 1rem'
          }}>
            <button
              onClick={() => setActiveTab("overview")}
              style={{
                padding: '1rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === "overview" ? '2px solid #8B4513' : '2px solid transparent',
                color: activeTab === "overview" ? '#8B4513' : '#666',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              📊 Overview
            </button>
            {user.accountType === 'SELLER' && (
              <button
                onClick={() => setActiveTab("products")}
                style={{
                  padding: '1rem',
                  border: 'none',
                  backgroundColor: 'transparent',
                  borderBottom: activeTab === "products" ? '2px solid #8B4513' : '2px solid transparent',
                  color: activeTab === "products" ? '#8B4513' : '#666',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                🛍️ My Products ({user.products.length})
              </button>
            )}
            <button
              onClick={() => setActiveTab("reviews")}
              style={{
                padding: '1rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === "reviews" ? '2px solid #8B4513' : '2px solid transparent',
                color: activeTab === "reviews" ? '#8B4513' : '#666',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ⭐ My Reviews ({user.reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '2rem' }}>
            {activeTab === "overview" && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div style={{
                  backgroundColor: '#e3f2fd',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #bbdefb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#1565c0', fontSize: '0.9rem' }}>Account Type</p>
                      <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: '#0d47a1' }}>{user.accountType}</p>
                    </div>
                    <div style={{ fontSize: '2rem' }}>{user.accountType === 'SELLER' ? '🏪' : '👤'}</div>
                  </div>
                </div>
                
                {user.accountType === 'SELLER' && (
                  <div style={{
                    backgroundColor: '#e8f5e8',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #c8e6c9'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: '0 0 0.5rem 0', color: '#2e7d32', fontSize: '0.9rem' }}>Products Listed</p>
                        <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: '#1b5e20' }}>{user.products.length}</p>
                      </div>
                      <div style={{ fontSize: '2rem' }}>📦</div>
                    </div>
                  </div>
                )}
                
                <div style={{
                  backgroundColor: '#fff8e1',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #ffecb3'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#f57f17', fontSize: '0.9rem' }}>Reviews Written</p>
                      <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: '#e65100' }}>{user.reviews.length}</p>
                    </div>
                    <div style={{ fontSize: '2rem' }}>⭐</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && user.accountType === 'SELLER' && (
              <div>
                {user.products.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    {user.products.map((product) => (
                      <div key={product.id} style={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '1rem' }}>
                          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#333' }}>{product.name}</h3>
                          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: 'bold', color: '#28a745' }}>${product.price}</p>
                          <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                            Added {new Date(product.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#333' }}>No Products Yet</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}>Start selling by adding your first product!</p>
                    <button style={{
                      backgroundColor: '#8B4513',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}>
                      Add Your First Product
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {user.reviews.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {user.reviews.map((review) => (
                      <div key={review.id} style={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <h3 style={{ margin: '0', fontSize: '1.1rem', color: '#333' }}>{review.product.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                style={{
                                  color: i < review.rating ? '#ffc107' : '#e0e0e0',
                                  fontSize: '1rem'
                                }}
                              >
                                ★
                              </span>
                            ))}
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>({review.rating}/5)</span>
                          </div>
                        </div>
                        {review.comment && (
                          <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '1rem',
                            borderRadius: '4px',
                            borderLeft: '4px solid #8B4513',
                            marginBottom: '1rem'
                          }}>
                            <p style={{ margin: '0', color: '#555', fontStyle: 'italic' }}>"{review.comment}"</p>
                          </div>
                        )}
                        <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                          {new Date(review.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            timeZone: 'UTC'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#333' }}>No Reviews Yet</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}>Share your thoughts about products you've purchased!</p>
                    <Link href="/categories" style={{
                      backgroundColor: '#8B4513',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      display: 'inline-block'
                    }}>
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}