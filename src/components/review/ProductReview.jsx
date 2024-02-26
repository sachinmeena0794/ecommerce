import React, { useContext, useState, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { FiUser } from 'react-icons/fi';

function ProductReview({ product }) {
  const { reviews } = useContext(myContext);
  const [showReviewInput, setShowReviewInput] = useState(false); // State to toggle review input fields
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Filter reviews for the specified product
  const productReviews = reviews.filter((review) => review._id !== product._id);

  // Calculate average rating for the product
  const totalRatings = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = productReviews.length > 0 ? totalRatings / productReviews.length : 0;

  const handleAddReview = () => {
    // Validate inputs
    if (rating === 0 || comment.trim() === "") {
      alert("Please enter a rating and comment.");
      return;
    }
    // Reset input fields
    setRating(0);
    setComment("");
    // Hide the review input fields after adding the review
    setShowReviewInput(false);
  };


return (
    <div className="border border-gray-300 rounded p-4 max-w-md mx-auto mt-2 overflow-hidden">
      <span className="text-lg font-semibold mb-2 flex items-center">
        Product Reviews
        <div className="flex items-center ml-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${index < averageRating ? 'text-yellow-500' : 'text-gray-400'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.864 17.33a1 1 0 01-1.452-1.054l.764-4.473-3.257-3.178a1 1 0 01.553-1.705l4.51-.655 2.014-4.08a1 1 0 011.796 0l2.014 4.08 4.51.655a1 1 0 01.553 1.705l-3.257 3.178.764 4.473a1 1 0 01-1.452 1.054L10 14.988l-3.136 2.342z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      </span>
      <ul className="overflow-y-auto max-h-64">
        {reviews.map((review) => (
          <li key={review.id} className="border-t border-gray-300 py-4">
            <ul>
              {review.comments.map((comment, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <FiUser className="h-6 w-6 mr-2 text-gray-600" />
                  <div>
                    <p className="text-lg text-gray-600">{comment.username}</p>
                    <p className="text-base font-semibold text-gray-800 mb-1">{comment.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      {/* Conditionally render review input fields */}
      {showReviewInput ? (
    <div className="flex flex-col mt-4">
    <label className="mb-2 text-gray-600">Rating:</label>
    <input
      type="number"
      min="1"
      max="5" // Add max attribute to limit the input to 5
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="border border-gray-300 rounded py-2 px-3"
    />
    <label className="mb-2 text-gray-600">Comment:</label>
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="border border-gray-300 rounded py-2 px-3 mb-1"
    ></textarea>
    <button
      onClick={handleAddReview}
      className="bg-black text-white font-bold py-2 px-4 rounded mt-2 self-start"
    >
      Add Review
    </button>
  </div>
  
     
      ) : (
        <button
          onClick={() => setShowReviewInput(true)}
          className="bg-black text-white font-bold py-2 px-4 rounded"
        >
          Write a Review
        </button>
      )}
    </div>
  );
}

export default ProductReview;
