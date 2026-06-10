import SearchInput from "../common/SearchInput";

const ReviewFilters = ({
  search,
  setSearch,
  rating,
  setRating,
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
            placeholder="Search customer or product..."
          />
        </div>

        {/* Rating Filter */}

        <select
          value={rating}
          onChange={(e) =>
            setRating(
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
            All Ratings
          </option>

          <option value="5">
            ⭐ 5 Stars
          </option>

          <option value="4">
            ⭐ 4 Stars
          </option>

          <option value="3">
            ⭐ 3 Stars
          </option>

          <option value="2">
            ⭐ 2 Stars
          </option>

          <option value="1">
            ⭐ 1 Star
          </option>
        </select>

        {/* Status Filter */}

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

          <option value="Approved">
            Approved
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>
      </div>
    </div>
  );
};

export default ReviewFilters;