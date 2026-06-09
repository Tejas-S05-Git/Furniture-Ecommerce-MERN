import CategoryForm from "../../../components/categories/CategoryForm";
import PageHeader from "../../../components/common/PageHeader";

const AddCategory = () => {
  return (
    <div className="space-y-8">

      <PageHeader
        title="Add Category"
        subtitle="Create a new furniture category"
      />

      <CategoryForm />

    </div>
  );
};

export default AddCategory;