import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    User,
    MapPin,
    CreditCard,
    Package,
    Clock,
    Loader2,
    CalendarDays
} from "lucide-react";
import toast from "react-hot-toast";
import StatusBadge from "../../../components/common/StatusBadge";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const ViewOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    useEffect(() => {
        if (order) {
            setOrderStatus(order.orderStatus);
        }
    }, [order]);

    const updateStatus = async () => {
        setIsUpdating(true);
        try {
            await api.put(`/orders/${order._id}/status`, { orderStatus });
            toast.success("Order status updated successfully");
            fetchOrder();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/orders/${id}`);
            setOrder(response.data.order);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load order details");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // --- STATES ---
    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-zinc-500 font-medium">Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center border border-zinc-100 shadow-sm mt-6">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-zinc-400" />
                </div>
                <h2 className="text-xl font-bold text-zinc-800">Order Not Found</h2>
                <p className="text-zinc-500 mt-2">The requested order could not be located.</p>
                <button onClick={() => navigate(-1)} className="mt-6 text-primary font-medium hover:underline">
                    &larr; Go Back
                </button>
            </div>
        );
    }

    const timelineSteps = ["pending", "processing", "shipped", "delivered"];
    const currentStep = timelineSteps.indexOf(orderStatus);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            
            {/* --- HEADER --- */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition-colors mb-4 text-sm font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to Orders
                        </button>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-zinc-900 font-mono tracking-tight uppercase">
                                #{order._id.slice(-8)}
                            </h1>
                            <StatusBadge status={order.orderStatus} />
                        </div>
                        <p className="text-sm text-zinc-500 mt-2 flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <select
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="bg-white border border-zinc-200 text-zinc-700 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer min-w-[140px]"
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="returned">Returned</option>
                        </select>

                        <button
                            onClick={updateStatus}
                            disabled={isUpdating || orderStatus === order.orderStatus}
                            className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {isUpdating ? <Loader2 size={16} className="animate-spin" /> : null}
                            Update Status
                        </button>
                    </div>
                </div>
            </div>

            {/* --- TOP GRID (INFO CARDS) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Customer */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <User size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="font-semibold text-zinc-900 text-lg">Customer</h2>
                    </div>
                    <div className="space-y-3 text-sm text-zinc-600">
                        <p className="flex justify-between border-b border-zinc-50 pb-2">
                            <span className="text-zinc-400">Name</span>
                            <span className="font-medium text-zinc-900 capitalize">{order.customer?.firstName} {order.customer?.lastName}</span>
                        </p>
                        <p className="flex justify-between border-b border-zinc-50 pb-2">
                            <span className="text-zinc-400">Email</span>
                            <span className="font-medium text-zinc-900">{order.customer?.email}</span>
                        </p>
                        <p className="flex justify-between pb-1">
                            <span className="text-zinc-400">Phone</span>
                            <span className="font-medium text-zinc-900">{order.shippingAddress?.phone}</span>
                        </p>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                            <MapPin size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="font-semibold text-zinc-900 text-lg">Shipping Info</h2>
                    </div>
                    <div className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <p className="font-medium text-zinc-900 mb-1 capitalize">{order.shippingAddress?.fullName}</p>
                        <p>{order.shippingAddress?.address}</p>
                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                        <p className="mt-1 font-medium text-zinc-500 uppercase tracking-wider text-xs">{order.shippingAddress?.country}</p>
                    </div>
                </div>

                {/* Payment */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                            <CreditCard size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="font-semibold text-zinc-900 text-lg">Payment Info</h2>
                    </div>
                    <div className="space-y-4 text-sm text-zinc-600">
                        <p className="flex justify-between items-center">
                            <span className="text-zinc-400">Method</span>
                            <span className="font-medium text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-md uppercase text-xs tracking-wide">
                                {order.paymentMethod}
                            </span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="text-zinc-400">Status</span>
                            <StatusBadge status={order.paymentStatus} />
                        </p>
                        <p className="flex justify-between items-center pt-2 border-t border-zinc-100">
                            <span className="text-zinc-400">Total Amount</span>
                            <span className="font-bold text-zinc-900 text-base">{formatCurrency(order.totalAmount)}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM GRID --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Products List (Spans 2 columns) */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                            <Package size={20} className="text-zinc-400" />
                            <h2 className="font-semibold text-zinc-900 text-lg">Ordered Items</h2>
                        </div>
                        <span className="text-sm font-medium px-3 py-1 bg-white border border-zinc-200 rounded-full text-zinc-600">
                            {order.items.length} Products
                        </span>
                    </div>

                    <div className="p-2">
                        {order.items.map((item, index) => (
                            <div
                                key={item._id}
                                className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 rounded-xl hover:bg-zinc-50 transition-colors ${
                                    index !== order.items.length - 1 ? 'border-b border-zinc-100' : ''
                                }`}
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-xl border border-zinc-200 overflow-hidden shrink-0 bg-white">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-900 line-clamp-1">{item.title}</h3>
                                        <p className="text-sm text-zinc-500 mt-0.5">
                                            Qty: <span className="font-medium text-zinc-700">{item.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-zinc-900 sm:ml-auto">
                                    {formatCurrency(item.subtotal)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline & Summary (Spans 1 column) */}
                <div className="space-y-6">
                    
                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                        <h2 className="font-semibold text-zinc-900 text-lg mb-5">Order Summary</h2>
                        <div className="space-y-3 text-sm text-zinc-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-zinc-900">{formatCurrency(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="border-t border-zinc-100 pt-4 mt-4 flex justify-between items-center">
                                <span className="font-medium text-zinc-900">Total</span>
                                <span className="font-bold text-xl text-primary">
                                    {formatCurrency(order.totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline Stepper */}
                    <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Clock size={20} className="text-zinc-400" />
                            <h2 className="font-semibold text-zinc-900 text-lg">Order Timeline</h2>
                        </div>

                        <div className="relative pl-3 space-y-8">
                            {/* Vertical Line behind dots */}
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-zinc-100"></div>

                            {timelineSteps.map((step, index) => {
                                const isCompleted = index <= currentStep;
                                const isCurrent = index === currentStep;

                                return (
                                    <div key={step} className="relative flex gap-5 items-start">
                                        {/* Dot */}
                                        <div 
                                            className={`w-4 h-4 rounded-full mt-1 z-10 ring-4 ring-white shrink-0 transition-colors duration-300 ${
                                                isCompleted ? "bg-green-500" : "bg-zinc-200"
                                            } ${isCurrent ? "ring-green-50" : ""}`}
                                        />
                                        
                                        {/* Content */}
                                        <div>
                                            <h3 className={`font-medium capitalize leading-none ${
                                                isCompleted ? "text-zinc-900" : "text-zinc-400"
                                            }`}>
                                                {step}
                                            </h3>
                                            <p className="text-xs text-zinc-500 mt-1.5">
                                                {isCompleted ? "Completed" : "Pending"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewOrder;