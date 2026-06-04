import React, { useEffect, useRef, useState } from "react";

import HeroPage from "../components/HeroPage";

const About = () => {
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

 
  const Counter = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!startCount) return;

      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [startCount, end]);

    return <>{count}</>;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroPage
        title="About Us"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* TOP CONTENT */}

          <div
            className="max-w-4xl mx-auto text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* SMALL TITLE */}

            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-accent"></span>

              <p className="text-zinc-500 text-lg sm:text-xl font-medium tracking-wide">
                Our Story
              </p>
            </div>

            {/* MAIN TITLE */}

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-zinc-900">
              Crafted Comfort:
              <span className="text-primary block mt-2">
                Quality Materials, Enduring Designs
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-6 text-zinc-500 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto">
              We create timeless furniture pieces using premium materials,
              modern craftsmanship, and thoughtful detailing that transforms
              every space into a warm and elegant experience.
            </p>

            {/* SIGNATURE */}

            <div className="mt-10">
              <h3 className="text-3xl sm:text-4xl font-serif text-zinc-800">
                Jenny Alexander
              </h3>

              <p className="mt-2 text-zinc-500 text-sm sm:text-base">
                Jenny Alexander
                <span className="text-accent mx-2">•</span>
                CEO
              </p>
            </div>
          </div>

          {/* IMAGE GRID */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-12 lg:mt-16">
            {/* LEFT IMAGE */}

            <div
              className="rounded-[24px] sm:rounded-[28px] overflow-hidden h-[300px] sm:h-[450px] lg:h-[510px]"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <img
                src="https://i1-e.pinimg.com/1200x/a8/a0/27/a8a027fc7ca8e3ba19f44482ab052b4e.jpg"
                alt="Furniture Worker"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center hover:scale-105 duration-700"
              />
            </div>

            {/* RIGHT */}

            <div className="flex flex-col gap-5 sm:gap-6">
              <div
                className="rounded-[24px] sm:rounded-[28px] overflow-hidden h-[220px] sm:h-[240px]"
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                <img
                  src="https://i1-e.pinimg.com/1200x/ab/b0/6f/abb06ff3cad05513153de90b9ca725d8.jpg"
                  alt="Machine Work"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center hover:scale-105 duration-700"
                />
              </div>

              <div
                className="rounded-[24px] sm:rounded-[28px] overflow-hidden h-[220px] sm:h-[240px]"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="1200"
              >
                <img
                  src="https://i.pinimg.com/736x/64/fe/85/64fe85ea0599bc2e76bdd7ce0d0b9702.jpg"
                  alt="Wood Working"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center hover:scale-105 duration-700"
                />
              </div>
            </div>
          </div>

          {/* STATS BOX */}

          <div
            ref={statsRef}
            className="mt-8 sm:mt-10 bg-accent rounded-[24px] sm:rounded-[28px] px-5 sm:px-8 lg:px-10 py-6 sm:py-8"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              <div className="text-center lg:border-r border-yellow-600/30">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900">
                  <Counter end={25} />+
                </h3>
                <p className="mt-2 text-zinc-800 text-sm sm:text-base">
                  Years
                </p>
              </div>

              <div className="text-center lg:border-r border-yellow-600/30">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900">
                  <Counter end={180} />+
                </h3>
                <p className="mt-2 text-zinc-800 text-sm sm:text-base">
                  Stores
                </p>
              </div>

              <div className="text-center lg:border-r border-yellow-600/30">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900">
                  <Counter end={100} />+
                </h3>
                <p className="mt-2 text-zinc-800 text-sm sm:text-base">
                  Customers
                </p>
              </div>

              <div className="text-center lg:border-r border-yellow-600/30">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900">
                  <Counter end={35} />+
                </h3>
                <p className="mt-2 text-zinc-800 text-sm sm:text-base">
                  Awards
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900">
                  <Counter end={98} />%
                </h3>
                <p className="mt-2 text-zinc-800 text-sm sm:text-base">
                  Satisfied
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
QUALITY SECTION
========================= */}

