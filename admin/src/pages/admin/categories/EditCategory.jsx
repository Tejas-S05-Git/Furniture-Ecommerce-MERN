import CategoryForm from "../../../components/categories/CategoryForm";
import PageHeader from "../../../components/common/PageHeader";


const EditCategory = () => {
  return (
    <div className="space-y-8">

      <PageHeader
        title="Edit Category"
        subtitle="Update category details"
      />

      <CategoryForm />

    </div>
  );
};

export default EditCategory;