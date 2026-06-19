import { useState, useEffect } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import DeleteModal from "../../../components/common/DeleteModal";
import EmptyState from "../../../components/common/EmptyState";
import OrderStats from "../../../components/orders/OrderStats";
import OrderFilters from "../../../components/orders/OrderFilters";
import OrderTable from "../../../components/orders/OrderTable";
import api from "../../../services/api";
import toast from "react-hot-toast";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const response =
          await api.get("/orders");

        setOrders(
          response.data.orders
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };
 const filteredOrders = orders.filter((order) => {
  const matchesSearch =
    order._id
      ?.slice(-8)
      ?.toLowerCase()
      ?.includes(search.toLowerCase()) ||

    `${order.customer?.firstName || ""} ${order.customer?.lastName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    !status ||
    order.orderStatus?.toLowerCase() === status.toLowerCase();

  const matchesPayment =
    !payment ||
    order.paymentStatus?.toLowerCase() === payment.toLowerCase();

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPayment
  );
});

  const totalPages =
    Math.ceil(
      filteredOrders.length /
      itemsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

    if (loading) {
  return (
    <div className="p-10">
      Loading Orders...
    </div>
  );
}

  const paginatedOrders =
    filteredOrders.slice(
      startIndex,
      startIndex +
      itemsPerPage
    );

    const handleDeleteOrder =
  async () => {
    try {
      await api.delete(
        `/orders/${selectedOrder._id}`
      );

      toast.success(
        "Order deleted"
      );

      fetchOrders();

      setDeleteModal(false);

    } catch (error) {
      console.log(error);

      toast.error(
        "Delete failed"
      );
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        subtitle="Manage customer orders"
      />

     <OrderStats orders={orders} />

      <OrderFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        payment={payment}
        setPayment={setPayment}
      />

      {filteredOrders.length ===
        0 ? (
        <EmptyState
          title="No Orders Found"
          description="Try changing your filters."
        />
      ) : (
        <OrderTable
          orders={
            paginatedOrders
          }
          setDeleteModal={
            setDeleteModal
          }
          setSelectedOrder={
            setSelectedOrder
          }
        />
      )}

      {filteredOrders.length >
        0 && (
          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            setCurrentPage={
              setCurrentPage
            }
          />
        )}

      <DeleteModal
        open={deleteModal}
        onClose={() =>
          setDeleteModal(false)
        }
        title="Delete Order"
        onDelete={handleDeleteOrder}
      />
    </div>
  );
};

export default Orders;