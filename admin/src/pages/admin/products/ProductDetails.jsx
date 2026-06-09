import { useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import { productsData } from "../../../data/productsData";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Info = ({
    label,
    value,
  }) => {
    return (
      <div>
        <p
          className="
        text-sm
        text-zinc-500
      "
        >
          {label}
        </p>

        <h4
          className="
        font-medium
        mt-1
      "
        >
          {value}
        </h4>
      </div>
    );
  };

  const product =
    productsData.find(
      (item) =>
        item.id === Number(id)
    );

  if (!product) {
    return (
      <div>
        Product Not Found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title={product.title}
        subtitle="Product Details"
      />
      <div className="flex gap-4">
        <button
  onClick={() =>
    navigate(
      `/admin/products/edit/${product.id}`
    )
  }
  className="
    bg-primary
    text-white
    px-5
    py-3
    rounded-2xl
    w-full
    sm:w-auto
  "
>
  Edit Product
</button>

        <button
  onClick={() =>
    navigate("/admin/products")
  }
  className="
    border
    px-5
    py-3
    rounded-2xl
    w-full
    sm:w-auto
  "
>
  Back
</button>
      </div>

      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2
          className="
    text-xl
    font-semibold
    mb-6
  "
        >
          Product Gallery
        </h2>

        <div
          className="
    grid
    grid-cols-2
    md:grid-cols-4
    gap-4
  "
        >
          {product.images.map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="
          h-44
          w-full
          object-cover
          rounded-2xl
        "
              />
            )
          )}
        </div>
      </div>
      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Product Name"
            value={product.title}
          />

          <Info
            label="Category"
            value={product.category}
          />

          <Info
            label="Brand"
            value={product.brand}
          />

          <Info
            label="SKU"
            value={product.sku}
          />

        </div>
      </div>

      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Pricing Information
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Info
            label="Price"
            value={`₹${product.price}`}
          />

          <Info
            label="Old Price"
            value={`₹${product.oldPrice}`}
          />

          <Info
            label="Discount"
            value={`₹${product.discount}`}
          />

        </div>
      </div>

      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Inventory Information
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Info
            label="Quantity"
            value={product.quantity}
          />

          <Info
            label="Stock Status"
            value={product.stockText}
          />

          <Info
            label="SKU"
            value={product.sku}
          />

        </div>
      </div>
      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Product Attributes
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Material"
            value={product.material}
          />

          <Info
            label="Color"
            value={product.color}
          />

        </div>

        <div className="mt-6">
          <p className="text-sm text-zinc-500 mb-3">
            Available Colors
          </p>

          <div className="flex gap-3 flex-wrap">
            {product.colors.map(
              (color, index) => (
                <div
                  key={index}
                  className="
            w-10
            h-10
            rounded-full
            border
          "
                  style={{
                    backgroundColor:
                      color,
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Description
        </h2>

        <p className="text-zinc-600">
          {product.shortDescription}
        </p>

        <div className="mt-5">
          <p className="text-zinc-600">
            {product.description}
          </p>
        </div>
      </div>
      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Product Features
        </h2>

        <div className="space-y-3">

          {product.features.map(
            (feature, index) => (
              <div
                key={index}
                className="
          px-4
          py-3
          rounded-2xl
          bg-secondary
        "
              >
                {feature}
              </div>
            )
          )}

        </div>
      </div>
      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Additional Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            label="Material"
            value={
              product
                .additionalInformation
                .material
            }
          />

          <Info
            label="Weight"
            value={
              product
                .additionalInformation
                .weight
            }
          />

          <Info
            label="Dimensions"
            value={
              product
                .additionalInformation
                .dimensions
            }
          />

          <Info
            label="Warranty"
            value={
              product
                .additionalInformation
                .warranty
            }
          />

          <Info
            label="Shipping"
            value={
              product
                .additionalInformation
                .shipping
            }
          />

          <Info
            label="Return Policy"
            value={
              product
                .additionalInformation
                .returnPolicy
            }
          />

        </div>
      </div>
      <div
        className="
  bg-white
  rounded-3xl
  border
  border-zinc-100
  p-6
"
      >
        <h2 className="text-xl font-semibold mb-6">
          Product Tags
        </h2>

        <div className="flex flex-wrap gap-3">

          {product.tags.map(
            (tag, index) => (
              <span
                key={index}
                className="
          px-4
          py-2
          rounded-full
          bg-primary/10
          text-primary
        "
              >
                {tag}
              </span>
            )
          )}

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;