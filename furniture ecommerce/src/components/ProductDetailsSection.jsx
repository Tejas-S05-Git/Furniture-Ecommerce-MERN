import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
const ProductDetailsSection = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToWishlist } = useWishlist();

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState("");
  const fetchProduct =
    async () => {
      try {
        const response =
          await api.get(
            `/products/${id}`
          );

        setProduct(
          response.data.product
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setSelectedImage(
        product.thumbnail
      );
    }
  }, [product]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }
  if (!product) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">Product not found</h2>
      </section>
    );
  }
  const allImages = [
    product.thumbnail,
    ...(product.images || []),
  ];


  const currentIndex =
    allImages.indexOf(
      selectedImage
    );

  const prevImage = () => {
    const currentIndex =
      allImages.indexOf(
        selectedImage
      );

    const prevIndex =
      currentIndex === 0
        ? allImages.length - 1
        : currentIndex - 1;

    setSelectedImage(
      allImages[prevIndex]
    );
  };

  const nextImage = () => {
    const currentIndex =
      allImages.indexOf(
        selectedImage
      );

    const nextIndex =
      currentIndex ===
        allImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(
      allImages[nextIndex]
    );
  };


  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* LEFT */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="relative bg-secondary rounded-[30px] p-6 md:p-10">

              {/* Main Image */}
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-[350px] md:h-[520px] object-contain"
              />

              {/* Prev */}
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl hover:bg-primary/90 transition"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center text-2xl hover:bg-accent/90 transition"
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-5 flex-wrap">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition ${selectedImage === img
                    ? "border-primary"
                    : "border-zinc-200"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover bg-secondary"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <p className="text-zinc-500 text-lg">
              {product.category?.name}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {product.title}
              </h1>

              {product.stock && (
                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  {product.stockText}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex text-accent text-lg">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill"></i>
                ))}
              </div>

              <span className="text-zinc-600">
                {product.rating} ({product.totalReviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">
              <h2 className="text-4xl font-bold text-zinc-900">
                ${product.price}
              </h2>

              <span className="text-2xl text-zinc-400 line-through">
                ${product.oldPrice}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-zinc-600 leading-8">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">
                Color :
                <span className="text-zinc-500 font-normal ml-2">
                  {product.color}
                </span>
              </h4>

              <div className="flex gap-3">
                {product.colors?.map(
                  (clr, i) => (
                    <button
                      key={i}
                      style={{
                        backgroundColor: clr,
                      }}
                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                    />
                  )
                )}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="flex flex-wrap gap-4 mt-10">

              <div className="h-14 border border-zinc-200 rounded-full flex items-center overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1 ? prev - 1 : 1
                    )
                  }
                  className="px-5 text-2xl"
                >
                  -
                </button>

                <span className="px-5 font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className="px-5 text-2xl"
                >
                  +
                </button>
              </div>

              <button onClick={() => {
                console.log(product);
                addToCart(product, quantity);
                toast.success(`${product.title} added to cart`);

                setTimeout(() => {
                  navigate("/cart");
                }, 700);
              }} type="button"
                className="bg-primary text-white h-14 px-8 rounded-full font-semibold hover:opacity-95 transition">
                Add To Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity);

                  toast.success(
                    "Proceeding to checkout"
                  );

                  setTimeout(() => {
                    navigate("/checkout");
                  }, 500);
                }}
                className="
    bg-accent text-black
    h-14 px-8 rounded-full
    font-semibold
    hover:opacity-95 transition
  "
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  addToWishlist(product);
                  toast.success(
                    `${product.title} added to wishlist`
                  );
                }}
                className="
    w-14 h-14 rounded-full
    border border-zinc-200
    flex items-center justify-center
    text-xl hover:bg-primary
    hover:text-white transition
  "
              >
                <i className="ri-heart-line"></i>
              </button>
            </div>

            {/* Meta */}
            <div className="mt-10 pt-8 border-t border-zinc-200 space-y-3">

              <p>
                <span className="font-semibold">
                  SKU :
                </span>{" "}
                {product.sku}
              </p>

              <p>
                <span className="font-semibold">
                  Tags :
                </span>{" "}
                {product.tags?.join(", ")}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <span className="font-semibold">
                  Share :
                </span>

                <div className="flex gap-3 text-primary text-xl">
                  <i className="ri-facebook-fill"></i>
                  <i className="ri-twitter-fill"></i>
                  <i className="ri-pinterest-fill"></i>
                  <i className="ri-instagram-line"></i>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSection;