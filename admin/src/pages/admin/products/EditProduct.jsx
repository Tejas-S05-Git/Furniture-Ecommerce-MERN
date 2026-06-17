import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../services/api";

import PageHeader from "../../../components/common/PageHeader";
import ProductForm from "../../../components/products/ProductForm";

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!product) {
    return (
      <div>Product Not Found</div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Product"
        subtitle="Update product details"
      />

      <ProductForm
        initialData={product}
        isEdit={true}
      />
    </div>
  );
};

export default EditProduct;