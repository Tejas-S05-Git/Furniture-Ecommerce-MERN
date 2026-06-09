import { useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import ProductForm from "../../../components/products/ProductForm";
import { productsData } from "../../../data/productsData";

const EditProduct = () => {
  const { id } = useParams();

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