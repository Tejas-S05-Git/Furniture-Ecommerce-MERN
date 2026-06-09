

import CategoryDetailsCard from "../../../components/categories/CategoryDetailsCard";
import PageHeader from "../../../components/common/PageHeader";
import { categoriesData } from "../../../data/categoriesData";

const ViewCategory = () => {
  const category = categoriesData[0];

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