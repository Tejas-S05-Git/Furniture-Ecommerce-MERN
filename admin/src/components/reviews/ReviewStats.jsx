import React from "react";
import {
  MessageSquare,
  CheckCircle,
  Clock3,
  Star,
} from "lucide-react";

const ReviewStats = ({ reviews }) => {
  const totalReviews = reviews.length;

  const approvedReviews = reviews.filter((review) => review.approved).length;
  const pendingReviews = reviews.filter((review) => !review.approved).length;
  const approvedData = reviews.filter((review) => review.approved);

  const averageRating =
    approvedData.length > 0
      ? (
          approvedData.reduce((total, review) => total + review.rating, 0) /
          approvedData.length
        ).toFixed(1)
      : "0.0";

  // Semantic layout tracking colors tailored specifically for social proof & feedback loops
  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: MessageSquare,
      colors: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Approved",
      value: approvedReviews,
      icon: CheckCircle,
      colors: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Pending",
      value: pendingReviews,
      icon: Clock3,
      colors: "bg-orange-50 text-orange-600 border-orange-100",
    },
    {
      title: "Average Rating",
      value: averageRating, // Extracted plain text value for clean separation from markup
      icon: Star,
      colors: "bg-amber-50 text-amber-600 border-amber-100", // Amber styling represents validation scores cleanly
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              group
              bg-white
              rounded-2xl
              border
              border-zinc-200
              p-5
              shadow-sm
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
              ease-out
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.title}
                </p>

                <div className="flex items-baseline gap-1 mt-1">
                  <h2 className="text-2xl font-bold text-zinc-900 group-hover:text-primary transition-colors duration-300">
                    {item.value}
                  </h2>
                  {/* Append inline micro text layout if the metric is a rating system score */}
                  {item.title === "Average Rating" && (
                    <span className="text-xs text-zinc-400 font-medium">/ 5.0</span>
                  )}
                </div>
              </div>

              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  border
                  flex
                  items-center
                  justify-center
                  transition-colors
                  duration-300
                  ${item.colors}
                `}
              >
                <Icon size={22} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewStats;