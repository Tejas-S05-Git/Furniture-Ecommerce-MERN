import React from 'react'


const features = [
  {
    icon: "ri-box-3-line",
    title: "Free Shipping",
    desc: "Free shipping for orders above $180",
  },
  {
    icon: "ri-wallet-3-line",
    title: "Flexible Payment",
    desc: "Multiple secure payment options available",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24×7 Support",
    desc: "Our support team is available every day online",
  },
];
const FeaturesSection = () => {
  return (
    <section className="bg-white py-10 md:py-12">
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-12"
    >
      {/* ITEM 1 */}

      <div className="flex items-start gap-4">
        <div className="w-[58px] h-[58px] rounded-full bg-accent flex items-center justify-center shrink-0 relative">
          <div className="absolute inset-0 rounded-full border-[2px] border-primary -translate-x-[4px] -translate-y-[4px]"></div>

          <i className="ri-box-3-line text-[28px] text-primary relative z-10"></i>
        </div>

        <div>
          <h3 className="text-[22px] md:text-[26px] leading-none font-semibold text-zinc-900">
            Free Shipping
          </h3>

          <p className="mt-3 text-[15px] md:text-[17px] leading-[28px] text-zinc-600">
            Free shipping for order above $180
          </p>
        </div>
      </div>

      {/* ITEM 2 */}

      <div className="flex items-start gap-4">
        <div className="w-[58px] h-[58px] rounded-full bg-accent flex items-center justify-center shrink-0 relative">
          <div className="absolute inset-0 rounded-full border-[2px] border-primary -translate-x-[4px] -translate-y-[4px]"></div>

          <i className="ri-wallet-3-line text-[28px] text-primary relative z-10"></i>
        </div>

        <div>
          <h3 className="text-[22px] md:text-[26px] leading-none font-semibold text-zinc-900">
            Flexible Payment
          </h3>

          <p className="mt-3 text-[15px] md:text-[17px] leading-[28px] text-zinc-600">
            Multiple secure payment options
          </p>
        </div>
      </div>

      {/* ITEM 3 */}

      <div className="flex items-start gap-4">
        <div className="w-[58px] h-[58px] rounded-full bg-accent flex items-center justify-center shrink-0 relative">
          <div className="absolute inset-0 rounded-full border-[2px] border-primary -translate-x-[4px] -translate-y-[4px]"></div>

          <i className="ri-customer-service-2-line text-[28px] text-primary relative z-10"></i>
        </div>

        <div>
          <h3 className="text-[22px] md:text-[26px] leading-none font-semibold text-zinc-900">
            24×7 Support
          </h3>

          <p className="mt-3 text-[15px] md:text-[17px] leading-[28px] text-zinc-600">
            We support online all days.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default FeaturesSection