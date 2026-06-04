import React from "react";
import { useCart } from "../context/CartContext";
import TrackOrderItem from "../components/TrackOrderItem";

const orderSteps = [
    {
        title: "Order Placed",
        date: "20 Apr 2024",
        time: "11:00 AM",
        completed: true,
        icon: "ri-file-list-3-line",
    },
    {
        title: "Accepted",
        date: "20 Apr 2024",
        time: "11:15 AM",
        completed: true,
        icon: "ri-checkbox-circle-line",
    },
    {
        title: "In Progress",
        date: "Expected",
        time: "21 Apr 2024",
        completed: false,
        icon: "ri-box-3-line",
    },
    {
        title: "On the Way",
        date: "Expected",
        time: "22 Apr 2024",
        completed: false,
        icon: "ri-truck-line",
    },
    {
        title: "Delivered",
        date: "Expected",
        time: "24 Apr 2024",
        completed: false,
        icon: "ri-home-smile-line",
    },
];

const OrderStatus = () => {
    const { cartItems } = useCart();

    return (
        <section className="bg-[#F8F8F8] py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-zinc-900">
                        Order Status
                    </h2>

                    <p className="text-zinc-500 mt-3">
                        Order ID : #SDGT1254FD
                    </p>
                </div>

                {/* Status Box */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="bg-white rounded-3xl border border-zinc-200 mt-10 p-6 md:p-10"
                >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {orderSteps.map((step, index) => (
                            <div
                                key={index}
                                className="text-center relative"
                            >
                                <div
                                    className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl
                  ${step.completed
                                            ? "bg-primary text-white"
                                            : "bg-zinc-100 text-zinc-400"
                                        }`}
                                >
                                    <i className={step.icon}></i>
                                </div>

                                <h3 className="mt-4 font-medium text-zinc-800">
                                    {step.title}
                                </h3>

                                <p className="text-sm text-zinc-500 mt-3">
                                    {step.date}
                                </p>

                                <p className="text-sm text-zinc-500">
                                    {step.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="bg-white rounded-3xl border border-zinc-200 mt-8 p-6 md:p-8"
                >
                    <h3 className="text-2xl font-semibold mb-6">
                        Products
                    </h3>

                    {cartItems.map((item) => (
                        <TrackOrderItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrderStatus;