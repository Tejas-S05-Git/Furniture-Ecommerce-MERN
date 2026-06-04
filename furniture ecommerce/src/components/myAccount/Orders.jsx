import React from "react";
import { useOrders } from "../../context/OrderContext";
import { products } from "../../data/products";

const Orders = () => {
  const { orders } = useOrders();

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold">
          Orders ({orders.length})
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          No orders found
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-zinc-200 overflow-hidden bg-white"
            >
              {/* TOP */}
              <div className="bg-accent p-6 grid md:grid-cols-4 gap-4">
                <Info
                  title="Order ID"
                  value={order.id}
                />

                <Info
                  title="Total Payment"
                  value={`$${order.total}`}
                />

                <Info
                  title="Payment Method"
                  value={order.payment}
                />

                <Info
                  title="Estimated Delivery"
                  value={order.date}
                />
              </div>

              {/* ITEMS */}
              <div className="p-6">
                {order.items.map((item) => {
                  const product =
                    products.find(
                      (p) =>
                        p.id === item.id
                    );

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-5 border-b last:border-0"
                    >
                      <div className="w-16 h-16 bg-secondary rounded-xl overflow-hidden">
                        <img
                          src={
                            product
                              ?.images?.[0]
                          }
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <h4 className="font-medium">
                          {
                            product?.title
                          }
                        </h4>

                        <p className="text-sm text-zinc-500">
                          Color :
                          {
                            product?.color
                          }{" "}
                          | Qty.
                          {
                            item.quantity
                          }
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom */}
                <div className="pt-6 flex flex-wrap justify-between gap-4 items-center">
                  <div className="flex gap-3 items-center">
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-500 text-xs font-medium">
                      Accepted
                    </span>

                    <p className="text-sm text-zinc-500">
                      {
                        order.message
                      }
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <button className="bg-primary text-white px-6 h-11 rounded-full">
                      Track Order
                    </button>

                    <button className="border border-primary text-primary px-6 h-11 rounded-full">
                      Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function Info({
  title,
  value,
}) {
  return (
    <div>
      <p className="text-sm text-zinc-600 mb-2">
        {title}
      </p>
      <h4 className="font-semibold">
        {value}
      </h4>
    </div>
  );
}

export default Orders;