import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";


const RevenueChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Revenue Analytics
        </h2>

        <p className="text-zinc-500 text-sm">
          Monthly revenue overview
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            formatter={(value) =>
              [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue"
              ]}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#204A25"
            fill="#204A25"
            fillOpacity={0.15}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;