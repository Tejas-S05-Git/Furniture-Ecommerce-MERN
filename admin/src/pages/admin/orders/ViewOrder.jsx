import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    User,
    MapPin,
    CreditCard,
    Package,
    Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "../../../components/common/StatusBadge";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const ViewOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
     const [orderStatus, setOrderStatus] =useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    

    useEffect(() => {
        if (order) {
            setOrderStatus(
                order.orderStatus
            );
        }
    }, [order]);

    const updateStatus =
        async () => {
            try {
                await api.put(
                    `/orders/${order._id}/status`,
                    {
                        orderStatus,
                    }
                );

                toast.success(
                    "Order updated"
                );

                fetchOrder();

            } catch (error) {
                console.log(error);

                toast.error(
                    "Update failed"
                );
            }
        };

    const fetchOrder =
        async () => {
            try {
                const response =
                    await api.get(
                        `/orders/${id}`
                    );

                setOrder(
                    response.data.order
                );

            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to load order"
                );
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

    if (!order) {
        return (
            <div className="bg-white rounded-3xl p-10 text-center">
                Order Not Found
            </div>
        );
    }

   

    const timelineSteps = [
        "pending",
        "processing",
        "shipped",
        "delivered",
    ];

    const currentStep =
        timelineSteps.indexOf(
            orderStatus
        );
    return (
        <div className="space-y-6">

            {/* Header */}

            <div
                className="
        bg-white
        rounded-3xl
        border
        border-zinc-100
        p-6
        "
            >
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
              text-2xl
              font-bold
              "
                        >
                            #{order._id.slice(-8)}
                        </h1>

                        <p className="text-zinc-500">
                            Created on{" "}
                            {new Date(
                                order.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <div
                        className="
  flex
  flex-col
  sm:flex-row
  gap-3
  items-start
  sm:items-center
  "
                    >
                        <StatusBadge
                            status={orderStatus}
                        />

                        <select
                            value={orderStatus}
                            onChange={(e) =>
                                setOrderStatus(
                                    e.target.value
                                )
                            }
                            className="
    border
    border-zinc-200
    rounded-2xl
    px-4
    py-2
    outline-none
    "
                        >
                            <option value="pending">
                                Pending
                            </option>

                            <option value="processing">
                                Processing
                            </option>

                            <option value="shipped">
                                Shipped
                            </option>

                            <option value="delivered">
                                Delivered
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>

                            <option value="returned">
                                Returned
                            </option>
                        </select>

                        <button
                            onClick={updateStatus}
                            className="
    bg-primary
    text-white
    px-5
    py-2
    rounded-2xl
    "
                        >
                            Update Status
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Grid */}

            <div
                className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
            >
                {/* Customer */}

                <div
                    className="
          bg-white
          rounded-3xl
          border
          border-zinc-100
          p-6
          "
                >
                    <div className="flex items-center gap-3 mb-5">
                        <User
                            size={22}
                            className="text-primary"
                        />

                        <h2 className="font-semibold text-lg">
                            Customer
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <p>
                            <span className="font-medium">
                                Name:
                            </span>{" "}
                            {order.customer?.firstName}
                            {" "}
                            {order.customer?.lastName}
                        </p>

                        <p>
                            <span className="font-medium">
                                Email:
                            </span>{" "}
                            {order.customer.email}
                        </p>

                        <p>
                            <span className="font-medium">
                                Phone:
                            </span>{" "}
                            {order.shippingAddress?.phone}
                        </p>
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
                    <div className="flex items-center gap-3 mb-5">
                        <MapPin
                            size={22}
                            className="text-primary"
                        />

                        <h2 className="font-semibold text-lg">
                            Shipping Address
                        </h2>
                    </div>

                    <div className="space-y-2">

                        <p>
                            {
                                order.shippingAddress
                                    ?.fullName
                            }
                        </p>

                        <p>
                            {
                                order.shippingAddress
                                    ?.address
                            }
                        </p>

                        <p>
                            {
                                order.shippingAddress
                                    ?.city
                            }
                            ,
                            {
                                order.shippingAddress
                                    ?.state
                            }
                        </p>

                        <p>
                            {
                                order.shippingAddress
                                    ?.postalCode
                            }
                        </p>

                        <p>
                            {
                                order.shippingAddress
                                    ?.country
                            }
                        </p>

                    </div>
                </div>

                {/* Payment */}

                <div
                    className="
          bg-white
          rounded-3xl
          border
          border-zinc-100
          p-6
          "
                >
                    <div className="flex items-center gap-3 mb-5">
                        <CreditCard
                            size={22}
                            className="text-primary"
                        />

                        <h2 className="font-semibold text-lg">
                            Payment
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <p>
                            <span className="font-medium">
                                Method:
                            </span>{" "}
                            {order.paymentMethod.toUpperCase()}
                        </p>

                        <p>
                            <span className="font-medium">
                                Status:
                            </span>{" "}
                            {order.paymentStatus}
                        </p>

                        <p>
                            <span className="font-medium">
                                Total:
                            </span>{" "}
                            ₹{order.totalAmount}
                        </p>
                    </div>
                </div>
            </div>

            {/* Products */}

            <div
                className="
        bg-white
        rounded-3xl
        border
        border-zinc-100
        p-6
        "
            >
                <div className="flex items-center gap-3 mb-6">
                    <Package
                        size={22}
                        className="text-primary"
                    />

                    <h2 className="font-semibold text-lg">
                        Ordered Products
                    </h2>
                </div>

                <div className="space-y-5">
                    {order.items.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4"
                        >

                            <div className="flex gap-4">

                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />

                                <div>
                                    <h3 className="font-medium">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-zinc-500">
                                        Qty :
                                        {item.quantity}
                                    </p>
                                </div>

                            </div>

                            <p className="font-semibold">
                                ₹{item.subtotal}
                            </p>

                        </div>
                    ))}

                </div>
            </div>

            {/* Bottom Grid */}

            <div
                className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        "
            >
                {/* Summary */}

                <div
                    className="
          bg-white
          rounded-3xl
          border
          border-zinc-100
          p-6
          "
                >
                    <h2 className="font-semibold text-lg mb-5">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>

                            <span>
                                ₹{order.totalAmount}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>

                            <span>Free</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>

                            <span>
                                ₹{order.totalAmount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Timeline */}

                <div
                    className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
  "
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Clock
                            size={22}
                            className="text-primary"
                        />

                        <h2 className="font-semibold text-lg">
                            Order Timeline
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {timelineSteps.map(
                            (step, index) => (
                                <div
                                    key={step}
                                    className="flex gap-4"
                                >
                                    <div
                                        className={`
              w-4
              h-4
              rounded-full
              mt-1

              ${index <=
                                                currentStep
                                                ? "bg-primary"
                                                : "bg-zinc-300"
                                            }
            `}
                                    />

                                    <div>
                                        <h3
                                            className={`
                font-medium

                ${index <=
                                                    currentStep
                                                    ? "text-primary"
                                                    : "text-zinc-500"
                                                }
              `}
                                        >
                                            {step}
                                        </h3>

                                        <p
                                            className="
              text-sm
              text-zinc-500
              "
                                        >
                                            {index <=
                                                currentStep
                                                ? "Completed"
                                                : "Waiting"}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewOrder;