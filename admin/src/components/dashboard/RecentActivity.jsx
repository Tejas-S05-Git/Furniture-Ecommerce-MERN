const activities = [
  "New Product Added",
  "Order #102 Delivered",
  "Coupon Created",
  "Customer Registered",
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-100">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((item) => (
          <div
            key={item}
            className="
            border-l-4
            border-primary
            pl-4
            "
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;