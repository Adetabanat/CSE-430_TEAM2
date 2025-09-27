'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import ReviewForm from '../../components/ReviewForm'
import ReviewList from '../../components/ReviewList'

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Ceramic Bowl',
    price: 45.99,
    description: 'Beautiful ceramic bowl made by local artisans with traditional techniques. Perfect for serving or decoration.',
    image: '/ceramic-bowls.webp'
  },
  {
    id: '2', 
    name: 'Wooden Jewelry Box',
    price: 89.99,
    description: 'Elegant wooden jewelry box with intricate carvings. Handcrafted from sustainable wood with velvet interior.',
    image: '/jewelry.webp'
  },
  {
    id: '3',
    name: 'Handwoven Animal Wood',
    price: 32.50,
    description: 'Handcrafted wooden animal figurines made from reclaimed wood. Each piece is unique and tells its own story.',
    image: '/animal-wood.webp'
  }
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [reviews, setReviews] = useState([])
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === resolvedParams.id)
    setProduct(foundProduct || null)
  }, [resolvedParams.id])

  const handleReviewSubmit = async (review: { rating: number; comment: string }) => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...review,
        productId: resolvedParams.id,
        userId: 'temp-user-id' 
      })
    })
    // Reload reviews after submitting
    const response = await fetch(`/api/reviews?productId=${resolvedParams.id}`)
    const data = await response.json()
    setReviews(data)
  }

  useEffect(() => {
    const loadReviews = async () => {
      const response = await fetch(`/api/reviews?productId=${resolvedParams.id}`)
      const data = await response.json()
      setReviews(data)
    }
    loadReviews()
  }, [resolvedParams.id])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Product Header */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: '#e5e7eb', borderRadius: '0.5rem', height: '16rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {product ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={256}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : (
                <span style={{ color: '#6b7280' }}>Loading...</span>
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                {product?.name || 'Loading...'}
              </h1>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
                {product?.description || 'Loading product details...'}
              </p>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669', marginBottom: '1rem' }}>
                ${product?.price || '0.00'}
              </div>
              <button style={{ backgroundColor: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <div>
            <ReviewForm productId={resolvedParams.id} onSubmit={handleReviewSubmit} />
          </div>
          
          <div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  )
}