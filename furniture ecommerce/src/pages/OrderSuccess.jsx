import React from "react";
import { Check } from "lucide-react";
import HeroPage from "../components/HeroPage";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import FeaturesSection from "../components/FeaturesSection";
import { useOrders } from "../context/OrderContext";
import { useEffect } from "react";

const OrderSuccess = () => {
    const { placeOrder } = useOrders();
    const { cartItems, cartSubtotal } = useCart();
    useEffect(() => {
  if (cartItems.length > 0) {
    placeOrder(
      cartItems,
      cartSubtotal,
      "Paypal"
    );
  }
}, []);
    return (
        <>
            <HeroPage
                title="Order Completed"
                breadcrumbs={[
                    { label: "Home", path: "/" },
                    { label: "Order Completed", },

                ]}
            />
            <section className="bg-white py-16 lg:py-24 min-h-screen">
                <div className="max-w-6xl mx-auto px-4">

                    {/* TOP SUCCESS */}
                    <div
                        className="text-center mb-12"
                        data-aos="zoom-in"
                    >
                        <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center mb-6">
                            <Check
                                size={38}
                                className="text-black"
                            />
                        </div>

                        <h1 className="text-4xl font-semibold mb-3">
                            Your order is completed!
                        </h1>

                        <p className="text-zinc-500 text-lg">
                            Thank you. Your order has been
                            received.
                        </p>
                    </div>

                    {/* YELLOW BOX */}
                    <div
                        className="bg-accent rounded-3xl p-8 grid md:grid-cols-5 gap-6 items-center mb-8"
                        data-aos="fade-up"
                    >
                        <div>
                            <p className="text-sm text-zinc-700">
                                Order ID
                            </p>
                            <h4 className="font-semibold">
                                #SDGT1254FD
                            </h4>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-700">
                                Payment Method
                            </p>
                            <h4 className="font-semibold">
                                Paypal
                            </h4>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-700">
                                Transaction ID
                            </p>
                            <h4 className="font-semibold">
                                TR542SSF
                            </h4>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-700">
                                Delivery Date
                            </p>
                            <h4 className="font-semibold">
                                24 April 2026
                            </h4>
                        </div>

                        <button className="bg-primary text-white rounded-full h-12 px-6">
                            Download Invoice
                        </button>
                    </div>

                    {/* ORDER DETAILS */}
                    <div
                        className="bg-white rounded-3xl border border-zinc-200 p-6 md:p-8"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h2 className="text-2xl font-semibold mb-8">
                            Order Details
                        </h2>

                        {/* heading */}
                        <div className="hidden md:flex justify-between text-sm font-medium text-zinc-500 border-b pb-4 mb-6">
                            <span>Products</span>
                            <span>Sub Total</span>
                        </div>

                        {/* products */}
                        <div className="space-y-6">
                            {cartItems.map((item, index) => {
                                const product = products.find(
                                    (p) => p.id === item.id
                                );

                                return (
                                    <div
                                        key={item.id || index}
                                        className="flex items-center justify-between gap-4 py-5"
                                    >
                                        <div className="flex items-center gap-4">

                                            <div className="w-20 h-20 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                                                <img
                                                    src={product?.images?.[0]}
                                                    alt={product?.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-medium">
                                                    {product?.title}
                                                </h3>

                                                <p className="text-sm text-zinc-500">
                                                    Color : {product?.color}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-lg font-semibold">
                                            ${item.price}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* totals */}
                        <div className="border-t mt-8 pt-6 space-y-4">
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Taxes</span>
                                <span>$0.00</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Coupon Discount</span>
                                <span>-$100.00</span>
                            </div>

                            <div className="flex justify-between border-t pt-5 text-xl font-semibold">
                                <span>Total</span>
                                <span>${cartSubtotal - 100}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FeaturesSection/>
        </>
    );
};

export default OrderSuccess;