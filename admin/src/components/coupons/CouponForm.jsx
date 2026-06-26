import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const defaultFormData = {
  code: "",
  discountType: "Percentage",
  discountValue: "",
  minOrderAmount: "",
  maxDiscount: "",
  usageLimit: "",
  expiryDate: "",
  description: "",
  status: "Active",
};

const CouponForm = ({
  initialData = defaultFormData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState(initialData);
 
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
        toast.error("Coupon code is required");
        return;
    }

    if (!formData.discountValue) {
        toast.error("Discount value is required");
        return;
    }

    if (!formData.expiryDate) {
        toast.error("Expiry date is required");
        return;
    }

    try {

        if (isEdit) {

            await api.put(
                `/coupons/${initialData._id}`,
                formData
            );

            toast.success(
                "Coupon updated successfully"
            );

        } else {

            await api.post(
                "/coupons",
                formData
            );

            toast.success(
                "Coupon created successfully"
            );

            setFormData(defaultFormData);

        }

        navigate("/admin/coupons");

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data?.message ||
            "Something went wrong"
        );

    }
};

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-8"
    >
      <div
        className="
        bg-white
        rounded-3xl
        border
        border-zinc-100
        p-6
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-6
          "
        >
          Coupon Information
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >
          {/* Coupon Code */}

          <div>
            <label className="block mb-2 font-medium">
              Coupon Code
            </label>

            <input
              type="text"
              name="code"
              value={
                formData.code
              }
              onChange={
                handleChange
              }
              placeholder="WELCOME10"
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            />
          </div>

          {/* Discount Type */}

          <div>
            <label className="block mb-2 font-medium">
              Discount Type
            </label>

            <select
              name="discountType"
              value={
                formData.discountType
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            >
              <option value="Percentage">
                Percentage
              </option>

              <option value="Fixed">
                Fixed
              </option>
            </select>
          </div>

          {/* Discount Value */}

          <div>
            <label className="block mb-2 font-medium">
              Discount Value
            </label>

            <input
              type="number"
              name="discountValue"
              value={
                formData.discountValue
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            />
          </div>

          {/* Min Order */}

          <div>
            <label className="block mb-2 font-medium">
              Min Order Amount
            </label>

            <input
              type="number"
              name="minOrderAmount"
              value={
                formData.minOrderAmount
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            />
          </div>

          {/* Max Discount */}

          <div>
            <label className="block mb-2 font-medium">
              Max Discount
            </label>

            <input
              type="number"
              name="maxDiscount"
              value={
                formData.maxDiscount
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            />
          </div>

          {/* Usage Limit */}

          <div>
            <label className="block mb-2 font-medium">
              Usage Limit
            </label>

            <input
              type="number"
              name="usageLimit"
              value={
                formData.usageLimit
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            />
          </div>

          {/* Expiry Date */}

          <div>
            <label className="block mb-2 font-medium">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={
                formData.expiryDate
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            />
          </div>

          {/* Status */}

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-2xl
              px-4
              py-3
              "
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* Description */}

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="
            w-full
            border
            rounded-2xl
            px-4
            py-3
            resize-none
            "
          />
        </div>
      </div>

      {/* Actions */}

      <div
        className="
        flex
        flex-col
        sm:flex-row
        gap-4
        "
      >
        <button
          type="submit"
          className="
          bg-primary
          text-white
          px-8
          py-3
          rounded-2xl
          "
        >
          {isEdit
            ? "Update Coupon"
            : "Create Coupon"}
        </button>

        <button
          type="button"
          className="
          border
          px-8
          py-3
          rounded-2xl
          "
          onClick={() =>
          navigate(
            "/admin/coupons/"
          )  }   >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CouponForm;