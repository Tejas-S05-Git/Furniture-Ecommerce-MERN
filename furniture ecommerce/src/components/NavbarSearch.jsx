import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products"; // path adjust कर

const NavbarSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="relative">
      {/* Search Icon */}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="text-[24px] hover:text-primary transition"
      >
        <i className="ri-search-line cursor-pointer"></i>
      </button>

      {/* Search Box */}
      {showSearch && (
        <div
          className="
            absolute right-0 top-12 z-50
            w-[92vw] sm:w-[420px]
            bg-white rounded-2xl shadow-2xl
            border border-zinc-200
            p-4
          "
        >
        {/* Search Input */}
<div className="relative">
  <input
    type="text"
    placeholder="Search for sofas, chairs, tables..."
    value={searchTerm}
    autoFocus
    onChange={(e) => setSearchTerm(e.target.value)}
    className="
      w-full h-14
      rounded-2xl
      border border-zinc-200
      bg-zinc-50
      pl-12 pr-24
      text-[15px]
      placeholder:text-zinc-400
      outline-none
      transition-all duration-300
      focus:bg-white
      focus:border-primary
      focus:ring-4 focus:ring-[#204A25]/10
    "
  />

  {/* Search Icon */}
  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-zinc-400"></i>

  {/* Right Side Buttons */}
  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
    
    {/* Clear Text */}
    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="
          w-7 h-7 rounded-full
          bg-zinc-200 hover:bg-zinc-300
          flex items-center justify-center
          transition
        "
      >
        <i className="ri-close-line text-sm"></i>
      </button>
    )}

    {/* Close Search Box */}
    <button
      onClick={() => {
        setShowSearch(false);
        setSearchTerm("");
      }}
      className="
        w-8 h-8 rounded-full
        hover:bg-zinc-100
        flex items-center justify-center
        transition
      "
    >
      <i className="ri-close-large-line text-zinc-600"></i>
    </button>
  </div>
</div>

          {/* Results */}
          {searchTerm && (
            <div className="mt-4 max-h-[320px] overflow-y-auto space-y-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setShowSearch(false);
                      setSearchTerm("");
                    }}
                    className="
                      flex items-center gap-3
                      p-3 rounded-xl
                      hover:bg-zinc-100
                      cursor-pointer transition
                    "
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="
                        w-14 h-14
                        sm:w-16 sm:h-16
                        object-cover rounded-lg
                      "
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium truncate">
                        {product.title}
                      </h3>

                      <p className="text-primary font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-zinc-500 py-5">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;