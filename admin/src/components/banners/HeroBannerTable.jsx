import {
  Pencil,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const HeroBannerTable = ({
  banners,
  setDeleteModal,
  setSelectedBanner,
}) => {
  const navigate =
    useNavigate();

  const columns = [
    "Banner",
    "Title",
    "Badge",
    "Top Tag",
    "Status",
    "Actions",
  ];

  return (
    <DataTable
      columns={columns}
      data={banners}
      renderRow={(banner) => (
        <tr
          key={banner._id}
          className="
  border-b
  border-zinc-100
  hover:bg-zinc-50
  transition-all
  duration-200
  "
        >
          {/* Banner */}

          <td className="px-6 py-5">
            <img
              src={
                banner.image ||
                "/images/no-image.png"
              }
              alt={banner.title}
              className="
      w-36
      h-20
      rounded-2xl
      object-cover
      border
      border-zinc-200
      shadow-sm
      "
            />
          </td>

          {/* Title */}

          <td className="px-6 py-5 min-w-[350px]">
            <div className="space-y-2">
              <h3
                className="
        font-semibold
        text-zinc-800
        text-base
        "
              >
                {banner.title}
              </h3>

              <p
                className="
        text-sm
        text-zinc-500
        leading-6
        max-w-md
        "
              >
                {banner.subtitle}
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
      font-semibold
      whitespace-nowrap
      "
            >
              {banner.badgeText}
            </span>
          </td>

          {/* Top Tag */}

          <td className="px-6 py-5">
            <span
              className="
      inline-flex
      items-center
      px-4
      py-2
      rounded-full
      bg-secondary
      text-zinc-700
      text-sm
      font-medium
      whitespace-nowrap
      "
            >
              {banner.topTag}
            </span>
          </td>

          {/* Status */}

          <td className="px-6 py-5">
            <StatusBadge
              status={
                banner.active
                  ? "Active"
                  : "Inactive"
              }
            />
          </td>

          {/* Actions */}

          <td className="px-6 py-5">
            <div className="flex items-center gap-3">

              <button
                title="Edit Banner"
                onClick={() =>
                  navigate(
                    `/admin/banners/edit/${banner._id}`
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
                title="Delete Banner"
                onClick={() => {
                  setSelectedBanner(
                    banner
                  );

                  setDeleteModal(true);
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

export default HeroBannerTable;