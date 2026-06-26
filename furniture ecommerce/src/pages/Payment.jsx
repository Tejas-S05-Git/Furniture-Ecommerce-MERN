import React, { useState, useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import FeaturesSection from "../components/FeaturesSection";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PaymentMethodCard from "../components/payment/PaymentMethodCard";

import { Truck, CreditCard, } from "lucide-react";

import api from "../services/api";

const Payment = () => {
    const { id } = useParams();
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);


    const fetchOrder =
        async () => {
            try {
                const response =
                    await api.get(
                        `/orders/${id}`
                    );

                console.log(response.data);

                setOrder(
                    response.data.order
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Order not found"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const handlePayment = async () => {

        if (paymentMethod === "cod") {

            try {

                await api.patch(
                    `/orders/${order._id}/payment`,
                    {

                        paymentMethod: "cod",

                        paymentStatus: "pending",

                    }

                );

                toast.success(
                    "Order Placed Successfully"
                );

                navigate(
                    `/order-success/${order._id}`
                );

            } catch (error) {

                toast.error(
                    "Order Failed"
                );

            }

            return;
        }

        if (
            paymentMethod ===
            "razorpay"
        ) {

            openRazorpay();

        }

    };

    const openRazorpay = async () => {
        try {
            const res = await api.post(
                "/payment/create-order",
                {
                    orderId: order._id,
                }
            );

            const razorpayOrder =
                res.data.razorpayOrder;

            const options = {
                key: res.data.key,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                name: "Furniture Store",

                description:
                    "Furniture Purchase",

                order_id:
                    razorpayOrder.id,

                prefill: {
                    name: order.shippingAddress.fullName,

                    contact: order.shippingAddress.phone,

                    email: order.customer?.email
                },
                modal: {

                    ondismiss() {

                        toast.error(
                            "Payment Cancelled"
                        );

                    }

                },
                retry: {
                    enabled: true
                },

                theme: {
                    color: "#204A25",
                },

                handler: async (response) => {

                    try {

                        await api.post(
                            "/payment/verify",
                            {

                                orderId:
                                    order._id,

                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,

                            }
                        );

                        toast.success(
                            "Payment Successful"
                        );

                        navigate(
                            `/order-success/${order._id}`
                        );

                    } catch (error) {

                        console.log(error);

                        toast.error(
                            "Payment Verification Failed"
                        );

                    }

                }
            };

            const razorpay =
                new window.Razorpay(
                    options
                );

            razorpay.open();

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable to start payment"
            );

        }
    };
    useEffect(() => {

        if (
            !loading &&
            order &&
            order.items.length === 0
        ) {

            navigate("/cart");

        }

    }, [loading, order]);

    if (loading) {

        return (

            <section className="py-40">

                <div className="flex justify-center">

                    <div
                        className="
                    w-14
                    h-14
                    border-4
                    border-primary
                    border-t-transparent
                    rounded-full
                    animate-spin
                    "
                    />

                </div>

            </section>

        );

    }

    if (!order) {
        return <div>Order Not Found</div>;
    }
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

                                <div className="space-y-6">

                                    <PaymentMethodCard
                                        value="cod"
                                        selected={paymentMethod === "cod"}
                                        onSelect={setPaymentMethod}
                                        title="Cash On Delivery"
                                        description="Pay after your order is delivered. Available for eligible locations only."
                                        icon={
                                            <Truck
                                                size={30}
                                                className="text-primary"
                                            />
                                        }
                                        badges={[
                                            "Pay Later",
                                            "3-5 Days Delivery",
                                        ]}
                                    />

                                    <PaymentMethodCard
                                        value="razorpay"
                                        selected={
                                            paymentMethod ===
                                            "razorpay"
                                        }
                                        onSelect={setPaymentMethod}
                                        title="Razorpay"
                                        description="Pay securely using UPI, Credit Card, Debit Card, Wallet or Net Banking."
                                        icon={
                                            <CreditCard
                                                size={30}
                                                className="text-primary"
                                            />
                                        }
                                        badges={[
                                            "UPI",
                                            "Cards",
                                            "Wallet",
                                            "Net Banking",
                                            "100% Secure",
                                        ]}
                                    />

                                </div>




                            </div>
                        </div>

                        {/* RIGHT */}
                        <div
                            className="lg:col-span-4"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >


                            <OrderSummary
                                items={order.items}
                                subtotal={
                                    order.items.reduce(
                                        (total, item) =>
                                            total + item.subtotal,
                                        0
                                    )
                                }
                                discount={order.discount}
                                coupon={order.coupon}
                                finalAmount={order.totalAmount}
                                shipping={order.shipping}
                                tax={order.tax}
                                showButton={false}
                                paymentButton={true}
                                onPaymentClick={handlePayment}
                                processing={processing}
                            />
                        </div>

                    </div>
                </div>
            </section>
            <FeaturesSection />
        </>

    );
};

export default Payment;