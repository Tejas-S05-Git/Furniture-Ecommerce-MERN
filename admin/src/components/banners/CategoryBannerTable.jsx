import {
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const CategoryBannerTable = ({
  banners,
  setDeleteModal,
  setSelectedBanner,
}) => {
  const navigate =
    useNavigate();

  const columns = [
    "Category",
    "Products",
    "Rating",
    "Starting Price",
    "Badge",
    "Status",
    "Actions",
  ];

  return (
    <DataTable
      columns={columns}
      data={banners}
      renderRow={(banner) => (
        <tr
          key={banner.id}
          className="
          border-b
          border-zinc-100
          hover:bg-zinc-50
          transition-all
          duration-200
          "
        >
          {/* Category */}

          <td className="px-6 py-5">
            <div className="flex items-center gap-4">

              <img
                src={banner.image}
                alt={banner.title}
                className="
                w-20
                h-20
                rounded-2xl
                object-cover
                border
                border-zinc-200
                shadow-sm
                "
              />

              <div>
                <h3
                  className="
                  font-semibold
                  text-zinc-800
                  "
                >
                  {banner.title}
                </h3>

                <p
                  className="
                  text-sm
                  text-zinc-500
                  mt-1
                  "
                >
                  Category Banner
                </p>
              </div>

            </div>
          </td>

          {/* Products */}

          <td className="px-6 py-5">
            <div>
              <h3 className="font-semibold">
                {banner.itemsCount}
              </h3>

              <p
                className="
                text-xs
                text-zinc-500
                "
              >
                Products
              </p>
            </div>
          </td>

          {/* Rating */}

          <td className="px-6 py-5">
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Star
                size={16}
                fill="currentColor"
                className="
                text-yellow-500
                "
              />

              <span className="font-medium">
                {banner.rating}
              </span>
            </div>
          </td>

          {/* Price */}

          <td className="px-6 py-5">
            <div>
              <h3 className="font-semibold">
                ₹
                {banner.startingPrice.toLocaleString()}
              </h3>

              <p
                className="
                text-xs
                text-zinc-500
                "
              >
                Starting From
              </p>
            </div>
          </td>

          {/* Badge */}

          <td className="px-6 py-5">
            <span
              className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-primary/10
              text-primary
              text-sm
              font-medium
              "
            >
              {banner.badge}
            </span>
          </td>

          {/* Status */}

          <td className="px-6 py-5">
            <StatusBadge
              status={
                banner.status
              }
            />
          </td>

          {/* Actions */}

          <td className="px-6 py-5">
            <div className="flex items-center gap-3">

              <button
                title="Edit Category Banner"
                onClick={() =>
                  navigate(
                    `/admin/category-banners/edit/${banner.id}`
                  )
                }
                className="
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                bg-blue-50
                hover:bg-blue-100
                transition
                "
              >
                <Pencil
                  size={18}
                  className="text-blue-600"
                />
              </button>

              <button
                title="Delete Category Banner"
                onClick={() => {
                  setSelectedBanner(
                    banner
                  );

                  setDeleteModal(
                    true
                  );
                }}
                className="
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                bg-red-50
                hover:bg-red-100
                transition
                "
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

export default CategoryBannerTable;