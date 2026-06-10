const couponsData = [
  {
    id: 1,

    code: "WELCOME10",

    discountType: "Percentage",

    discountValue: 10,

    minOrderAmount: 1000,

    maxDiscount: 500,

    usageLimit: 100,

    usedCount: 25,

    expiryDate: "2026-12-31",

    status: "Active",

    description:
      "10% off for new customers",
  },

  {
    id: 2,

    code: "FLAT500",

    discountType: "Fixed",

    discountValue: 500,

    minOrderAmount: 3000,

    maxDiscount: null,

    usageLimit: 50,

    usedCount: 12,

    expiryDate: "2026-11-30",

    status: "Active",

    description:
      "Flat ₹500 off on orders above ₹3000",
  },

  {
    id: 3,

    code: "SUMMER15",

    discountType: "Percentage",

    discountValue: 15,

    minOrderAmount: 2000,

    maxDiscount: 1000,

    usageLimit: 200,

    usedCount: 89,

    expiryDate: "2026-08-31",

    status: "Active",

    description:
      "Summer sale special offer",
  },

  {
    id: 4,

    code: "FURNITURE20",

    discountType: "Percentage",

    discountValue: 20,

    minOrderAmount: 5000,

    maxDiscount: 1500,

    usageLimit: 100,

    usedCount: 100,

    expiryDate: "2026-07-31",

    status: "Expired",

    description:
      "Furniture festival offer",
  },

  {
    id: 5,

    code: "NEWUSER",

    discountType: "Fixed",

    discountValue: 300,

    minOrderAmount: 1500,

    maxDiscount: null,

    usageLimit: 500,

    usedCount: 55,

    expiryDate: "2026-12-15",

    status: "Active",

    description:
      "New user welcome coupon",
  },

  {
    id: 6,

    code: "FLASHSALE",

    discountType: "Percentage",

    discountValue: 25,

    minOrderAmount: 4000,

    maxDiscount: 2000,

    usageLimit: 50,

    usedCount: 31,

    expiryDate: "2026-09-15",

    status: "Inactive",

    description:
      "Limited time flash sale coupon",
  },
];

export default couponsData;