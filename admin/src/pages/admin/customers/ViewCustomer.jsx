import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Calendar,
  User,
  Loader2,
} from "lucide-react";

import StatusBadge from "../../../components/common/StatusBadge";
import api from "../../../services/api";

const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data.customer);
      setOrders(response.data.orders);
      setTotalOrders(response.data.totalOrders);
      setTotalSpent(response.data.totalSpent);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-zinc-500 font-medium">Fetching customer records...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 shadow-sm mt-6">
        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-zinc-400" />
        </div>
        <h2 className="text-xl font-bold text-zinc-800">Customer Not Found</h2>
        <p className="text-zinc-500 mt-2">The record you are looking for does not exist.</p>
        <button onClick={() => navigate(-1)} className="mt-6 text-primary font-medium hover:underline">
          &larr; Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition-colors mb-3 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Customers
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Customer Profile
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage profile configurations, view core spending patterns, and past histories.
          </p>
        </div>
      </div>

      {/* --- MAIN SPLIT LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT PROFILE WRAPPER */}
        <div className="space-y-6">
          
          {/* Main User Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 text-center shadow-sm">
            <div className="relative inline-block">
              <img
                src={
                  customer.avatar ||
                  `https://ui-avatars.com/api/?name=${customer.firstName}+${customer.lastName}&background=f4f4f5&color=18181b`
                }
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-zinc-100 p-0.5 mx-auto"
              />
            </div>

            <h2 className="text-xl font-bold text-zinc-900 mt-4 capitalize">
              {customer.firstName} {customer.lastName}
            </h2>
            <p className="text-sm text-zinc-500 mt-0.5 break-all">{customer.email}</p>

            <div className="mt-4 inline-flex">
              <StatusBadge status={customer.isActive ? "active" : "inactive"} />
            </div>
          </div>

          {/* Core Counter Analytics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Total Orders</p>
                <h2 className="text-2xl font-bold text-zinc-900 mt-1.5">{totalOrders}</h2>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Total Value Placed</p>
                <h2 className="text-2xl font-bold text-zinc-900 mt-1.5">{formatCurrency(totalSpent)}</h2>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <IndianRupee size={20} strokeWidth={2.5} />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT ANALYTICS & DETAILS PANEL */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Information Parameters */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 border-b border-zinc-100 pb-4 mb-5">
              Contact Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-sm">
              <div>
                <p className="text-zinc-400 font-medium">Customer Identity</p>
                <h3 className="font-medium text-zinc-900 mt-1 capitalize">
                  {customer.firstName} {customer.lastName}
                </h3>
              </div>

              <div>
                <p className="text-zinc-400 font-medium">Email Destination</p>
                <h3 className="font-medium text-zinc-900 mt-1 flex items-center gap-2">
                  <Mail size={15} className="text-zinc-400" />
                  {customer.email}
                </h3>
              </div>

              <div>
                <p className="text-zinc-400 font-medium">Phone Specification</p>
                <h3 className="font-medium text-zinc-900 mt-1 flex items-center gap-2">
                  <Phone size={15} className="text-zinc-400" />
                  {customer.phone || "Not Shared"}
                </h3>
              </div>

              <div>
                <p className="text-zinc-400 font-medium">Registration Timestamp</p>
                <h3 className="font-medium text-zinc-900 mt-1 flex items-center gap-2">
                  <Calendar size={15} className="text-zinc-400" />
                  {formatDate(customer.createdAt)}
                </h3>
              </div>
            </div>
          </div>

          {/* Saved Address Block */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-zinc-400" />
              Primary Shipping Address
            </h2>
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 text-sm text-zinc-700 leading-relaxed">
              {customer.address || "No custom shipping address configuration has been assigned yet."}
            </div>
          </div>

          {/* Nested Recent Activity Histories Sub-table */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 bg-zinc-50/50">
              <h2 className="text-lg font-semibold text-zinc-900">
                Recent Ledger Activity
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/30 text-zinc-500 font-medium">
                    <th className="px-6 py-3.5">Reference ID</th>
                    <th className="px-6 py-3.5">Amount Placed</th>
                    <th className="px-6 py-3.5">Workflow Status</th>
                    <th className="px-6 py-3.5">Creation Timestamp</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-xs text-zinc-600 tracking-tight uppercase whitespace-nowrap">
                          #{order._id.slice(-8)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-zinc-900 whitespace-nowrap">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={order.orderStatus} />
                        </td>
                        <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-zinc-400 font-medium bg-white">
                        <ShoppingBag size={32} className="mx-auto text-zinc-300 mb-2" />
                        No transaction histories linked to this profile.
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