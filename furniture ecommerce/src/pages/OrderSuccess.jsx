import React, { useEffect, useState } from "react";
import { 
    CheckCircle2, 
    Package, 
    MapPin, 
    CreditCard, 
    Calendar, 
    Hash, 
    Loader2, 
    Download 
} from "lucide-react";
import HeroPage from "../components/HeroPage";
import FeaturesSection from "../components/FeaturesSection";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const OrderSuccess = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/orders/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    // 1. Industry Standard Loading State
    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-zinc-500 font-medium">Fetching your order details...</p>
            </div>
        );
    }

    // 2. Clean 404 / Error State
    if (!order) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-5 px-4 text-center">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-2">
                    <Package className="w-10 h-10 text-zinc-400" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-800">Order Not Found</h2>
                <p className="text-zinc-500 max-w-sm">We couldn't find the order you're looking for. It might have been removed or the ID is incorrect.</p>
                <Link to="/" className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:opacity-90 transition mt-4">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <>
            <HeroPage
                title="Order Completed"
                breadcrumbs={[
                    { label: "Home", path: "/" },
                    { label: "Order Completed" },
                ]}
            />
            
            <section className="bg-zinc-50 py-12 lg:py-20 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    {/* --- SUCCESS HEADER --- */}
                    <div className="text-center mb-14" data-aos="zoom-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6 shadow-sm">
                            <CheckCircle2 size={40} className="text-green-600" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
                            Your order is confirmed!
                        </h1>
                        <p className="text-zinc-500 text-lg max-w-md mx-auto">
                            Thank you for shopping with us. We'll send you an email once your items have shipped.
                        </p>
                    </div>

                    {/* --- TWO COLUMN LAYOUT --- */}
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        
                        {/* LEFT COLUMN: Items & Shipping (Spans 2 columns) */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Order Items Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden" data-aos="fade-up">
                                <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Package className="w-5 h-5 text-primary" />
                                        Order Items
                                    </h2>
                                    <span className="text-sm font-medium px-3 py-1 bg-white border border-zinc-200 rounded-full text-zinc-600">
                                        {order.items.length} Items
                                    </span>
                                </div>
                                
                                <div className="p-6 divide-y divide-zinc-100">
                                    {order.items.map((item, index) => (
                                        <div key={item._id} className={`flex items-center gap-5 ${index !== 0 ? 'pt-6 mt-6' : ''}`}>
                                            <div className="w-24 h-24 rounded-xl bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-zinc-900">{item.title}</h3>
                                                <p className="text-sm text-zinc-500 mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-lg font-semibold text-zinc-900">
                                                ₹{item.subtotal}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Details Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6" data-aos="fade-up" data-aos-delay="100">
                                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Shipping Details
                                </h2>
                                <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200/60 text-zinc-700 leading-relaxed">
                                    <p className="font-semibold text-zinc-900 text-lg mb-1">{order.shippingAddress?.fullName}</p>
                                    <p className="text-zinc-600 mb-3">{order.shippingAddress?.phone}</p>
                                    <p className="border-t border-zinc-200 pt-3">
                                        {order.shippingAddress?.address}<br />
                                        {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}<br />
                                        {order.shippingAddress?.country}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order Summary & Info (Spans 1 column) */}
                        <div className="lg:col-span-1 space-y-6" data-aos="fade-left" data-aos-delay="200">

                            {/* Order Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 space-y-6">
                                <h3 className="text-lg font-semibold">Order Information</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 shrink-0"><Hash className="w-4 h-4"/></div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-semibold">Order ID</p>
                                            <p className="font-medium text-zinc-900">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600 shrink-0"><CreditCard className="w-4 h-4"/></div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-semibold">Payment</p>
                                            <p className="font-medium text-zinc-900 capitalize">{order.paymentMethod}</p>
                                            <p className="text-sm text-zinc-500 capitalize">{order.paymentStatus}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 bg-orange-50 rounded-lg text-orange-600 shrink-0"><Calendar className="w-4 h-4"/></div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-semibold">Est. Delivery</p>
                                            <p className="font-medium text-zinc-900">
                                                {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled
                                    className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-400 font-medium py-3 rounded-xl cursor-not-allowed border border-zinc-200 transition"
                                >
                                    <Download className="w-4 h-4" />
                                    Invoice Generating...
                                </button>
                            </div>

                            {/* Price Breakdown Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
                                <h3 className="text-lg font-semibold mb-5">Price Summary</h3>
                                <div className="space-y-3 text-zinc-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-zinc-900">₹{order.totalAmount - order.shipping - order.tax + (order.discount || 0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="font-medium text-zinc-900">₹{order.shipping}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxes</span>
                                        <span className="font-medium text-zinc-900">₹{order.tax}</span>
                                    </div>
                                    
                                    {order.coupon && (
                                        <div className="flex justify-between text-green-600 bg-green-50/50 p-2 rounded-lg -mx-2 px-2 mt-2 border border-green-100">
                                            <span>Discount ({order.coupon.code})</span>
                                            <span className="font-medium">-₹{order.discount}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between border-t border-zinc-200 pt-4 mt-4 text-xl font-bold text-zinc-900">
                                        <span>Total</span>
                                        <span className="text-primary">₹{order.totalAmount}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <FeaturesSection />
        </>
    );
};

export default OrderSuccess;