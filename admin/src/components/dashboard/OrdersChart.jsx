import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ordersData } from "../../data/dashboardData";

const COLORS = [
  "#FFBB35",
  "#204A25",
  "#22C55E",
  "#EF4444",
];

const OrdersChart = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
      <h2 className="text-xl font-semibold mb-6">
        Orders Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={ordersData}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
          >
            {ordersData.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;