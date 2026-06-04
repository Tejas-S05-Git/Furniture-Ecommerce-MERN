import React from 'react'
import HeroPage from '../components/HeroPage'
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { useMemo, useState } from "react";
import FeaturesSection from "../components/FeaturesSection";

const PRODUCTS_PER_PAGE = 12;
const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);

  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (
    value,
    selectedState,
    setSelectedState
  ) => {
    setCurrentPage(1);

    if (selectedState.includes(value)) {
      setSelectedState(
        selectedState.filter((item) => item !== value)
      );
    } else {
      setSelectedState([...selectedState, value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
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
      filtered = filtered.filter((product) =>
        selectedStock.includes(product.stockText)
      );
    }

    filtered = filtered.filter(
      (product) => product.price <= priceRange
    );

    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    selectedCategories,
    selectedColors,
    selectedMaterials,
    selectedStock,
    priceRange,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  return (
    <>
      <HeroPage title="Shop" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Shop" },]} />


      <section className="bg-white py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}

            <aside className="bg-white rounded-[28px] border border-zinc-200 p-6 h-fit">
              <h2 className="text-2xl font-semibold">
                Filter Options
              </h2>

              {/* Category */}

              <div className="pt-8 mt-8 border-t">
                <h3 className="text-xl font-semibold mb-5">
                  Category
                </h3>

                <div className="space-y-4">
                  {[
                    "Bedroom",
                    "Living Room",
                    "Office",
                    "Lighting",
                    "Kitchen",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          item
                        )}
                        onChange={() =>
                          handleFilterChange(
                            item,
                            selectedCategories,
                            setSelectedCategories
                          )
                        }
                        className="accent-accent"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}

              <div className="pt-8 mt-8 border-t">
                <h3 className="text-xl font-semibold mb-4">
                  Price
                </h3>

                <p className="mb-4 text-zinc-500">
                  $0 - ${priceRange}
                </p>

                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) =>
                    setPriceRange(Number(e.target.value))
                  }
                  className="w-full accent-primary"
                />
              </div>

              {/* Color */}

              <div className="pt-8 mt-8 border-t">
                <h3 className="text-xl font-semibold mb-5">
                  Color
                </h3>

                <div className="space-y-4">
                  {["Brown", "Grey", "Black", "Green"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(
                            item
                          )}
                          onChange={() =>
                            handleFilterChange(
                              item,
                              selectedColors,
                              setSelectedColors
                            )
                          }
                        />
                        <span>{item}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Material */}

              <div className="pt-8 mt-8 border-t">
                <h3 className="text-xl font-semibold mb-5">
                  Material
                </h3>

                <div className="space-y-4">
                  {["Wood", "Metal"].map((item) => (
                    <label
                      key={item}
                      className="flex gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(
                          item
                        )}
                        onChange={() =>
                          handleFilterChange(
                            item,
                            selectedMaterials,
                            setSelectedMaterials
                          )
                        }
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}

              <div className="pt-8 mt-8 border-t">
                <h3 className="text-xl font-semibold mb-5">
                  Availability
                </h3>

                <div className="space-y-4">
                  {["In Stock", "Out Of Stock"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStock.includes(
                            item
                          )}
                          onChange={() =>
                            handleFilterChange(
                              item,
                              selectedStock,
                              setSelectedStock
                            )
                          }
                        />
                        <span>{item}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </aside>

            {/* Products */}

            <div>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <p>
                  Showing {displayedProducts.length} of{" "}
                  {filteredProducts.length} results
                </p>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="h-[50px] px-5 rounded-full border bg-white"
                >
                  <option value="default">
                    Default Sorting
                  </option>

                  <option value="lowToHigh">
                    Price Low To High
                  </option>

                  <option value="highToLow">
                    Price High To Low
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-14 flex-wrap">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`w-11 h-11 rounded-full ${currentPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-white border"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
    </>
  )
}

export default Shop