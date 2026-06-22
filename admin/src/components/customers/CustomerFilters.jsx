import SearchInput from "../common/SearchInput";

const CustomerFilters = ({
  search,
  setSearch,
  status,
  setStatus,
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
        xl:grid-cols-3
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
            placeholder="Search customer..."
          />
        </div>

        {/* Status Filter */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="
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
            All Customers
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>
      </div>
    </div>
  );
};

export default CustomerFilters;