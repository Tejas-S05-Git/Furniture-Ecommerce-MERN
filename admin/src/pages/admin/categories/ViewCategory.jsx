import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

import CategoryDetailsCard from "../../../components/categories/CategoryDetailsCard";
import PageHeader from "../../../components/common/PageHeader";

const ViewCategory = () => {
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
        title="Category Details"
        subtitle="View category information"
      />

      <CategoryDetailsCard
        category={category}
      />
    </div>
  );
};

export default ViewCategory;