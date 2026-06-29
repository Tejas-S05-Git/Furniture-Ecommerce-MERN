import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeroBannerForm from "../../../components/banners/HeroBannerForm";

import api from "../../../services/api";

import toast from "react-hot-toast";

const EditHeroBanner = () => {

  const { id } = useParams();

  const [banner, setBanner] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchBanner = async () => {

    try {

      const res =
        await api.get(
          `/hero-banners/${id}`
        );

      setBanner(
        res.data.banner
      );

    }

    catch (error) {

      toast.error(
        "Banner not found"
      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBanner();

  }, []);

  if (loading) {

    return <p>Loading...</p>;

  }

  if (!banner) {

    return <p>Banner Not Found</p>;

  }

  return (

    <HeroBannerForm
      initialData={banner}
      isEdit={true}
    />

  );

};

export default EditHeroBanner;