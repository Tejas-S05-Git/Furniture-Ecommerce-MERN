import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const CustomerTable = ({
  customers,
  setDeleteModal,
  setSelectedCustomer,
}) => {
  const navigate = useNavigate();

  const columns = [
    "Customer",
    "Phone",
    "Orders",
    "Spent",
    "Status",
    "Joined",
    "Actions",
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DataTable
      columns={columns}
      data={customers}
      renderRow={(customer) => (
        <tr
          key={customer._id}
          className="group border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors duration-200"
        >
          {/* Customer Identifiers with Avatar layout */}
          <td className="px-6 py-4 whitespace-nowrap min-w-[260px]">
            <div className="flex items-center gap-3">
              <img
                src={
                  customer.avatar ||
                  `https://ui-avatars.com/api/?name=${customer.firstName}+${customer.lastName}&background=f4f4f5&color=18181b`
                }
                alt={`${customer.firstName}'s avatar`}
                className="w-10 h-10 rounded-full object-cover border border-zinc-200 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-900 capitalize">
                  {customer.firstName} {customer.lastName}
                </span>
                <span className="text-xs text-zinc-500 mt-0.5">
                  {customer.email}
                </span>
              </div>
            </div>
          </td>

          {/* Contact Details */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-zinc-600 font-medium">
              {customer.phone || "—"}
            </span>
          </td>

          {/* Core Metrics Counts */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800">
              {customer.totalOrders || 0} Orders
            </span>
          </td>

          {/* Financial Spend Tracker */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm font-bold text-zinc-900">
              {formatCurrency(customer.totalSpent)}
            </span>
          </td>

          {/* Customer Profiling System State */}
          <td className="px-6 py-4 whitespace-nowrap">
            <StatusBadge status={customer.isActive ? "active" : "inactive"} />
          </td>

          {/* Historical Created Timestamp */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-zinc-500">
              {formatDate(customer.createdAt)}
            </span>
          </td>

          {/* Row Context Options Actions */}
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <div className="flex items-center gap-2 justify-start md:opacity-50 group-hover:opacity-100 transition-opacity">
              <button
                title="View Customer Profile"
                className="p-2 rounded-lg text-zinc-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                onClick={() => navigate(`/admin/customers/view/${customer._id}`)}
              >
                <Eye size={18} strokeWidth={2.5} />
              </button>

              <button
                title="Delete Customer Profile"
                className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setDeleteModal(true);
                }}
              >
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default CustomerTable;