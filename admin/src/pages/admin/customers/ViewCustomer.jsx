import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

import customersData from "../../../data/customersData";
import StatusBadge from "../../../components/common/StatusBadge";

const ViewCustomer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const customer =
    customersData.find(
      (item) =>
        item.id === Number(id)
    );

  if (!customer) {
    return (
      <div
        className="
        bg-white
        rounded-3xl
        p-10
        text-center
        "
      >
        Customer Not Found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        "
      >
        <div>
          <button
            onClick={() =>
              navigate(-1)
            }
            className="
            flex
            items-center
            gap-2
            text-primary
            mb-3
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Customer Details
          </h1>

          <p className="text-zinc-500">
            View customer profile and activity
          </p>
        </div>
      </div>

      {/* Main Grid */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >

        {/* Left Side */}

        <div className="space-y-6">

          {/* Profile Card */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            text-center
            "
          >
            <img
              src={customer.avatar}
              alt=""
              className="
              w-28
              h-28
              rounded-full
              object-cover
              mx-auto
              "
            />

            <h2
              className="
              text-xl
              font-bold
              mt-4
              "
            >
              {customer.name}
            </h2>

            <p className="text-zinc-500 mt-1">
              {customer.email}
            </p>

            <div className="mt-4">
              <StatusBadge
                status={
                  customer.status
                }
              />
            </div>
          </div>

          {/* Stats */}

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-1
            gap-4
            "
          >

            <div
              className="
              bg-white
              rounded-3xl
              border
              border-zinc-100
              p-5
              "
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-zinc-500">
                    Total Orders
                  </p>

                  <h2
                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                  >
                    {
                      customer.totalOrders
                    }
                  </h2>
                </div>

                <ShoppingBag
                  className="
                  text-primary
                  "
                />
              </div>
            </div>

            <div
              className="
              bg-white
              rounded-3xl
              border
              border-zinc-100
              p-5
              "
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-zinc-500">
                    Total Spent
                  </p>

                  <h2
                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                  >
                    ₹
                    {
                      customer.totalSpent
                    }
                  </h2>
                </div>

                <IndianRupee
                  className="
                  text-primary
                  "
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div
          className="
          xl:col-span-2
          space-y-6
          "
        >

          {/* Personal Info */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              mb-6
              "
            >
              Customer Information
            </h2>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
              "
            >
              <div>
                <p className="text-zinc-500">
                  Full Name
                </p>

                <h3 className="font-medium mt-1">
                  {customer.name}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500">
                  Email
                </p>

                <h3 className="font-medium mt-1 flex items-center gap-2">
                  <Mail size={16} />
                  {customer.email}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500">
                  Phone
                </p>

                <h3 className="font-medium mt-1 flex items-center gap-2">
                  <Phone size={16} />
                  {customer.phone}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500">
                  Joined
                </p>

                <h3 className="font-medium mt-1">
                  {
                    customer.joinedAt
                  }
                </h3>
              </div>
            </div>
          </div>

          {/* Address */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              mb-6
              "
            >
              Address
            </h2>

            <div className="flex gap-3">
              <MapPin
                className="
                text-primary
                "
              />

              <p>
                {
                  customer.address
                }
              </p>
            </div>
          </div>

          {/* Recent Orders */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              mb-6
              "
            >
              Recent Orders
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[600px]">

                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">
                      Order ID
                    </th>

                    <th className="text-left py-3">
                      Amount
                    </th>

                    <th className="text-left py-3">
                      Status
                    </th>

                    <th className="text-left py-3">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customer.recentOrders?.map(
                    (order) => (
                      <tr
                        key={
                          order.id
                        }
                        className="border-b"
                      >
                        <td className="py-4">
                          {
                            order.id
                          }
                        </td>

                        <td className="py-4">
                          ₹
                          {
                            order.amount
                          }
                        </td>

                        <td className="py-4">
                          <StatusBadge
                            status={
                              order.status
                            }
                          />
                        </td>

                        <td className="py-4">
                          {
                            order.date
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewCustomer;