'use client'

import { useState } from 'react'

interface ReviewFormProps {
  productId: string
  onSubmit: (review: { rating: number; comment: string }) => void
}

export default function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
    setComment('')
    setRating(5)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937', textAlign: 'center' }}>Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#ca8a04', marginBottom: '0.1rem', textAlign: 'center' }}>Your Rating</label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.25rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: '3rem',
                    color: star <= (hoverRating || rating) ? '#eab308' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    userSelect: 'none'
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLElement
                    target.style.color = '#facc15'
                    target.style.transform = 'scale(1.1)'
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLElement
                    target.style.color = star <= (hoverRating || rating) ? '#eab308' : '#d1d5db'
                    target.style.transform = 'scale(1)'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p style={{ 
              fontSize: '12px', 
              color: '#000000', 
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0',
              marginTop: '0.1rem'
            }}>
              {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
            </p>
          </div>
        </div>
        
        <div className="mb-4" style={{ marginTop: '2rem' }}>
          <div className="w-full">
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#ca8a04', marginBottom: '1rem', width: '100%', textAlign: 'center' }}>Your Review</label>
          </div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              style={{ width: '80%', border: '1px solid #d1d5db', borderRadius: '0.5rem', padding: '0.75rem 1rem', resize: 'none', textAlign: 'left' }}
              rows={3}
              required
            />
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
}