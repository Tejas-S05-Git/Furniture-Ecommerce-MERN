import React from "react";
import {
  Users,
  UserCheck,
  Crown,
  UserPlus,
} from "lucide-react";

const CustomerStats = ({ customers }) => {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.isActive === true
  ).length;

  const vipCustomers = customers.filter(
    (customer) => customer.status === "VIP"
  ).length;

  const newCustomers = customers.filter((customer) => {
    const joinDate = new Date(customer.createdAt);
    const today = new Date();
    const diffDays = (today - joinDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      colors: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      icon: UserCheck,
      colors: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "VIP Customers",
      value: vipCustomers,
      icon: Crown,
      colors: "bg-amber-50 text-amber-600 border-amber-100", 
    },
    {
      title: "New Customers",
      value: newCustomers,
      icon: UserPlus,
      colors: "bg-purple-50 text-purple-600 border-purple-100",
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

                <h2 className="text-2xl font-bold text-zinc-900 group-hover:text-primary transition-colors duration-300">
                  {item.value}
                </h2>
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

export default CustomerStats;