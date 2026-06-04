import React from 'react'

const BlogCard = ({blog, delay = 0}) => {
  return (
   <a
      href="#"
      data-aos="fade-up"
      data-aos-delay={delay}
      className="group block bg-white/60 backdrop-blur-md rounded-[30px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden h-[240px] sm:h-[260px] md:h-[300px]">
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* CATEGORY */}

        <div className="absolute top-5 left-5 z-20 bg-primary text-white px-4 py-2 rounded-full text-sm md:text-base font-medium">
          {blog.category}
        </div>

        {/* DATE */}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/70 backdrop-blur-md border border-white/50 text-zinc-900 px-5 py-3 rounded-full text-sm md:text-base font-medium whitespace-nowrap">
          {blog.date}
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-6 md:p-7 flex flex-col h-[320px]">
        <div className="flex items-center justify-between text-zinc-500 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <i className="ri-user-3-line"></i>
            <span>{blog.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="ri-time-line"></i>
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight mt-6 min-h-[100px]">
          {blog.title}
        </h3>

        <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-5">
          {blog.description}
        </p>

        <div className="mt-auto pt-6 flex items-center gap-2 text-primary text-lg md:text-xl font-medium group-hover:gap-4 transition-all duration-300">
          Read More
          <i className="ri-arrow-right-line text-2xl"></i>
        </div>
      </div>
    </a>
  )
}

export default BlogCard