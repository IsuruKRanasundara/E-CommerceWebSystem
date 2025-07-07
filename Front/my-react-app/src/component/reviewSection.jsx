export default function ReviewSection({productReviews,renderStars}) {
    return (
        <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
        <div className="space-y-6">
          {productReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{review.name[0]}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{review.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
   
 
    )
}
