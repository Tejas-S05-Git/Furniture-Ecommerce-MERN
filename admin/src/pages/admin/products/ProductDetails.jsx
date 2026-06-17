import { useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] =useState(null);

  const [loading, setLoading] =useState(true);


  useEffect(() => {
  fetchProduct();
}, [id]);

const fetchProduct =
  async () => {
    try {
      const response =
        await api.get(
          `/products/${id}`
        );

      setProduct(
        response.data.product
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
  return (
    <div>
      Loading...
    </div>
  );
}

  if (!product) {
    return (
      <div>
        Product Not Found
      </div>
    );
  }

  return (
  <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 antialiased">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-100">
    <PageHeader
      title={product.title}
      subtitle="Product Details"
    />
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <button
        onClick={() => navigate("/admin/products")}
        className="flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 rounded-xl transition-colors duration-200"
      >
        Back
      </button>
      <button
        onClick={() => navigate(`/admin/products/edit/${product._id}`)}
        className="flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-xl shadow-sm transition-colors duration-200"
      >
        Edit Product
      </button>
    </div>
  </div>

  {/* Main Dashboard Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    {/* Left Column: Primary Product Content (Spans 2 columns on large screens) */}
    <div className="lg:col-span-2 space-y-6">
      
      {/* Product Gallery */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Product Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {product.images?.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100">
              <img
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Description</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          {product.shortDescription && (
            <p className="font-medium text-zinc-800 bg-zinc-50 p-4 rounded-xl border border-zinc-100/60">
              {product.shortDescription}
            </p>
          )}
          <p className="text-zinc-600 px-1">{product.description}</p>
        </div>
      </div>

      {/* Product Features */}
      {product.features && product.features.length > 0 && (
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 rounded-xl bg-secondary text-sm font-medium text-zinc-800 border border-zinc-100/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information Table Structure for clean look */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Logistics & Additional Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <Info label="Material" value={product.additionalInformation?.material} />
          <Info label="Weight" value={product.additionalInformation?.weight} />
          <Info label="Dimensions" value={product.additionalInformation?.dimensions} />
          <Info label="Warranty" value={product.additionalInformation?.warranty} />
          <Info label="Shipping" value={product.additionalInformation?.shipping} />
          <Info label="Return Policy" value={product.additionalInformation?.returnPolicy} />
        </div>
      </div>
    </div>

    {/* Right Column: Metadata, Pricing & Stock Status */}
    <div className="space-y-6">
      
      {/* Pricing & Stock Card */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm divide-y divide-zinc-100">
        <div className="pb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Pricing Details</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-zinc-900">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-zinc-400 line-through">₹{product.oldPrice}</span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="inline-flex mt-2 items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
              Save ₹{product.discount}
            </span>
          )}
        </div>

        <div className="py-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Inventory Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-400">Total Quantity</p>
              <p className="text-lg font-semibold text-zinc-800">{product.quantity}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Status</p>
              <p className="text-lg font-semibold text-zinc-800">{product.stockText}</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Info label="SKU / Model Number" value={product.sku} />
        </div>
      </div>

      {/* Basic Information & Attributes */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-zinc-900">Specifications</h2>
        <div className="space-y-3">
          <Info label="Category" value={product.category?.name} />
          <Info label="Brand" value={product.brand} />
          <Info label="Core Material" value={product.material} />
          <Info label="Primary Color" value={product.color} />
        </div>

        {/* Dynamic Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-xs font-medium text-zinc-400 mb-2">Available Colors Variants</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border border-zinc-200 shadow-sm transition-transform hover:scale-110"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Product Tags</h2>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs font-medium rounded-xl bg-primary/10 text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
    </div>
  </div>
</div>
  );
};

export default ProductDetails;