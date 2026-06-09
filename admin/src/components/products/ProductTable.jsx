import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const ProductTable = ({
  products,
  setDeleteModal,
  setSelectedProduct,
}) => {
  const navigate = useNavigate();

  const columns = [
    "Image",
    "Product",
    "Category",
    "Brand",
    "Price",
    "Stock",
    "Rating",
    "Status",
    "Actions",
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      renderRow={(product) => (
        <tr
          key={product.id}
          className="
            border-b
            border-zinc-100
            hover:bg-zinc-50
            transition
          "
        >
          {/* Image */}
          <td className="px-6 py-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              onClick={() =>
                navigate(
                  `/admin/products/view/${product.id}`
                )
              }
              className="
                w-14
                h-14
                rounded-xl
                object-cover
                cursor-pointer
                hover:scale-105
                transition
              "
            />
          </td>

          {/* Product */}
          <td className="px-6 py-4 min-w-[240px]">
            <div>
              <h3
                className="
                  font-semibold
                  text-zinc-800
                  line-clamp-1
                "
              >
                {product.title}
              </h3>

              <p
                className="
                  text-xs
                  text-zinc-500
                  mt-1
                "
              >
                SKU: {product.sku}
              </p>
            </div>
          </td>

          {/* Category */}
          <td className="px-6 py-4">
            {product.category}
          </td>

          {/* Brand */}
          <td className="px-6 py-4">
            {product.brand}
          </td>

          {/* Price */}
          <td className="px-6 py-4">
            <div>
              <p className="font-semibold">
                ₹{product.price}
              </p>

              {product.oldPrice && (
                <p
                  className="
                    text-xs
                    text-zinc-400
                    line-through
                  "
                >
                  ₹{product.oldPrice}
                </p>
              )}
            </div>
          </td>

          {/* Stock */}
          <td className="px-6 py-4">
            <div>
              <span className="font-medium">
                {product.quantity}
              </span>

              <p
                className="
                  text-xs
                  text-zinc-500
                "
              >
                Units
              </p>
            </div>
          </td>

          {/* Rating */}
          <td className="px-6 py-4">
            ⭐ {product.rating}
          </td>

          {/* Status */}
          <td className="px-6 py-4">
            <StatusBadge
              status={
                product.quantity > 0
                  ? "active"
                  : "inactive"
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
              {/* View */}
              <button
                title="View Product"
                className="
                  p-2
                  rounded-xl
                  hover:bg-primary/10
                  transition
                "
                onClick={() =>
                  navigate(
                    `/admin/products/view/${product.id}`
                  )
                }
              >
                <Eye
                  size={18}
                  className="text-primary"
                />
              </button>

              {/* Edit */}
              <button
                title="Edit Product"
                className="
                  p-2
                  rounded-xl
                  hover:bg-blue-100
                  transition
                "
                onClick={() =>
                  navigate(
                    `/admin/products/edit/${product.id}`
                  )
                }
              >
                <Pencil
                  size={18}
                  className="text-blue-500"
                />
              </button>

              {/* Delete */}
              <button
                title="Delete Product"
                className="
                  p-2
                  rounded-xl
                  hover:bg-red-100
                  transition
                "
                onClick={() => {
                  setSelectedProduct(
                    product
                  );

                  setDeleteModal(true);
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

export default ProductTable;