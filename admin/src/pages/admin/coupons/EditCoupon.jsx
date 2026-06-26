import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";
import CouponForm from "../../../components/coupons/CouponForm";

const EditCoupon = () => {
  const { id } =
    useParams();

  const [coupon, setCoupon] =
  useState(null);

const [loading, setLoading] =
  useState(true);


  useEffect(() => {
  fetchCoupon();
}, []);

const fetchCoupon = async () => {
  try {
    const res =
      await api.get(
        `/coupons/${id}`
      );

    setCoupon(
      res.data.coupon
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Coupon not found"
    );

  } finally {

    setLoading(false);

  }
};


if (loading) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}

if (!coupon) {
  return null;
}

  return (
    <CouponForm
      initialData={
        coupon
      }
      isEdit={true}
    />
  );
};

export default EditCoupon;