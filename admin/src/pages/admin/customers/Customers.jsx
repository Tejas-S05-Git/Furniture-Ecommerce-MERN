import { useState } from "react";

import customersData from "../../../data/customersData";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import EmptyState from "../../../components/common/EmptyState";

import CustomerStats from "../../../components/customers/CustomerStats";
import CustomerFilters from "../../../components/customers/CustomerFilters";
import CustomerTable from "../../../components/customers/CustomerTable";

const Customers = () => {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState(null);

  const customersPerPage = 6;

  const filteredCustomers =
    customersData.filter(
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
          customer.status === status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const totalPages = Math.ceil(
    filteredCustomers.length /
      customersPerPage
  );

  const startIndex =
    (currentPage - 1) *
    customersPerPage;

  const paginatedCustomers =
    filteredCustomers.slice(
      startIndex,
      startIndex +
        customersPerPage
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        subtitle="Manage all customers"
      />

      <CustomerStats
        customers={customersData}
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
          description="Try changing filters or search term."
        />
      ) : (
        <>
          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            overflow-hidden
            "
          >
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
          </div>

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
        </>
      )}

      {deleteModal && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          "
        >
          <div
            className="
            bg-white
            rounded-3xl
            p-6
            w-full
            max-w-md
            "
          >
            <h3
              className="
              text-xl
              font-semibold
              mb-3
              "
            >
              Delete Customer
            </h3>

            <p className="text-zinc-500">
              Are you sure you want
              to delete{" "}
              {
                selectedCustomer?.name
              }
              ?
            </p>

            <div
              className="
              flex
              justify-end
              gap-3
              mt-6
              "
            >
              <button
                onClick={() =>
                  setDeleteModal(
                    false
                  )
                }
                className="
                px-5
                py-2
                border
                rounded-xl
                "
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  setDeleteModal(
                    false
                  )
                }
                className="
                px-5
                py-2
                bg-red-500
                text-white
                rounded-xl
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;