import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../services/api";

import CategoryForm from "../../../components/categories/CategoryForm";
import PageHeader from "../../../components/common/PageHeader";

const EditCategory = () => {
  const { id } = useParams();

  const [category, setCategory] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory =
    async () => {
      try {
        const response =
          await api.get(
            `/categories/${id}`
          );

        setCategory(
          response.data.category
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading)
    return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Category"
        subtitle="Update category details"
      />

      <CategoryForm
        initialData={category}
        isEdit={true}
      />
    </div>
  );
};

export default EditCategory;