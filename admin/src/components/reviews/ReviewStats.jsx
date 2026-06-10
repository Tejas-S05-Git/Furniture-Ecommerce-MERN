import {
  MessageSquare,
  CheckCircle,
  Clock3,
  Star,
} from "lucide-react";

const ReviewStats = ({
  reviews,
}) => {
  const totalReviews =
    reviews.length;

  const approvedReviews =
    reviews.filter(
      (review) =>
        review.status ===
        "Approved"
    ).length;

  const pendingReviews =
    reviews.filter(
      (review) =>
        review.status ===
        "Pending"
    ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total +
              review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  const stats = [
    {
      title:
        "Total Reviews",
      value:
        totalReviews,
      icon: MessageSquare,
    },

    {
      title:
        "Approved Reviews",
      value:
        approvedReviews,
      icon: CheckCircle,
    },

    {
      title:
        "Pending Reviews",
      value:
        pendingReviews,
      icon: Clock3,
    },

    {
      title:
        "Average Rating",
      value:
        averageRating,
      icon: Star,
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >
      {stats.map((item) => {
        const Icon =
          item.icon;

        return (
          <div
            key={
              item.title
            }
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            shadow-sm
            hover:shadow-md
            transition-all
            duration-300
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p
                  className="
                  text-zinc-500
                  text-sm
                  "
                >
                  {
                    item.title
                  }
                </p>

                <h2
                  className="
                  text-3xl
                  font-bold
                  mt-2
                  "
                >
                  {
                    item.value
                  }
                </h2>
              </div>

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
                "
              >
                <Icon
                  size={24}
                  className="
                  text-primary
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewStats;