import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import CategorySection from '../components/CategorySection'
import ProductCollectionSection from '../components/ProductCollectionSection'
import { products } from '../data/products'
import { useState, useEffect } from "react";
import DealCard from "../components/DealCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import BlogCard from "../components/BlogCard";
import { Autoplay } from "swiper/modules";
import api from "../services/api";

import "swiper/css";

const Home = () => {
    const [products, setProducts] =useState([]);

   useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response =
        await api.get("/products");

      console.log(
        "API RESPONSE:",
        response.data
      );

      setProducts(
        response.data.products
      );
    } catch (error) {
      console.log(
        "PRODUCT ERROR:",
        error
      );
    }
  };

  fetchProducts();
}, []);

    const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

    const [timeLeft, setTimeLeft] = useState({
        days: "05",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();

            // 5 दिवसांच्या cycle मध्ये remaining time
            const remaining = FIVE_DAYS - (now % FIVE_DAYS);

            const days = Math.floor(
                remaining / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (remaining % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (remaining % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            const seconds = Math.floor(
                (remaining % (1000 * 60)) / 1000
            );

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const blogs = [
        {
            id: 1,
            category: "Furniture",
            date: "15 April 2024",
            author: "Admin",
            readTime: "5 min read",
            title: "Furniture Trends 2024: What's Hot and What's Not",
            description:
                "Discover the latest luxury furniture trends shaping modern interior design.",
            image:
                "https://i.pinimg.com/1200x/17/41/39/1741398487c99b138be855a3d4ef86dd.jpg",
        },
        {
            id: 2,
            category: "Interior",
            date: "14 April 2024",
            author: "Admin",
            readTime: "4 min read",
            title: "The Ultimate Guide to Choosing the Perfect Sofa",
            description:
                "Learn how to choose the perfect sofa for your modern living room.",
            image:
                "https://i.pinimg.com/1200x/cd/eb/a1/cdeba174c8e05aefac9552eaeb86b606.jpg",
        },
        {
            id: 3,
            category: "Modern",
            date: "12 April 2024",
            author: "Admin",
            readTime: "6 min read",
            title: "Choosing the Right Dining Table for Your Lifestyle",
            description:
                "Explore dining table ideas for elegant and practical home interiors.",
            image:
                "https://i.pinimg.com/736x/22/e9/22/22e922640c7450433cb3a61d41e8655c.jpg",
        },
    ];


    const instagramPosts = [
        {
            id: 1,
            image:
                "https://i.pinimg.com/736x/7b/e1/13/7be1132f8f1799d86cbb7fe4709f3bb2.jpg",
            likes: "2.4k",
            comments: "180",
        },
        {
            id: 2,
            image:
                "https://i.pinimg.com/736x/b1/e0/71/b1e0717df46c383c3e8918a4242768c4.jpg",
            likes: "1.8k",
            comments: "96",
        },
        {
            id: 3,
            image:
                "https://i.pinimg.com/736x/0b/8b/c9/0b8bc93affaed0759d3163ca9ac735e6.jpg",
            likes: "3.1k",
            comments: "220",
        },
        {
            id: 4,
            image:
                "https://i.pinimg.com/736x/3b/de/8e/3bde8ebd5eba68e47fefb1d2dece07ab.jpg",
            likes: "2.2k",
            comments: "110",
        },
    ];

    const faqs = [
  {
    question: "What types of furniture do you offer?",
    answer:
      "We offer luxury furniture collections including sofas, dining tables, beds, office chairs, gaming chairs and premium modern decor items.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including credit cards, debit cards, UPI, PayPal and net banking for secure online shopping.",
  },
  {
    question: "Can I track my furniture delivery?",
    answer:
      "Yes, once your order is shipped you will receive a tracking link via email and SMS for real-time updates.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a flexible return policy within 7 days for eligible furniture items in original condition.",
  },
];

const [activeFaq, setActiveFaq] = useState(1);

const [email, setEmail] = useState("");
const [error, setError] = useState("");
const [showToast, setShowToast] = useState(false);

const handleNewsletterSubmit = (e) => {
  e.preventDefault();

  if (!email.trim()) {
    setError("Please enter your email address.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  setError("");
  setShowToast(true);
  setEmail("");

  setTimeout(() => {
    setShowToast(false);
  }, 3000);
};

    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <CategorySection />
            <ProductCollectionSection products={products} />

            {/* Flash sale section */}
            <section className="bg-white py-14 md:py-20 overflow-hidden relative">
                {/* BLUR */}
                {/* 
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/10 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/20 blur-3xl rounded-full"></div> */}

                <div className="max-w-[1250px] mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 xl:grid-cols-[65%_35%] gap-6">

                        {/* LEFT */}

                        <div
                            data-aos="fade-right"
                            data-aos-duration="1200"
                            className="bg-gradient-to-br from-[#ECECEC] to-[#DDDDDD] rounded-[35px] px-5 md:px-10 py-10 relative overflow-hidden"
                        >
                            {/* SALE */}

                            <h1 className="absolute top-10 left-[-30px] text-[80px] md:text-[120px] font-black text-white/20 rotate-[-20deg] select-none">
                                SALE
                            </h1>

                            {/* CONTENT */}

                            <div className="text-center relative z-10">
                                <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-5 py-3">
                                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>

                                    <p className="font-semibold text-zinc-800">
                                        Limited Time Offer
                                    </p>
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mt-6">
                                    Flash <span className="text-primary">Sale!</span>
                                </h2>

                                <p className="text-lg md:text-2xl text-zinc-700 mt-5">
                                    Get 25% off on luxury furniture collection.
                                </p>

                                {/* TIMER */}

                                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12">
                                    {[
                                        [timeLeft.days, "Days"],
                                        [timeLeft.hours, "Hours"],
                                        [timeLeft.minutes, "Minutes"],
                                        [timeLeft.seconds, "Seconds"],
                                    ].map(([number, label], i) => (
                                        <div
                                            key={i}
                                            className="bg-white/60 backdrop-blur-md rounded-[24px] px-5 py-5 md:px-8 min-w-[100px]"
                                        >
                                            <h3 className="text-4xl md:text-6xl font-bold text-zinc-900">
                                                {number}
                                            </h3>

                                            <p className="text-base md:text-lg text-zinc-600 mt-2">
                                                {label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-12 bg-primary hover:bg-[#163126] duration-300 text-white px-8 py-4 rounded-full text-lg md:text-xl font-semibold inline-flex items-center gap-3">
                                    Shop Now
                                    <i className="ri-arrow-right-line text-2xl"></i>
                                </button>
                            </div>
                        </div>

                        {/* RIGHT */}

                        <div
                            data-aos="fade-left"
                            data-aos-duration="1200"
                            className="grid grid-cols-2 gap-4 min-h-[520px] md:min-h-[650px]"
                        >
                            <div className="relative rounded-[30px] overflow-hidden h-[520px] md:h-[650px]">
                                <div className="absolute inset-0 bg-black/10 z-10"></div>

                                <img
                                    src="https://i.pinimg.com/1200x/f4/43/04/f443048edd4404b7a9fc1f3f981861e0.jpg"
                                    alt="Modern Chair"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-4 border-[3px] border-white rounded-[24px] z-20"></div>

                                <div className="absolute bottom-6 left-6 z-20 text-white">
                                    <p className="text-sm uppercase tracking-[3px]">
                                        Luxury
                                    </p>

                                    <h3 className="text-2xl md:text-3xl font-bold mt-2">
                                        Modern Chair
                                    </h3>
                                </div>
                            </div>

                            <div className="relative rounded-[30px] overflow-hidden h-[520px] md:h-[650px]">
                                <div className="absolute inset-0 bg-black/10 z-10"></div>

                                <img
                                    src="https://i.pinimg.com/736x/ee/f3/72/eef372445e72c45f7e0d8f24b3257620.jpg"
                                    alt="Wooden Sofa"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-4 border-[3px] border-white rounded-[24px] z-20"></div>

                                <div className="absolute bottom-6 left-6 z-20 text-white">
                                    <p className="text-sm uppercase tracking-[3px]">
                                        Premium
                                    </p>

                                    <h3 className="text-2xl md:text-3xl font-bold mt-2">
                                        Wooden Sofa
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TODAY DEALS SECTION */}
            <section className="bg-white py-14 md:py-20 overflow-hidden relative">
                {/* GRADIENT */}

                {/* <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/10 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/20 blur-3xl rounded-full"></div> */}

                <div className="px-4 md:px-8 lg:px-[90px] relative z-10">
                    {/* TOP */}

                    <div
                        data-aos="fade-up"
                        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 max-w-[1250px] mx-auto"
                    >
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-[2px] bg-accent"></div>

                                <p className="text-zinc-700 text-lg">
                                    Today Deals
                                </p>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-zinc-900">
                                <span className="text-primary">
                                    Deals
                                </span>{" "}
                                of the Day
                            </h2>
                        </div>

                        <div className="max-w-[650px]">
                            <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                                Discover premium furniture crafted for elegant interiors and
                                modern living spaces.
                            </p>
                        </div>
                    </div>

                    {/* SWIPER */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="overflow-hidden"
                    >
                        <Swiper
                            modules={[Mousewheel]}
                            mousewheel={{
                                forceToAxis: true,
                                releaseOnEdges: true,
                            }}
                            spaceBetween={25}
                            slidesPerView={"auto"}
                            grabCursor={true}
                        >
                            {products.slice(0, 5).map((product) => (
                                <SwiperSlide
                                    key={product.id}
                                    className="!w-auto"
                                >
                                    <DealCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>


            {/* PROMO Banner SECTION */}
            <section className="bg-white py-14 md:py-20 overflow-hidden relative">
                

                <div className="max-w-[1350px] mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* BANNER 1 */}

                        <div
                            data-aos="fade-right"
                            data-aos-duration="1200"
                            className="group bg-secondary rounded-[35px] overflow-hidden relative min-h-[320px] md:min-h-[420px] px-6 sm:px-8 md:px-12 py-8 md:py-12"
                        >
                            <div className="absolute inset-0 bg-black/[0.02]"></div>

                            <div className="absolute top-5 right-5 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm md:text-base font-semibold text-zinc-800 z-20">
                                HOT SALE
                            </div>

                            <div className="relative z-10 max-w-[420px]">
                                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-3 rounded-full">
                                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>

                                    <p className="text-zinc-800 text-base md:text-lg font-medium">
                                        Flat 20% Discount
                                    </p>
                                </div>

                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-tight mt-6">
                                    Latest Gaming Chairs
                                </h2>

                                <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-6">
                                    Discover premium gaming chairs designed for comfort,
                                    luxury and performance.
                                </p>

                                <button className="mt-10 bg-primary hover:bg-[#163126] duration-300 text-white px-7 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-medium flex items-center gap-3">
                                    Shop Now
                                    <i className="ri-arrow-right-line text-2xl"></i>
                                </button>
                            </div>

                            <img
                                src="/public/images/gaming_chair-removebg-preview.png"
                                alt="Gaming Chair"
                                loading="lazy"
                                className="absolute bottom-[-10px] right-[-70px] sm:right-[-90px] md:right-[-120px] lg:right-[-150px] w-[220px] sm:w-[280px] md:w-[360px] lg:w-[430px] object-contain animate-[float_5s_ease-in-out_infinite]"
                            />
                        </div>

                        {/* BANNER 2 */}

                        <div
                            data-aos="fade-left"
                            data-aos-duration="1200"
                            className="group bg-accent rounded-[35px] overflow-hidden relative min-h-[320px] md:min-h-[420px] px-6 sm:px-8 md:px-12 py-8 md:py-12"
                        >
                            <div className="absolute inset-0 bg-black/[0.02]"></div>

                            <div className="absolute top-5 right-5 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm md:text-base font-semibold text-zinc-800 z-20">
                                NEW ARRIVAL
                            </div>

                            <div className="relative z-10 max-w-[420px]">
                                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-3 rounded-full">
                                    <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>

                                    <p className="text-zinc-800 text-base md:text-lg font-medium">
                                        Flat 15% Discount
                                    </p>
                                </div>

                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-tight mt-6">
                                    Wood Chair Collection
                                </h2>

                                <p className="text-zinc-700 text-base md:text-lg leading-relaxed mt-6">
                                    Premium wooden chair collection for luxury modern interiors.
                                </p>

                                <button className="mt-10 bg-primary hover:bg-[#163126] duration-300 text-white px-7 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-medium flex items-center gap-3">
                                    Shop Now
                                    <i className="ri-arrow-right-line text-2xl"></i>
                                </button>
                            </div>

                            <img
                                src="/public/images/gaming_chair_2-removebg-preview.png"
                                alt="Wood Chair"
                                loading="lazy"
                                className="absolute bottom-[-20px] right-[-70px] sm:right-[-90px] md:right-[-120px] lg:right-[-150px] w-[220px] sm:w-[280px] md:w-[360px] lg:w-[450px] object-contain animate-[float_6s_ease-in-out_infinite]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial section */}
            <section className="bg-secondary py-16 md:py-24 overflow-hidden relative">
                {/* FLOATING GRADIENTS */}



                <div className="max-w-[1350px] mx-auto px-4 relative z-10">
                    {/* TOP */}

                    <div className="text-center" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-8 h-[2px] bg-accent"></div>

                            <p className="text-zinc-700 text-lg md:text-xl">
                                Testimonial
                            </p>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mt-5 leading-tight">
                            What <span className="text-primary">Our Clients Say</span>
                        </h2>
                    </div>

                    {/* CARDS */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14 max-w-[1350px] mx-auto"
                    >
                        {/* CARD 1 */}

                        <div className="bg-white/70 backdrop-blur-md rounded-[30px] p-6 md:p-8 border border-white/50 h-full">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                    <div className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300"
                                            alt="Leslie Alexander"
                                            loading="lazy"
                                            className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full object-cover border-4 border-white"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900">
                                                Leslie Alexander
                                            </h3>

                                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                ✔ Verified
                                            </div>
                                        </div>

                                        <p className="text-zinc-500 text-lg mt-2">
                                            Architecture
                                        </p>

                                        <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className="ri-star-fill text-accent text-2xl"
                                                    ></i>
                                                ))}
                                            </div>

                                            <span className="text-xl font-medium">5.0</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                                    <i className="ri-double-quotes-r text-3xl text-primary"></i>
                                </div>
                            </div>

                            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-8">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                        </div>

                        {/* CARD 2 */}

                        <div className="bg-white/70 backdrop-blur-md rounded-[30px] p-6 md:p-8 border border-white/50 h-full">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                    <div className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300"
                                            alt="Jenny Wilson"
                                            loading="lazy"
                                            className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full object-cover border-4 border-white"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900">
                                                Jenny Wilson
                                            </h3>

                                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                ✔ Verified
                                            </div>
                                        </div>

                                        <p className="text-zinc-500 text-lg mt-2">
                                            Interior Designer
                                        </p>

                                        <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className="ri-star-fill text-accent text-2xl"
                                                    ></i>
                                                ))}
                                            </div>

                                            <span className="text-xl font-medium">5.0</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                                    <i className="ri-double-quotes-r text-3xl text-primary"></i>
                                </div>
                            </div>

                            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-8">
                                Amazing furniture quality, fast delivery and excellent customer
                                support experience. Highly recommended.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/*  BLOG SECTION */}

            <section className="bg-white py-16 md:py-24 overflow-hidden relative">


                <div className="max-w-[1250px] mx-auto px-4 relative z-10">
                    {/* TOP */}

                    <div
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
                        data-aos="fade-up"
                    >
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[2px] bg-accent"></div>

                                <p className="text-zinc-700 text-lg md:text-xl">
                                    News & Blogs
                                </p>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight mt-5">
                                Our Latest
                                <br />
                                <span className="text-primary">
                                    News & Blogs
                                </span>
                            </h2>
                        </div>

                        <button className="bg-primary hover:bg-[#163126] duration-300 text-white px-8 md:px-10 py-4 rounded-full text-base md:text-xl font-medium w-fit hover:shadow-xl">
                            View All Blogs
                        </button>
                    </div>

                    {/* BLOG GRID */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {blogs.map((blog, index) => (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Section */}

            <section className="bg-secondary py-16 md:py-24 overflow-hidden relative">
                {/* GRADIENT */}



                <div className="relative z-10">
                    {/* TOP */}

                    <div className="text-center px-4" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-8 h-[2px] bg-accent"></div>

                            <p className="text-zinc-700 text-lg md:text-xl">
                                Follow Us
                            </p>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mt-5 leading-tight">
                            Follow Us On{" "}
                            <span className="text-primary">
                                Instagram
                            </span>
                        </h2>
                    </div>

                    {/* SWIPER */}

                    <div
                        className="mt-14 px-4"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <Swiper
                            modules={[Autoplay]}
                            loop={true}
                            grabCursor={true}
                            spaceBetween={20}
                            speed={1000}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.2,
                                },
                                576: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2.5,
                                },
                                1024: {
                                    slidesPerView: 3.2,
                                },
                                1280: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {instagramPosts.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <div className="group relative rounded-[30px] overflow-hidden h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                        <img
                                            src={post.image}
                                            alt="Instagram Post"
                                            loading="lazy"
                                            className="w-full h-full object-cover transition duration-700 group-hover:scale-125"
                                        />

                                        {/* Overlay */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 duration-500 flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                                <i className="ri-instagram-line text-white text-5xl"></i>
                                            </div>

                                            <div className="flex items-center gap-6 mt-6 text-white">
                                                <div className="flex items-center gap-2">
                                                    <i className="ri-heart-fill text-xl"></i>
                                                    <span className="text-lg font-medium">
                                                        {post.likes}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <i className="ri-chat-3-fill text-xl"></i>
                                                    <span className="text-lg font-medium">
                                                        {post.comments}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>


            {/* Faq Section */}

            <section className="bg-white py-16 md:py-24 overflow-hidden relative">
 

  <div className="max-w-[1200px] mx-auto px-4 relative z-10">
    {/* TOP */}

    <div className="text-center" data-aos="fade-up">
      <div className="flex items-center justify-center gap-3">
        <div className="w-8 h-[2px] bg-accent"></div>

        <p className="text-zinc-700 text-lg md:text-xl">
          FAQs
        </p>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mt-5 leading-tight">
        Questions?
        <span className="text-primary">
          {" "}Look Here.
        </span>
      </h2>
    </div>

    {/* FAQ */}

   <div className="mt-14 space-y-5 ">
  {faqs.map((faq, index) => {
    const isOpen = activeFaq === index;

    return (
      <div
        key={index}
        className={`rounded-[24px] border border-secondary overflow-hidden transition-all duration-300 ${
          isOpen
            ? "bg-primary shadow-2xl ring-2 ring-primary/20"
            : "bg-white/70 backdrop-blur-md border border-white/50"
        }`}
      >
        <button
          type="button"
          onClick={() =>
            setActiveFaq(isOpen ? null : index)
          }
          className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 md:px-8 py-6 text-left"
        >
          <span
            className={`text-base sm:text-lg md:text-xl font-medium ${
              isOpen
                ? "text-white"
                : "text-zinc-900"
            }`}
          >
            {faq.question}
          </span>

          <i
            className={`text-2xl shrink-0 transition-all duration-300 ${
              isOpen
                ? "ri-subtract-line text-accent rotate-180"
                : "ri-add-line text-zinc-700"
            }`}
          ></i>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 sm:px-6 md:px-8 pb-6">
            <p
              className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                isOpen
                  ? "text-white/80"
                  : "text-zinc-600"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>

    {/* CTA */}

    <div
      className="mt-14 text-center"
      data-aos="fade-up"
    >
      <p className="text-zinc-600 text-base md:text-lg">
        Still have questions?
      </p>

      <button className="mt-5 bg-primary hover:bg-[#163126] duration-300 text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:shadow-2xl">
        Contact Support
      </button>
    </div>
  </div>
</section>

    
    {/* Newsletter section */}

    <section className="bg-[#F5F5F5] py-16 md:py-24 relative overflow-hidden">
  {/* BG */}

  <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-primary/10 blur-3xl rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-accent/20 blur-3xl rounded-full"></div>

  {/* TOP DOTS */}

  <div className="absolute top-8 right-8 hidden md:grid grid-cols-5 gap-3 opacity-40">
    {[...Array(10)].map((_, i) => (
      <span
        key={i}
        className="w-3 h-3 rounded-full bg-zinc-300"
      ></span>
    ))}
  </div>

  {/* BOTTOM DOTS */}

  <div className="absolute bottom-8 left-8 hidden md:grid grid-cols-5 gap-3 opacity-40">
    {[...Array(10)].map((_, i) => (
      <span
        key={i}
        className="w-3 h-3 rounded-full bg-zinc-300"
      ></span>
    ))}
  </div>

  <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
    {/* SMALL TITLE */}

    <div
      className="flex items-center justify-center gap-3"
      data-aos="fade-up"
    >
      <div className="w-8 h-[2px] bg-accent"></div>

      <p className="text-zinc-700 text-lg md:text-xl">
        Our Newsletter
      </p>
    </div>

    {/* HEADING */}

    <h2
      data-aos="fade-up"
      data-aos-delay="100"
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight mt-8"
    >
      Subscribe to Our Newsletter
      <br className="hidden md:block" />
      <span className="text-primary">
        {" "}
        To Get Latest Collection
      </span>
    </h2>

    {/* TEXT */}

    <p
      data-aos="fade-up"
      data-aos-delay="200"
      className="text-zinc-600 text-base sm:text-lg md:text-2xl leading-relaxed mt-8 max-w-[900px] mx-auto"
    >
      Get 20% off on your first order just by subscribing to our newsletter.
    </p>

    <p
      data-aos="fade-up"
      data-aos-delay="250"
      className="text-zinc-500 text-sm md:text-base mt-5"
    >
      No spam. Unsubscribe anytime.
    </p>

    {/* FORM */}

    <form
      onSubmit={handleNewsletterSubmit}
      data-aos="fade-up"
      data-aos-delay="300"
      className="mt-12 flex flex-col md:flex-row items-center justify-center gap-5"
    >
      {/* INPUT */}

      <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-full h-[74px] md:h-[82px] w-full md:w-[580px] px-5 flex items-center gap-4 transition-all duration-500 focus-within:ring-2 focus-within:ring-primary/20">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
          <i className="ri-mail-line text-white text-2xl md:text-3xl"></i>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter Email Address"
          className="w-full h-full bg-transparent outline-none text-zinc-700 text-base md:text-xl placeholder:text-zinc-400"
        />
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        className="bg-accent hover:bg-[#e9ae1a] duration-300 rounded-full h-[74px] md:h-[82px] px-10 md:px-14 text-zinc-900 text-lg md:text-2xl font-semibold w-full md:w-auto"
      >
        Subscribe
      </button>
    </form>

    {/* ERROR */}

    {error && (
      <p className="text-red-500 text-sm md:text-base mt-5">
        {error}
      </p>
    )}
  </div>

  {/* TOAST */}

  <div
    className={`fixed top-8 right-4 md:right-8 bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 duration-500 z-[999] ${
      showToast
        ? "translate-x-0 opacity-100"
        : "translate-x-[150%] opacity-0"
    }`}
  >
    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
      <i className="ri-check-line text-2xl"></i>
    </div>

    <div>
      <h4 className="font-semibold text-lg">
        Subscribed!
      </h4>

      <p className="text-white/80 text-sm">
        Thanks for joining us.
      </p>
    </div>
  </div>
</section>
        </>
    )
}

export default Home