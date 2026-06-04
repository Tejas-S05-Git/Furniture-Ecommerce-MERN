import React, { useState } from "react";
import OrderSummary from "../components/OrderSummary";
import FeaturesSection from "../components/FeaturesSection";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const navigate = useNavigate();

    const handlePayment = () => {
  toast.loading("Processing payment...");

  setTimeout(() => {
    toast.dismiss();

    toast.success("Payment Successful 🎉");

    navigate("/order-success");
  }, 1800);
};
    return (
        <>
            <section className="bg-secondary py-16 lg:py-24 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">

                        {/* LEFT */}
                        <div
                            className="lg:col-span-8"
                            data-aos="fade-up"
                            data-aos-duration="800"
                        >
                            <h2 className="text-3xl font-semibold mb-8">
                                Select Payment Method
                            </h2>

                            <div className="space-y-4">

                                {/* Paypal */}
                                <label className="border border-zinc-200 rounded-2xl bg-white px-6 py-5 flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "paypal"}
                                        onChange={() =>
                                            setPaymentMethod("paypal")
                                        }
                                        className="accent-primary"
                                    />
                                    <span className="font-medium">
                                        PayPal
                                    </span>
                                </label>

                                {/* Visa */}
                                <label className="border border-zinc-200 rounded-2xl bg-white px-6 py-5 flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "visa"}
                                        onChange={() =>
                                            setPaymentMethod("visa")
                                        }
                                        className="accent-primary"
                                    />
                                    <span className="font-medium">
                                        VISA **** **** **** 8047
                                    </span>
                                </label>

                                {/* Google Pay */}
                                <label className="border border-zinc-200 rounded-2xl bg-white px-6 py-5 flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "gpay"}
                                        onChange={() =>
                                            setPaymentMethod("gpay")
                                        }
                                        className="accent-primary"
                                    />
                                    <span className="font-medium">
                                        Google Pay
                                    </span>
                                </label>

                                {/* COD */}
                                <label className="border border-zinc-200 rounded-2xl bg-white px-6 py-5 flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "cod"}
                                        onChange={() =>
                                            setPaymentMethod("cod")
                                        }
                                        className="accent-primary"
                                    />
                                    <span className="font-medium">
                                        Cash On Delivery
                                    </span>
                                </label>

                                {/* Add Card */}
                                <div className="border border-zinc-200 rounded-2xl bg-white p-6">

                                    <label className="flex items-center gap-3 mb-6 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={paymentMethod === "card"}
                                            onChange={() =>
                                                setPaymentMethod("card")
                                            }
                                            className="accent-primary"
                                        />
                                        <span className="font-medium">
                                            Add New Credit / Debit Card
                                        </span>
                                    </label>

                                    {paymentMethod === "card" && (
                                        <div
                                            className="space-y-6"
                                            data-aos="fade-down"
                                        >
                                            <div>
                                                <label className="block mb-3 font-medium">
                                                    Card Holder Name *
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="Ex. John Doe"
                                                    className="w-full h-14 rounded-full border border-zinc-200 px-6 outline-none focus:border-primary transition"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-3 font-medium">
                                                    Card Number *
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="4716 9627 1635 8047"
                                                    className="w-full h-14 rounded-full border border-zinc-200 px-6 outline-none focus:border-primary transition"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block mb-3 font-medium">
                                                        Expiry Date *
                                                    </label>

                                                    <input
                                                        type="text"
                                                        placeholder="02/30"
                                                        className="w-full h-14 rounded-full border border-zinc-200 px-6 outline-none focus:border-primary transition"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block mb-3 font-medium">
                                                        CVV *
                                                    </label>

                                                    <input
                                                        type="text"
                                                        placeholder="000"
                                                        className="w-full h-14 rounded-full border border-zinc-200 px-6 outline-none focus:border-primary transition"
                                                    />
                                                </div>
                                            </div>

                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="accent-primary"
                                                />
                                                <span>
                                                    Save card for future payments
                                                </span>
                                            </label>

                                            <button className="bg-primary text-white px-8 h-12 rounded-full hover:opacity-90 transition">
                                                Add Card
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div
                            className="lg:col-span-4"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >
                            <OrderSummary showButton={false} paymentButton={true} onPaymentClick={handlePayment} />
                            <div
                                className="mt-6"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FeaturesSection/>
        </>

    );
};

export default Payment;