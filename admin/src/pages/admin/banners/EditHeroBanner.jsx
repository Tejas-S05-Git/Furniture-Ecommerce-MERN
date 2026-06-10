import { useParams } from "react-router-dom";

import HeroBannerForm from "../../../components/banners/HeroBannerForm";

import heroBannersData from "../../../data/heroBannersData";

const EditHeroBanner = () => {
  const { id } =
    useParams();

  const banner =
    heroBannersData.find(
      (item) =>
        item.id ===
        Number(id)
    );

  return (
    <HeroBannerForm
      initialData={banner}
      isEdit={true}
    />
  );
};

export default EditHeroBanner;