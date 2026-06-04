import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Contact Us", path: "/contact" },
      { name: "Career", path: "/career" },
    ],
  },
  {
    title: "Customer Services",
    links: [
      { name: "My Account", path: "/my-account" },
      { name: "Track Order", path: "/track-order" },
      { name: "Return", path: "/return-policy" },
      { name: "FAQ", path: "/faq-section" },
    ],
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const year = new Date().getFullYear();

  const toggleAccordion = (index) => {
    if (window.innerWidth >= 1024) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-primary relative">
      {/* Blur Effect */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/20 blur-3xl rounded-full"></div>

      {/* Top Footer */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-12">

          {/* Logo */}
          <div data-aos="fade-up" data-aos-duration="1000">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                <span className="text-primary text-4xl font-bold">F</span>
              </div>

              <h2 className="text-4xl font-bold text-white">
                Furniture
                <span className="text-accent">.</span>
              </h2>
            </div>

            <p className="text-white/80 mt-6 leading-relaxed max-w-[420px]">
              Premium luxury furniture crafted for modern interiors and elegant living spaces.
            </p>

            <div className="flex gap-4 mt-10">
              {[
                "facebook-fill",
                "twitter-fill",
                "pinterest-fill",
                "instagram-line",
                "youtube-fill",
              ].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-accent hover:-translate-y-2 duration-300 flex items-center justify-center"
                >
                  <i className={`ri-${icon} text-white hover:text-primary text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          {footerSections.map((section, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-white text-2xl font-semibold">
                  {section.title}
                </h3>

                <i
                  className={`ri-arrow-down-s-line text-white text-3xl lg:hidden transition duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                ></i>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-[300px]" : "max-h-0"
                  } lg:max-h-[500px]`}
              >
                <ul className="space-y-5 mt-8">
                 {section.links.map((link) => (
  <li key={link.name}>
    <Link
      to={link.path}
      className="text-white/80 hover:text-accent hover:translate-x-2 duration-300 inline-block"
    >
      {link.name}
    </Link>
  </li>
))}
                </ul>
              </div>
            </div>
          ))}

          {/* Information */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-white text-2xl font-semibold">
              Information
            </h3>

            <ul className="space-y-5 mt-8 text-white/80">
              <li>Privacy</li>
              <li>Terms & Condition</li>
              <li>Return Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-white text-2xl font-semibold">
              Contact Info
            </h3>

            <ul className="space-y-6 mt-8 text-white/80">
              <li className="flex gap-4">
                <i className="ri-phone-line text-accent text-2xl"></i>
                +0123-456-789
              </li>

              <li className="flex gap-4">
                <i className="ri-mail-line text-accent text-2xl"></i>
                example@gmail.com
              </li>

              <li className="flex gap-4">
                <i className="ri-map-pin-line text-accent text-2xl"></i>
                8502 Preston Rd. Inglewood, Maine 98380
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="bg-accent border-t border-black/10"
      >
        <div className="max-w-[1400px] mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-zinc-900 text-center md:text-left font-medium">
            Copyright © {year} Furniture. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 text-zinc-900">
            <select className="bg-transparent outline-none">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>

            <div className="w-[1px] h-6 bg-black/20"></div>

            <select className="bg-transparent outline-none">
              <option>USD</option>
              <option>INR</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Back To Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8
         w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent text-primary text-2xl md:text-3xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-[9999]
  ${showTopBtn
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }`}
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </footer>
  );
};

export default Footer;