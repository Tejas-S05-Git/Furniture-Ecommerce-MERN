import React from "react";
import HeroPage from "../components/HeroPage";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "../components/FeaturesSection";

const TrackOrder = () => {
    const navigate = useNavigate();
    return (
        <>
            <HeroPage title="Track Order" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Track Order" }]} />

            <section className="bg-white py-16 md:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

                    {/* Top Text */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="max-w-6xl"
                    >
                        <p className="text-zinc-600 text-base md:text-lg leading-relaxed md:leading-9">
                            To track your order please enter your Order ID in the box below and
                            press the{" "}
                            <span className="font-medium text-zinc-800">
                                “Track Order”
                            </span>{" "}
                            button. This was given to you on your receipt and in the
                            confirmation email you should have received.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mt-10 md:mt-14 space-y-8">

                        {/* Order ID */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-duration="1000"
                        >
                            <label className="block text-xl font-semibold text-zinc-900 mb-4">
                                Order ID *
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Your Order ID"
                                className="w-full h-16 rounded-full border border-zinc-200 bg-white px-6 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                            />
                        </div>

                        {/* Billing Email */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                        >
                            <label className="block text-xl font-semibold text-zinc-900 mb-4">
                                Billing Email *
                            </label>

                            <input
                                type="email"
                                placeholder="Enter Email Address"
                                className="w-full h-16 rounded-full border border-zinc-200 bg-white px-6 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                            />
                        </div>

                        {/* Button */}
                        <div
                            data-aos="zoom-in"
                            data-aos-delay="300"
                            data-aos-duration="1000"
                            className="pt-4"
                        >
                            <button onClick={() => navigate("/order-status")} className="bg-primary hover:scale-105 hover:shadow-xl transition-all duration-300 text-white font-medium text-lg px-10 md:px-12 h-16 rounded-full">
                                Track Order
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <FeaturesSection />
        </>
    );
};

export default TrackOrder;