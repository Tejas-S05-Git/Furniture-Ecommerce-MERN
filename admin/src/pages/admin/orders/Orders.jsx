import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import DeleteModal from "../../../components/common/DeleteModal";
import EmptyState from "../../../components/common/EmptyState";

import OrderStats from "../../../components/orders/OrderStats";
import OrderFilters from "../../../components/orders/OrderFilters";
import OrderTable from "../../../components/orders/OrderTable";

import ordersData from "../../../data/ordersData";

const Orders = () => {
  const [orders, setOrders] =
    useState(ordersData);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [payment, setPayment] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  const filteredOrders =
    orders.filter((order) => {
      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        order.customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        !status ||
        order.orderStatus ===
          status;

      const matchesPayment =
        !payment ||
        order.paymentStatus ===
          payment;

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

  const paginatedOrders =
    filteredOrders.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        subtitle="Manage customer orders"
      />

      <OrderStats
        orders={orders}
      />

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
        onDelete={() => {
          setOrders(
            orders.filter(
              (item) =>
                item.id !==
                selectedOrder.id
            )
          );

          setDeleteModal(false);
        }}
      />
    </div>
  );
};

export default Orders;