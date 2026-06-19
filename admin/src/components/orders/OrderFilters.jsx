import SearchInput from "../common/SearchInput";

const OrderFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  payment,
  setPayment,
}) => {
  return (
    <div
      className="
      bg-white
      p-6
      rounded-3xl
      border
      border-zinc-100
      "
    >
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
        "
      >
        {/* Search */}
        <div className="xl:col-span-2">
          <SearchInput
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search order ID or customer..."
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
  border
  border-zinc-200
  rounded-2xl
  px-4
  py-3
  outline-none
  "
        >
          <option value="">All Status</option>

          <option value="pending">
            Pending
          </option>

          <option value="processing">
            Processing
          </option>

          <option value="shipped">
            Shipped
          </option>

          <option value="delivered">
            Delivered
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

        {/* Payment */}
        <select
  value={payment}
  onChange={(e) => setPayment(e.target.value)}
  className="
  border
  border-zinc-200
  rounded-2xl
  px-4
  py-3
  outline-none
  "
>
  <option value="">
    All Payments
  </option>

  <option value="paid">
    Paid
  </option>

  <option value="pending">
    Pending
  </option>

  <option value="failed">
    Failed
  </option>
</select>
      </div>
    </div>
  );
};

export default OrderFilters;