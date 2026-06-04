import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import BlogCard from "../components/BlogCard";

// BLOG IMAGES
import blog1 from "../assets/images/sale image 2.jpg";
import blog2 from "../assets/images/sale image 2.jpg";
import blog3 from "../assets/images/sale image 2.jpg";
import blog4 from "../assets/images/sale image 2.jpg";
import HeroPage from "../components/HeroPage";

const blogData = [
  {
    id: 1,
    image: blog1,
    category: "Furniture",
    date: "20 May 2026",
    author: "Admin",
    readTime: "5 min read",
    title: "How to Choose Perfect Furniture for Your Living Room",
    description:
      "Discover smart tips for selecting furniture that matches your style and space beautifully.",
  },
  {
    id: 2,
    image: blog2,
    category: "Interior",
    date: "21 May 2026",
    author: "Admin",
    readTime: "4 min read",
    title: "Minimalist Interior Trends That Feel Warm & Modern",
    description:
      "Explore the latest minimalist decor ideas that create a luxurious and welcoming home.",
  },
  {
    id: 3,
    image: blog3,
    category: "Decor",
    date: "22 May 2026",
    author: "Admin",
    readTime: "6 min read",
    title: "Top Decor Ideas to Refresh Your Home in 2026",
    description:
      "Upgrade your home with trending decor styles and elegant furniture arrangements.",
  },
  {
    id: 4,
    image: blog4,
    category: "Design",
    date: "23 May 2026",
    author: "Admin",
    readTime: "5 min read",
    title: "Modern Bedroom Styling with Wooden Furniture",
    description:
      "Warm wood textures and modern styling ideas to transform your bedroom beautifully.",
  },

  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 5,
    image: [blog1, blog2, blog3, blog4][i % 4],
    category: "Furniture",
    date: "24 May 2026",
    author: "Admin",
    readTime: "5 min read",
    title: `Furniture Styling Inspiration ${i + 5}`,
    description:
      "Beautiful furniture inspirations and styling ideas for modern homes and interiors.",
  })),
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 12;

  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>

    <HeroPage
        title="Blog"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blog" },
        ]}
      />
      {/* HERO */}

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            data-aos="fade-up"
            className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm md:text-base font-medium mb-5"
          >
            Our Latest Blog
          </span>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight max-w-4xl mx-auto"
          >
            Furniture Inspiration & Interior Design Stories
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-zinc-600 text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed"
          >
            Discover styling ideas, furniture tips and design inspiration for
            your dream home.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                delay={index * 100}
              />
            ))}
          </div>

          {/* PAGINATION */}

          <div
            data-aos="fade-up"
            className="flex justify-center items-center gap-3 mt-16 flex-wrap"
          >
            {/* PREV */}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              className="w-12 h-12 rounded-full border border-zinc-300 hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center"
            >
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>

            {/* NUMBERS */}

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index + 1);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className={`w-12 h-12 rounded-full text-base font-medium transition-all duration-300
                ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-white border border-zinc-300 hover:bg-primary hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* NEXT */}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className="w-12 h-12 rounded-full border border-zinc-300 hover:bg-primary hover:text-white transition duration-300 flex items-center justify-center"
            >
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;




