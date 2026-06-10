import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import EmptyState from "../../../components/common/EmptyState";
import DeleteModal from "../../../components/common/DeleteModal";

import CustomerStats from "../../../components/customers/CustomerStats";
import CustomerFilters from "../../../components/customers/CustomerFilters";
import CustomerTable from "../../../components/customers/CustomerTable";

import customersData from "../../../data/customersData";

const Customers = () => {
  const [customers, setCustomers] =
    useState(customersData);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  const filteredCustomers =
    customers.filter(
      (customer) => {
        const matchesSearch =
          customer.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          customer.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          !status ||
          customer.status ===
            status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const totalPages =
    Math.ceil(
      filteredCustomers.length /
        itemsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedCustomers =
    filteredCustomers.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );

  return (
    <div className="space-y-8">

      <PageHeader
        title="Customers"
        subtitle="Manage all customers"
      />

      <CustomerStats
        customers={customers}
      />

      <CustomerFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {filteredCustomers.length ===
      0 ? (
        <EmptyState
          title="No Customers Found"
          description="Try changing your filters."
        />
      ) : (
        <CustomerTable
          customers={
            paginatedCustomers
          }
          setDeleteModal={
            setDeleteModal
          }
          setSelectedCustomer={
            setSelectedCustomer
          }
        />
      )}

      {filteredCustomers.length >
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
        title="Delete Customer"
        onDelete={() => {
          setCustomers(
            customers.filter(
              (customer) =>
                customer.id !==
                selectedCustomer.id
            )
          );

          setDeleteModal(false);
        }}
      />

    </div>
  );
};

export default Customers;