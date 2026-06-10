import { useParams } from "react-router-dom";



import categoryBannersData from "../../../data/categoryBannersData";
import CategoryBannerForm from "../../../components/banners/CategoryBannerForm";

const EditCategoryBanner = () => {
  const { id } =
    useParams();

  const banner =
    categoryBannersData.find(
      (item) =>
        item.id ===
        Number(id)
    );

  return (
    <CategoryBannerForm
      initialData={banner}
      isEdit={true}
    />
  );
};

export default EditCategoryBanner;