import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const CategoryTable = ({
  categories,
  setDeleteModal,
  setSelectedCategory,
}) => {
  const columns = [
    "Image",
    "Category",
    "Products",
    "Status",
    "Created",
    "Actions",
  ];
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={categories}
      renderRow={(category) => (
        <tr
          key={category._id}
          className="border-b"
        >
          <td className="px-6 py-4">
            <img
              src={category.image}
              alt=""
              className="
              w-14
              h-14
              rounded-xl
              object-cover
              "
            />
          </td>

          <td className="px-6 py-4 font-medium">
            {category.name}
          </td>

          <td className="px-6 py-4">
            {category.productCount || 0}
          </td>

          <td className="px-6 py-4">
            <StatusBadge
              status={category.status}
            />
          </td>

          <td className="px-6 py-4">
            {new Date(
              category.createdAt
            ).toLocaleDateString()}
          </td>

          <td className="px-6 py-4">
            <div className="flex gap-3">
              <button>
                <Eye
                  onClick={() =>
                    navigate(
                      `/admin/categories/view/${category._id}`
                    )
                  }
                  size={18}
                  className="text-primary"
                />
              </button>

              <button>
                <Pencil
                  onClick={() =>
                    navigate(
                      `/admin/categories/edit/${category._id}`
                    )
                  }
                  size={18}
                  className="text-blue-500"
                />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setDeleteModal(true);
                }}>

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

export default CategoryTable;