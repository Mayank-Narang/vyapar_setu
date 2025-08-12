import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useApp } from "../contexts/AppContext";

export default function Reviews() {
  const { fontSize } = useApp();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(0);
const userId = "64f1c1a9e13f2a0012345678";
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews/:userId");
        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        setReviews(data);

        if (data.length > 0) {
          const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
          setAvgRating(avg.toFixed(1));
        }
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500" style={{ fontSize }}>
        No reviews yet.
      </p>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-8 overflow-x-hidden"
      style={{ fontSize }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
        <div className="flex items-center text-gray-600">
          <div className="flex items-center text-yellow-500 mr-3">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar
                  key={i}
                  size={22}
                  className={i < Math.round(avgRating) ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
          </div>
          <span className="font-semibold text-gray-800 text-lg">{avgRating}</span>
          <span className="text-base ml-1">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border-0 rounded-xl shadow-lg p-6 flex flex-col gap-3 bg-white"
          >
            {/* Rating and date */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      size={20}
                      className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                    />
                  ))}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Review text */}
            <p className="text-gray-700 leading-relaxed">{review.text}</p>

            {/* Verified badge */}
            {review.verified && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full self-start">
                Verified
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
