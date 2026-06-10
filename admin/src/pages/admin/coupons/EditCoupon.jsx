import { useParams } from "react-router-dom";

import CouponForm from "../../../components/coupons/CouponForm";
import couponsData from "../../../data/couponsData";

const EditCoupon = () => {
  const { id } =
    useParams();

  const coupon =
    couponsData.find(
      (item) =>
        item.id ===
        Number(id)
    );

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