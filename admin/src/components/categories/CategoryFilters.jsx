import SearchInput from "../common/SearchInput";

const CategoryFilters = ({
   search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-zinc-100
      p-5
      "
    >
      <div
        className="
        flex
        flex-col
        lg:flex-row
        gap-4
        "
      >
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search category..."
          />
        </div>

        <select
  value={status}
  onChange={(e) =>
    setStatus(e.target.value)
  }
  className="
    border
    rounded-2xl
    px-4
    py-3
  "
>
  <option value="all">
    All Status
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

export default CategoryFilters;