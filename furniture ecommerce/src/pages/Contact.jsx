import React from 'react'
import HeroPage from '../components/HeroPage'
import { useState } from "react";

const Contact = () => {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      showToast("Please fill all required fields", "error");
      return;
    }

    showToast("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <>
    <HeroPage
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
      />

      <section className="py-20 lg:py-28 bg-white overflow-hidden relative">
      {/* Toast */}

      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl text-white shadow-xl transition-all duration-500 ${
            toast.type === "success"
              ? "bg-primary"
              : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-[1300px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_.8fr] gap-10 xl:gap-16 items-start">
          {/* LEFT */}

          <div
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            {/* TITLE */}

            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                Get in Touch
              </h2>

              <p className="mt-4 text-zinc-500 text-base md:text-lg">
                Your email address will not be published.
                Required fields are marked *
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* ROW */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-3 text-lg font-semibold text-zinc-800">
                    Your Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex. John Doe"
                    className="w-full h-[62px] px-6 rounded-full border border-zinc-200 bg-white outline-none text-zinc-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-lg font-semibold text-zinc-800">
                    Email *
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full h-[62px] px-6 rounded-full border border-zinc-200 bg-white outline-none text-zinc-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* SUBJECT */}

              <div>
                <label className="block mb-3 text-lg font-semibold text-zinc-800">
                  Subject *
                </label>

                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter Subject"
                  className="w-full h-[62px] px-6 rounded-full border border-zinc-200 bg-white outline-none text-zinc-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label className="block mb-3 text-lg font-semibold text-zinc-800">
                  Your Message *
                </label>

                <textarea
                  id="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter here.."
                  className="w-full px-6 py-5 rounded-[28px] border border-zinc-200 bg-white outline-none resize-none text-zinc-700 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                ></textarea>
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="group relative overflow-hidden px-10 h-[62px] rounded-full bg-primary text-white text-lg font-semibold transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(32,74,37,0.25)]"
              >
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>

                <span className="relative z-10">
                  Send Message
                </span>
              </button>
            </form>
          </div>

          {/* RIGHT */}

          <div
            className="bg-primary rounded-[32px] p-8 md:p-10 xl:p-12 text-white relative overflow-hidden"
            data-aos="fade-left"
            data-aos-duration="1200"
          >
            <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-accent/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="pb-10 border-b border-white/10">
                <h3 className="text-3xl font-semibold mb-5">
                  Address
                </h3>

                <p className="text-white/75 text-lg leading-relaxed">
                  8502 Preston Rd. Inglewood, Maine 98380
                </p>
              </div>

              <div className="py-10 border-b border-white/10">
                <h3 className="text-3xl font-semibold mb-5">
                  Contact
                </h3>

                <div className="space-y-3 text-white/75 text-lg">
                  <p>Phone : +0123-456-789</p>
                  <p>Email : example@gmail.com</p>
                </div>
              </div>

              <div className="py-10 border-b border-white/10">
                <h3 className="text-3xl font-semibold mb-5">
                  Open Time
                </h3>

                <div className="space-y-3 text-white/75 text-lg">
                  <p>Monday - Friday : 10:00 - 20:00</p>
                  <p>Saturday - Sunday : 11:00 - 18:00</p>
                </div>
              </div>

              {/* SOCIAL */}

              <div className="pt-10">
                <h3 className="text-3xl font-semibold mb-7">
                  Stay Connected
                </h3>

                <div className="flex items-center flex-wrap gap-4">
                  {[
                    "facebook-fill",
                    "twitter-x-fill",
                    "pinterest-fill",
                    "instagram-line",
                    "youtube-fill",
                  ].map((icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-[58px] h-[58px] rounded-full bg-accent flex items-center justify-center text-primary text-2xl transition-all duration-500 hover:bg-white hover:-translate-y-2"
                    >
                      <i className={`ri-${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    {/* =========================
MAP SECTION
========================= */}

<section className="pb-20 lg:pb-28 bg-white overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
    {/* MAP WRAPPER */}

    <div
      className="rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-zinc-200"
      data-aos="zoom-in"
      data-aos-duration="1200"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.481274111133!2d73.856743!3d18.507398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06fd1a9f0ef%3A0x2c5f4df9e7f4d6a0!2sPune!5e0!3m2!1sen!2sin!4v1724147812567!5m2!1sen!2sin"
        title="Pune Location Map"
        className="w-full h-[350px] md:h-[450px] lg:h-[550px]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>
    </>
  )
}

export default Contact