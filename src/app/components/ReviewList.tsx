interface Review {
  id: string
  rating: number
  comment: string
  user: { name: string | null }
  createdAt: string
}

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', textAlign: 'center', marginBottom: '0.5rem' }}>Customer Reviews</h3>
        {reviews.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ fontSize: '14px', color: i < Math.round(Number(averageRating)) ? '#facc15' : '#d1d5db' }}>
                  ★
                </span>
              ))}
            </div>
            <span style={{ fontSize: '14px', color: '#4b5563' }}>
              {averageRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>
      
      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ color: '#9ca3af', fontSize: '2.5rem', marginBottom: '0.5rem' }}>★</div>
          <p style={{ color: '#6b7280', fontSize: '1.125rem', textAlign: 'center' }}>No reviews yet</p>
          <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center' }}>Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {(review.user.name || 'A')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {review.user.name || 'Anonymous User'}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}