import React from "react";
import OrderSummary from "../components/OrderSummary";
import FeaturesSection from "./FeaturesSection";
import HeroPage from "./HeroPage";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
  return (
    <>
    <HeroPage title="Checkout" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }]} />
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">
          
          {/* LEFT - BILLING FORM */}
          <div
            className="lg:col-span-8"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-zinc-900">
              Billing Details
            </h2>

            <form className="space-y-6">
              {/* First + Last Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 font-medium">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex. John"
                    className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block mb-3 font-medium">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex. Doe"
                    className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block mb-3 font-medium">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block mb-3 font-medium">
                  Country *
                </label>
                <select className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition">
                  <option>Select Country</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </div>

              {/* Street */}
              <div>
                <label className="block mb-3 font-medium">
                  Street Address *
                </label>
                <input
                  type="text"
                  placeholder="Enter Street Address"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* City */}
              <div>
                <label className="block mb-3 font-medium">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="Enter City"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* State */}
              <div>
                <label className="block mb-3 font-medium">
                  State *
                </label>
                <input
                  type="text"
                  placeholder="Enter State"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* Zip */}
              <div>
                <label className="block mb-3 font-medium">
                  Zip Code *
                </label>
                <input
                  type="text"
                  placeholder="Enter Zip Code"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-3 font-medium">
                  Phone *
                </label>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-3 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full h-14 rounded-full border border-zinc-200 px-6 bg-white outline-none focus:border-primary transition"
                />
              </div>

              {/* Delivery Address */}
              <div className="pt-2">
                <label className="block mb-4 font-medium">
                  Delivery Address *
                </label>

                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-3 border border-zinc-200 rounded-full px-6 h-14 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      defaultChecked
                      className="accent-primary"
                    />
                    Same as shipping address
                  </label>

                  <label className="flex items-center gap-3 border border-zinc-200 rounded-full px-6 h-14 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      className="accent-primary"
                    />
                    Use different billing address
                  </label>
                </div>
              </div>
               <div
    className="pt-8"
    data-aos="fade-up"
    data-aos-delay="300"
  >
    <button
      type="button"
      onClick={() => navigate("/payment")}
      className="bg-primary text-white px-10 h-14 rounded-full font-semibold hover:opacity-90 transition-all duration-300"
    >
      Proceed to Payment
    </button>
  </div>
            </form>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <OrderSummary showButton={false} />
          </div>
        </div>
      </div>
    </section>
    <FeaturesSection/>
    </>
  );
};

export default Checkout;