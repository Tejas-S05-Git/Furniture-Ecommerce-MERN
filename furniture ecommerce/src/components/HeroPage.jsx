import React from 'react'
 import { Link } from "react-router-dom";
const HeroPage = ({
  title = "Page",
  breadcrumbs = ["Home", "Page"],
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F5] py-14 md:py-16 lg:py-20">
      {/* Light Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

      {/* Top Shape */}
      <div className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full bg-[#ECECEC] blur-3xl opacity-70" />

      {/* Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-[160px] h-[160px] rounded-full bg-[#ECECEC] blur-3xl opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          className="flex flex-col items-center justify-center text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Title */}
          <h1 className="text-[34px] sm:text-[42px] md:text-[52px] font-bold tracking-[-1px] text-zinc-900 leading-none">
            {title}
          </h1>

         

{/* Breadcrumb */}
<div
  className="flex flex-wrap items-center justify-center gap-2 mt-4"
  data-aos="fade-up"
  data-aos-delay="150"
>
  {breadcrumbs.map((item, index) => (
    <React.Fragment key={index}>
      {item.path ? (
        <Link
          to={item.path}
          className="text-sm md:text-lg text-zinc-500 hover:text-primary transition duration-300"
        >
          {item.label}
        </Link>
      ) : (
        <span className="text-sm md:text-lg text-zinc-900 font-medium">
          {item.label}
        </span>
      )}

      {index !== breadcrumbs.length - 1 && (
        <span className="text-zinc-400">/</span>
      )}
    </React.Fragment>
  ))}
</div>
        </div>
      </div>
    </section>
  )
}

export default HeroPage