<section className="bg-white py-20 lg:py-28 overflow-hidden">
  <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-8 items-stretch">
      {/* LEFT IMAGE */}

      <div
        className="relative h-full"
        data-aos="fade-right"
        data-aos-duration="1200"
      >
        {/* BORDER FRAME */}

        <div className="absolute top-4 left-4 w-full h-full border-2 border-white/90 rounded-[28px] z-10"></div>

        {/* IMAGE */}

        <div className="rounded-[28px] overflow-hidden h-full min-h-[420px]">
          <img
            src="https://i1-e.pinimg.com/1200x/1c/62/fb/1c62fb5c6de30a3eac85f3244efd169e.jpg"
            alt="Furniture Worker"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center hover:scale-105 duration-700"
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}

      <div
        className="relative bg-secondary rounded-[32px] p-8 sm:p-12 lg:p-16"
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        {/* SMALL TITLE */}

        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-[2px] bg-accent"></span>

          <p className="text-zinc-500 text-sm sm:text-base font-medium">
            Our Product Quality
          </p>
        </div>

        {/* MAIN TITLE */}

        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.2] text-zinc-900">
          Setting the
          <span className="text-primary block mt-2">
            Standard for Quality Furniture
          </span>
        </h2>

        {/* DESCRIPTION */}

        <p className="mt-6 text-zinc-500 text-base sm:text-lg leading-8 max-w-2xl">
          We craft furniture with precision, premium materials, and timeless
          aesthetics to deliver unmatched comfort and elegance for every modern
          living space.
        </p>

        {/* FEATURES */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-14">
          {/* ITEM 1 */}

          <div data-aos="zoom-in" data-aos-delay="100">
            <div className="w-16 h-16 rounded-full bg-[#F3E3B7] flex items-center justify-center">
              <i className="ri-plant-line text-3xl text-primary"></i>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-zinc-900">
              Best Quality Wood
            </h3>

            <p className="mt-3 text-zinc-500 leading-7">
              Carefully selected premium wood materials designed for durability,
              elegance, and long-lasting comfort.
            </p>
          </div>

          {/* ITEM 2 */}

          <div data-aos="zoom-in" data-aos-delay="300">
            <div className="w-16 h-16 rounded-full bg-[#F3E3B7] flex items-center justify-center">
              <i className="ri-sofa-line text-3xl text-primary"></i>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-zinc-900">
              Comfort-Driven Design
            </h3>

            <p className="mt-3 text-zinc-500 leading-7">
              Thoughtfully designed furniture that combines aesthetics with
              exceptional everyday comfort.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* =========================
TEAM SECTION
========================= */}

<section className="bg-primary-bg py-16 lg:py-24 overflow-hidden">
  <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
    {/* TOP CONTENT */}

    <div
      className="text-center max-w-3xl mx-auto"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="w-10 h-[2px] bg-accent"></span>

        <p className="text-zinc-500 text-lg sm:text-xl font-medium">
          Our Team
        </p>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-zinc-900">
        Meet <span className="text-primary">Our Team</span>
      </h2>
    </div>

    {/* TEAM GRID */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-14 lg:mt-16">
      {[
        {
          name: "Jenny Alexander",
          role: "CEO, Furniture",
          image:
            "https://i1-e.pinimg.com/1200x/de/34/fd/de34fdc2b7b2411bf7e48630cc0ac9da.jpg",
        },
        {
          name: "Robert Fox",
          role: "Carpenter",
          image:
            "https://i.pinimg.com/736x/2d/82/ef/2d82eff22835cabaaa93888dacb1a0b4.jpg",
        },
        {
          name: "Theresa Webb",
          role: "Carpenter",
          image:
            "https://i1-e.pinimg.com/1200x/6f/29/49/6f29497fd19d6d07881ec197c931e171.jpg",
        },
      ].map((member, index) => (
        <div
          key={index}
          className="group text-center transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] cursor-pointer"
          data-aos="fade-up"
          data-aos-delay={index * 200}
          data-aos-duration="1000"
        >
          {/* IMAGE BOX */}

          <div className="relative bg-[#ECEBE7] rounded-[24px] sm:rounded-[28px] overflow-hidden h-[320px] sm:h-[380px] lg:h-[420px]">
            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 duration-500 z-10"></div>

            {/* SHINE EFFECT */}

            <div className="absolute top-0 left-[-120%] w-[80%] h-full bg-white/20 skew-x-12 group-hover:left-[140%] duration-1000 z-20"></div>

            {/* IMAGE */}

            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top group-hover:scale-110 group-hover:rotate-1 duration-700"
            />

            {/* SOCIAL ICONS */}

            <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-3 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 duration-500 z-30">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              >
                <i className="ri-facebook-fill"></i>
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              >
                <i className="ri-pinterest-fill"></i>
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              >
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>

          {/* CONTENT */}

          <div className="mt-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              {member.name}
            </h3>

            <p className="mt-2 text-zinc-500 text-base sm:text-lg">
              [{member.role}]
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
};

export default About;