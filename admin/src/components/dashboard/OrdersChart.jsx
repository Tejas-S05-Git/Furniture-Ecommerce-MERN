import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";



const COLORS = [
  "#FFBB35",
  "#204A25",
  "#22C55E",
  "#EF4444",
];

const OrdersChart = ({ data = [], }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
      <h2 className="text-xl font-semibold mb-6">
        Orders Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                  index %
                  COLORS.length
                  ]
                }
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              value,
              props.payload.name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default OrdersChart;