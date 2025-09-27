'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  description: string
  averageRating: number
  reviewCount: number
  image: string
}

export default function ProductPage() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Handcrafted Ceramic Bowl',
      price: 45.99,
      description: 'Beautiful ceramic bowl made by local artisans',
      averageRating: 4.5,
      reviewCount: 12,
      image: '/ceramic-bowls.webp'
    },
    {
      id: '2', 
      name: 'Wooden Jewelry Box',
      price: 89.99,
      description: 'Elegant wooden jewelry box with intricate carvings',
      averageRating: 4.8,
      reviewCount: 8,
      image: '/jewelry.webp'
    },
    {
      id: '3',
      name: 'Handwoven Animal Wood',
      price: 32.50,
      description: 'Handcrafted wooden animal figurines',
      averageRating: 4.2,
      reviewCount: 15,
      image: '/animal-wood.webp'
    }
  ])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem', textAlign: 'center' }}>Our Products</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', justifyItems: 'center' }}>
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${
                        i < Math.round(product.averageRating) ? "text-yellow-400" : "text-gray-300"
                      }`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.averageRating} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <Link 
                    href={`/product/${product.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}