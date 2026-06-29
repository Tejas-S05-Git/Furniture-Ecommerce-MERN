import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../../../services/api";

import CategoryBannerForm from "../../../components/banners/CategoryBannerForm";

const EditCategoryBanner = () => {

  const { id } = useParams();

  const [banner, setBanner] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchBanner =
    async () => {

      try {

        const response =
          await api.get(
            `/category-banners/${id}`
          );

        setBanner(
          response.data.banner
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Category Banner not found"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchBanner();

  }, [id]);

  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  }

  if (!banner) {

    return (
      <div className="p-10 text-center">
        Banner Not Found
      </div>
    );

  }

  return (

    <CategoryBannerForm
      initialData={banner}
      isEdit={true}
    />

  );

};

export default EditCategoryBanner;