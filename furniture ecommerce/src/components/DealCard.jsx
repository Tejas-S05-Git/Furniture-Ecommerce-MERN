import React from 'react'

const DealCard = ({ product }) => {
  return (
     <div className="group bg-[#ECECEC] rounded-[30px] p-4 w-[320px] md:w-[620px] transition-all duration-500">
      <div className="flex flex-col md:flex-row gap-4">
        {/* IMAGE */}

        <div className="bg-[#E5E5E5] rounded-[24px] relative overflow-hidden w-full md:w-[300px] h-[300px] md:h-[420px] flex-shrink-0">
          <div className="absolute top-4 left-4 bg-primary text-white px-5 py-2 rounded-full text-lg z-10">
            {product.discount}% OFF
          </div>

          <img
            src={product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="absolute inset-0 m-auto w-[90%] h-full object-contain"
          />
        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center flex-1 py-2">
          <p className="text-zinc-600 text-lg md:text-xl">
            {product.category}
          </p>

          <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 leading-tight mt-2">
            {product.title}
          </h3>

          <div className="flex items-center gap-3 mt-4">
            <h4 className="text-3xl font-bold">
              ${product.price}
            </h4>

            <span className="text-zinc-400 text-2xl line-through">
              ${product.oldPrice}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <i className="ri-star-fill text-accent text-2xl"></i>

            <span className="text-2xl font-medium">
              {product.rating}
            </span>
          </div>

          <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-5 max-w-[320px]">
            {product.shortDescription}
          </p>

          <button className="mt-6 text-primary text-xl md:text-2xl font-medium flex items-center gap-2">
            Shop Now
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DealCard