const TodaysSummary = ({
  summary,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-100">
      <h2 className="text-xl font-semibold mb-6">
        Today's Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Revenue</span>

          <span className="font-semibold">
            ₹{summary?.revenue?.toLocaleString() || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Orders</span>

          <span className="font-semibold">
            {summary?.orders || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Customers</span>

          <span className="font-semibold">
           {summary?.customers || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodaysSummary;