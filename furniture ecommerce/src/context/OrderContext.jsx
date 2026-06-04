import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

 const placeOrder = (
  cartItems,
  cartSubtotal,
  paymentMethod = "Paypal"
) => {

  if (!user) {
    toast.error("Please login first");
    return;
  }

  const newOrder = {
    id:
      "#" +
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase(),

    userId: user.id,

    items: cartItems,

    total: cartSubtotal,

    payment: paymentMethod,

    date: new Date().toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ),

    status: "Accepted",

    message:
      "Your order has been accepted",
  };

  setOrders((prev) => [
    newOrder,
    ...prev,
  ]);

  toast.success("Order placed successfully");
};

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;