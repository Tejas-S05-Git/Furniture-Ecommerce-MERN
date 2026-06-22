import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

import StatusBadge from "../../../components/common/StatusBadge";
import api from "../../../services/api";
import { useEffect, useState } from "react";

const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalSpent, setTotalSpent] =
    useState(0);

  const [loading, setLoading] =
    useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer =
    async () => {
      try {
        const response =
          await api.get(
            `/customers/${id}`
          );

        setCustomer(
          response.data.customer
        );

        setOrders(
          response.data.orders
        );

        setTotalOrders(
          response.data.totalOrders
        );

        setTotalSpent(
          response.data.totalSpent
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

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
              src={
                customer.avatar ||
                `https://ui-avatars.com/api/?name=${customer.firstName}+${customer.lastName}`
              }
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
              {customer.firstName}
              {" "}
              {customer.lastName}
            </h2>

            <p className="text-zinc-500 mt-1">
              {customer.email}
            </p>

            <div className="mt-4">
              <StatusBadge
                status={
                  customer.isActive
                    ? "active"
                    : "inactive"
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
                    {totalOrders}
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
                    ₹{totalSpent}
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
                  {customer.firstName}
                  {" "}
                  {customer.lastName}
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
                  {customer.phone || "N/A"}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500">
                  Joined
                </p>

                <h3 className="font-medium mt-1">

                  {
                    new Date(
                      customer.createdAt
                    ).toLocaleDateString()
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
                {customer.address || "No address added"}
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
  {orders.length > 0 ? (
    orders.map((order) => (
      <tr
        key={order._id}
        className="border-b"
      >
        <td className="py-4">
          #{order._id.slice(-8)}
        </td>

        <td className="py-4">
          ₹{order.totalAmount}
        </td>

        <td className="py-4">
          <StatusBadge
            status={order.orderStatus}
          />
        </td>

        <td className="py-4">
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="4"
        className="py-8 text-center text-zinc-500"
      >
        No Orders Found
      </td>
    </tr>
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