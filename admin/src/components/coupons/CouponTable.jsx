import {
  Pencil,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const CouponTable = ({
  coupons,
  setDeleteModal,
  setSelectedCoupon,
}) => {
  const navigate =
    useNavigate();

  const columns = [
    "Code",
    "Type",
    "Discount",
    "Min Order",
    "Usage",
    "Expiry",
    "Status",
    "Actions",
  ];

  return (
    <DataTable
      columns={columns}
      data={coupons}
      renderRow={(coupon) => (
        <tr
          key={coupon._id}
          className="
          border-b
          border-zinc-100
          hover:bg-zinc-50
          transition
          "
        >
          {/* Code */}

          <td className="px-6 py-4">
            <div>
              <h3
                className="
                font-semibold
                text-primary
                "
              >
                {coupon.code}
              </h3>

              <p
                className="
                text-xs
                text-zinc-500
                mt-1
                "
              >
                {coupon.description}
              </p>
            </div>
          </td>

          {/* Type */}

          <td className="px-6 py-4">
            <span
              className="
              px-3
              py-1
              rounded-full
              bg-secondary
              text-sm
              "
            >
              {coupon.discountType}
            </span>
          </td>

          {/* Discount */}

          <td className="px-6 py-4">
            <div>
              <h3 className="font-medium">
                {coupon.discountType ===
                  "Percentage"
                  ? `${coupon.discountValue}%`
                  : `₹${coupon.discountValue}`}
              </h3>

              {coupon.discountType ===
                "Percentage" &&
                coupon.maxDiscount > 0 && (
                  <p
                    className="
                  text-xs
                  text-zinc-500
                  "
                  >
                    Max ₹
                    {
                      coupon.maxDiscount
                    }
                  </p>
                )}
            </div>
          </td>

          {/* Min Order */}

          <td className="px-6 py-4">
            ₹
            {
              coupon.minOrderAmount
            }
          </td>

          {/* Usage */}

          <td className="px-6 py-4">
            <div>
              <h3 className="font-medium">
                {
                  coupon.usedCount
                }
                /
                {
                  coupon.usageLimit
                }
              </h3>

              <div
                className="
                w-full
                bg-zinc-200
                rounded-full
                h-2
                mt-2
                "
              >
                <div
                  className="
                  bg-primary
                  h-2
                  rounded-full
                  "
                  style={{
                    width: `${coupon.usageLimit > 0
                        ? (coupon.usedCount /
                          coupon.usageLimit) *
                        100
                        : 0
                      }%`,
                  }}
                />
              </div>
            </div>
          </td>

          {/* Expiry */}

          <td className="px-6 py-4 whitespace-nowrap">
            {new Date(
              coupon.expiryDate
            ).toLocaleDateString()}
          </td>

          {/* Status */}

          <td className="px-6 py-4">
            <StatusBadge
              status={
                coupon.status
              }
            />
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
              <button
                title="Edit Coupon"
                className="
                p-2
                rounded-xl
                hover:bg-blue-100
                transition
                "
                onClick={() =>
                  navigate(
                    `/admin/coupons/edit/${coupon._id}`
                  )
                }
              >
                <Pencil
                  size={18}
                  className="
                  text-blue-600
                  "
                />
              </button>

              <button
                title="Delete Coupon"
                className="
                p-2
                rounded-xl
                hover:bg-red-100
                transition
                "
                onClick={() => {
                  setSelectedCoupon(
                    coupon
                  );

                  setDeleteModal(
                    true
                  );
                }}
              >
                <Trash2
                  size={18}
                  className="
                  text-red-500
                  "
                />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default CouponTable;