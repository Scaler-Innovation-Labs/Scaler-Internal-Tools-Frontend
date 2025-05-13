"use client";

import { useTheme } from "next-themes";
import { Star } from "lucide-react";
import { useState, type FormEvent } from "react";

export function MessFeedback() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ rating, feedback });
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 rounded-lg border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Mess Feedback</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Please rate your experience below</p>
      <div className="flex items-center gap-1 mb-2">
        {[1,2,3,4,5].map(star => {
          const isFilled = (hoverRating || rating) >= star;
          return (
            <Star
              key={star}
              fill={isFilled ? 'currentColor' : 'none'}
              stroke={isFilled ? 'none' : 'currentColor'}
              className={`w-6 h-6 cursor-pointer ${isFilled ? 'text-yellow-400' : isDark ? 'text-white' : 'text-gray-500'}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        })}
        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} ml-2`}>{rating}/5 stars</span>
      </div>
      <textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        rows={4}
        placeholder="Additional feedback"
        className={`w-full border rounded-md p-2 mb-4 focus:outline-none ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
      />
      <button
        type="submit"
        className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-95 transition"
      >
        Submit feedback
      </button>
    </form>
  );
} 