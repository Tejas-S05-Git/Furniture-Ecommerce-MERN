import {
  Eye,
  Trash2,
} from "lucide-react";

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

  return (
    <DataTable
      columns={columns}
      data={customers}
      renderRow={(customer) => (
        <tr
          key={customer._id}
          className="
          border-b
          border-zinc-100
          hover:bg-zinc-50
          transition
          "
        >
          {/* Customer */}

          <td className="px-6 py-4 min-w-[260px]">
            <div className="flex items-center gap-4">
             <img
  src={
    customer.avatar ||
    "https://ui-avatars.com/api/?name=" +
      customer.firstName
  }
  alt={customer.firstName}
/>

              <div>
                <h3
                  className="
                  font-semibold
                  text-zinc-800
                  "
                >
                  {
                    `${customer.firstName} ${customer.lastName}`
                  }
                </h3>

                <p
                  className="
                  text-sm
                  text-zinc-500
                  "
                >
                  {
                    customer.email
                  }
                </p>
              </div>
            </div>
          </td>

          {/* Phone */}

          <td className="px-6 py-4">
            {customer.phone || "N/A"}
          </td>

          {/* Orders */}

          <td className="px-6 py-4">
            <span className="font-medium">
              {
                customer.totalOrders
              }
            </span>
          </td>

          {/* Spent */}

          <td className="px-6 py-4">
            <span className="font-semibold">
              ₹
              {
                customer.totalSpent
              }
            </span>
          </td>

          {/* Status */}

          <td className="px-6 py-4">
            <StatusBadge
              status={
                customer.isActive
                  ? "active"
                  : "inactive"
              }
            />
          </td>

          {/* Joined */}

          <td className="px-6 py-4">
            {
              new Date(
                customer.createdAt
              ).toLocaleDateString()
            }
          </td>

          {/* Actions */}

          <td className="px-6 py-4">
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              {/* View */}

              <button
                title="View Customer"
                className="
                p-2
                rounded-xl
                hover:bg-primary/10
                transition
                "
                onClick={() =>
                  navigate(
                    `/admin/customers/view/${customer._id}`
                  )
                }
              >
                <Eye
                  size={18}
                  className="text-primary"
                />
              </button>

              {/* Delete */}

              <button
                title="Delete Customer"
                className="
                p-2
                rounded-xl
                hover:bg-red-100
                transition
                "
                onClick={() => {
                  setSelectedCustomer(
                    customer
                  );

                  setDeleteModal(
                    true
                  );
                }}
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default CustomerTable;