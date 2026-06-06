import {
  Plus,
  Package,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";

const actions = [
  {
    title: "Add Product",
    icon: Package,
  },
  {
    title: "Create Order",
    icon: ShoppingCart,
  },
  {
    title: "Add Coupon",
    icon: TicketPercent,
  },
  {
    title: "Create Banner",
    icon: Plus,
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-100">
      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="
              border
              rounded-2xl
              p-4
              hover:border-primary
              hover:bg-secondary
              transition-all
              "
            >
              <Icon
                size={22}
                className="mx-auto mb-2 text-primary"
              />

              <p className="text-sm">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;