const ordersData = [
  {
    id: "ORD1001",

    customer: {
      name: "Tejas Salunkhe",
      email: "tejas@gmail.com",
      phone: "+91 9876543210",
    },

    products: [
      {
        id: 1,
        title: "Rustic Wooden Bed",
        quantity: 1,
        price: 450,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      },
    ],

    totalAmount: 450,

    paymentMethod: "COD",

    paymentStatus: "Paid",

    orderStatus: "Delivered",

    shippingAddress:
      "Khopoli, Maharashtra, India",

    createdAt: "2026-06-01",
  },

  {
    id: "ORD1002",

    customer: {
      name: "Aniket Salunkhe",
      email: "aniket@gmail.com",
      phone: "+91 9988776655",
    },

    products: [
      {
        id: 2,
        title: "Luxury Sofa",
        quantity: 2,
        price: 500,
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      },
    ],

    totalAmount: 1000,

    paymentMethod: "Razorpay",

    paymentStatus: "Paid",

    orderStatus: "Processing",

    shippingAddress:
      "Pune, Maharashtra, India",

    createdAt: "2026-06-03",
  },

  {
    id: "ORD1003",

    customer: {
      name: "Shubham Chavan",
      email: "shubham@gmail.com",
      phone: "+91 8899776655",
    },

    products: [
      {
        id: 3,
        title: "Dining Table",
        quantity: 1,
        price: 750,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      },
    ],

    totalAmount: 750,

    paymentMethod: "COD",

    paymentStatus: "Pending",

    orderStatus: "Pending",

    shippingAddress:
      "Mumbai, Maharashtra, India",

    createdAt: "2026-06-04",
  },

  {
    id: "ORD1004",

    customer: {
      name: "Sumit Patil",
      email: "sumit@gmail.com",
      phone: "+91 7766554433",
    },

    products: [
      {
        id: 4,
        title: "Office Chair",
        quantity: 3,
        price: 200,
        image:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
      },
    ],

    totalAmount: 600,

    paymentMethod: "UPI",

    paymentStatus: "Paid",

    orderStatus: "Shipped",

    shippingAddress:
      "Navi Mumbai, Maharashtra, India",

    createdAt: "2026-06-06",
  },

  {
    id: "ORD1005",

    customer: {
      name: "Rahul Patil",
      email: "rahul@gmail.com",
      phone: "+91 9871234567",
    },

    products: [
      {
        id: 5,
        title: "Bookshelf",
        quantity: 1,
        price: 320,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      },
    ],

    totalAmount: 320,

    paymentMethod: "COD",

    paymentStatus: "Refunded",

    orderStatus: "Cancelled",

    shippingAddress:
      "Nagpur, Maharashtra, India",

    createdAt: "2026-06-07",
  },
];

export default ordersData;