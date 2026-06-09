import SearchInput from "../common/SearchInput";

const ProductFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  stock,
  setStock,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-zinc-100 p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
          border
          rounded-2xl
          px-4
          py-3
          outline-none
        "
        >
          <option value="all">
            All Categories
          </option>

          <option value="Bedroom">
            Bedroom
          </option>

          <option value="Living Room">
            Living Room
          </option>

          <option value="Dining Room">
            Dining Room
          </option>
        </select>

        <select
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="
          border
          rounded-2xl
          px-4
          py-3
          outline-none
        "
        >
          <option value="all">
            All Stock
          </option>

          <option value="instock">
            In Stock
          </option>

          <option value="outofstock">
            Out Of Stock
          </option>
        </select>

      </div>
    </div>
  );
};

export default ProductFilters;