import {
  Users,
  UserCheck,
  Crown,
  UserPlus,
} from "lucide-react";

const CustomerStats = ({
  customers,
}) => {
  const totalCustomers =
    customers.length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status ===
        "Active"
    ).length;

  const vipCustomers =
    customers.filter(
      (customer) =>
        customer.status ===
        "VIP"
    ).length;

  const newCustomers =
    customers.filter(
      (customer) => {
        const joinDate =
          new Date(
            customer.joinedAt
          );

        const today =
          new Date();

        const diffDays =
          (
            today -
            joinDate
          ) /
          (1000 *
            60 *
            60 *
            24);

        return diffDays <= 30;
      }
    ).length;

  const stats = [
    {
      title:
        "Total Customers",
      value:
        totalCustomers,
      icon: Users,
    },

    {
      title:
        "Active Customers",
      value:
        activeCustomers,
      icon: UserCheck,
    },

    {
      title:
        "VIP Customers",
      value:
        vipCustomers,
      icon: Crown,
    },

    {
      title:
        "New Customers",
      value:
        newCustomers,
      icon: UserPlus,
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

export default CustomerStats;