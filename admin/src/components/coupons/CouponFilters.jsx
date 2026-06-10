import SearchInput from "../common/SearchInput";

const CouponFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-zinc-100
      p-6
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
            placeholder="Search coupon code..."
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="
          w-full
          border
          border-zinc-200
          rounded-2xl
          px-4
          py-3
          outline-none
          focus:border-primary
          "
        >
          <option value="">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

          <option value="Expired">
            Expired
          </option>
        </select>

        {/* Type */}

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="
          w-full
          border
          border-zinc-200
          rounded-2xl
          px-4
          py-3
          outline-none
          focus:border-primary
          "
        >
          <option value="">
            All Types
          </option>

          <option value="Percentage">
            Percentage
          </option>

          <option value="Fixed">
            Fixed
          </option>
        </select>
      </div>
    </div>
  );
};

export default CouponFilters;