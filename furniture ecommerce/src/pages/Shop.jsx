import React, { useEffect, useMemo, useState } from "react";
import HeroPage from "../components/HeroPage";
import ProductCard from "../components/ProductCard";
import FeaturesSection from "../components/FeaturesSection";
import api from "../services/api";

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState("default");
  
  // Pagination & UI States
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (value, selectedState, setSelectedState) => {
    setCurrentPage(1);
    if (selectedState.includes(value)) {
      setSelectedState(selectedState.filter((item) => item !== value));
    } else {
      setSelectedState([...selectedState, value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category?.name)
      );
    }

    if (selectedColors.length) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    if (selectedMaterials.length) {
      filtered = filtered.filter((product) =>
        selectedMaterials.includes(product.material)
      );
    }

    if (selectedStock.length > 0) {
      filtered = filtered.filter((product) => {
        const stockStatus = product.quantity > 0 ? "In Stock" : "Out Of Stock";
        return selectedStock.includes(stockStatus);
      });
    }

    filtered = filtered.filter((product) => product.price <= priceRange);

    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    products,
    selectedCategories,
    selectedColors,
    selectedMaterials,
    selectedStock,
    priceRange,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-zinc-600">
        Loading...
      </div>
    );
  }

  return (
    <>
      <HeroPage
        title="Shop"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Shop" }]}
      />

      <section className="bg-white py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full lg:hidden mb-6 py-3 px-4 border border-zinc-200 rounded-xl font-semibold flex items-center justify-between bg-zinc-50 hover:bg-zinc-100 transition-colors"
          >
            <span>Filters</span>
            <span className="text-xl">{isMobileFilterOpen ? "-" : "+"}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Sidebar */}
            <aside
              className={`${
                isMobileFilterOpen ? "block" : "hidden"
              } lg:block bg-white rounded-[28px] border border-zinc-200 p-6 h-fit lg:sticky lg:top-8 transition-all duration-300`}
            >
              <h2 className="text-2xl font-semibold">Filter Options</h2>

              {/* Category */}
              <div className="pt-8 mt-8 border-t border-zinc-100">
                <h3 className="text-xl font-semibold mb-5">Category</h3>
                <div className="space-y-4">
                  {["Bedroom", "Living Room", "Office", "Lighting", "Kitchen"].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item)}
                        onChange={() =>
                          handleFilterChange(item, selectedCategories, setSelectedCategories)
                        }
                        className="w-4 h-4 accent-accent cursor-pointer rounded border-zinc-300"
                      />
                      <span className="group-hover:text-black text-zinc-700 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-8 mt-8 border-t border-zinc-100">
                <h3 className="text-xl font-semibold mb-4">Price</h3>
                <p className="mb-4 text-zinc-500 font-medium">
                  $0 - ${priceRange}
                </p>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Color */}
              <div className="pt-8 mt-8 border-t border-zinc-100">
                <h3 className="text-xl font-semibold mb-5">Color</h3>
                <div className="space-y-4">
                  {["Brown", "Grey", "Black", "Green"].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(item)}
                        onChange={() =>
                          handleFilterChange(item, selectedColors, setSelectedColors)
                        }
                        className="w-4 h-4 accent-accent cursor-pointer rounded border-zinc-300"
                      />
                      <span className="group-hover:text-black text-zinc-700 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="pt-8 mt-8 border-t border-zinc-100">
                <h3 className="text-xl font-semibold mb-5">Material</h3>
                <div className="space-y-4">
                  {["Wood", "Metal"].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(item)}
                        onChange={() =>
                          handleFilterChange(item, selectedMaterials, setSelectedMaterials)
                        }
                        className="w-4 h-4 accent-accent cursor-pointer rounded border-zinc-300"
                      />
                      <span className="group-hover:text-black text-zinc-700 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="pt-8 mt-8 border-t border-zinc-100">
                <h3 className="text-xl font-semibold mb-5">Availability</h3>
                <div className="space-y-4">
                  {["In Stock", "Out Of Stock"].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedStock.includes(item)}
                        onChange={() =>
                          handleFilterChange(item, selectedStock, setSelectedStock)
                        }
                        className="w-4 h-4 accent-accent cursor-pointer rounded border-zinc-300"
                      />
                      <span className="group-hover:text-black text-zinc-700 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Area */}
            <div className="w-full">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <p className="text-zinc-600 font-medium">
                  Showing <span className="text-black font-semibold">{displayedProducts.length}</span> of{" "}
                  <span className="text-black font-semibold">{filteredProducts.length}</span> results
                </p>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto h-[50px] px-5 rounded-full border border-zinc-200 bg-white outline-none focus:border-primary cursor-pointer transition-colors"
                >
                  <option value="default">Default Sorting</option>
                  <option value="lowToHigh">Price Low To High</option>
                  <option value="highToLow">Price High To Low</option>
                </select>
              </div>

              {/* Product Grid */}
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-zinc-500 bg-zinc-50 rounded-2xl border border-zinc-100">
                  No products match your selected filters.
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-3 mt-14 flex-wrap">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-11 h-11 rounded-full font-medium transition-all duration-200 ${
                        currentPage === index + 1
                          ? "bg-primary text-white shadow-md"
                          : "bg-white border border-zinc-200 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
    </>
  );
};

export default Shop;