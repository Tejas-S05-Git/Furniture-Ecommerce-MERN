import React, { useState } from "react";
import HeroPage from "../components/HeroPage";
import FeaturesSection from "../components/FeaturesSection";

const faqData = {
    "General Information": [
        {
            question: "How can I place an order?",
            answer:
                "Browse our furniture collection, choose your favorite item, add it to cart, and proceed to checkout securely.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept Credit Cards, Debit Cards, UPI, Net Banking, and Cash on Delivery on selected orders.",
        },
        {
            question: "Can I track my order after it's been placed?",
            answer:
                "Yes. Once your order is confirmed, you’ll receive tracking details by email and inside your account dashboard.",
        },
        {
            question: "Do you offer customer support?",
            answer:
                "Yes. Our support team is available 24/7 for any product, delivery, or order related help.",
        },
        {
            question: "What is your return policy?",
            answer:
                "We offer easy returns and replacements within 7 days for eligible products.",
        },
    ],

    "Ordering & Shipping": [
        {
            question: "How long does delivery take?",
            answer:
                "Most orders are delivered within 5–7 business days depending on your location.",
        },
        {
            question: "Do you offer free shipping?",
            answer:
                "Yes, free shipping is available on selected furniture collections above a minimum order value.",
        },
        {
            question: "Can I schedule my delivery date?",
            answer:
                "Yes, for selected locations you can choose your preferred delivery slot during checkout.",
        },
        {
            question: "Do you deliver furniture across India?",
            answer:
                "Yes, we deliver to most cities and towns across India through our trusted delivery partners.",
        },
    ],

    "Returns & Exchanges": [
        {
            question: "Can I return furniture after delivery?",
            answer:
                "Yes. Returns are accepted within 7 days if the item is unused and in original condition.",
        },
        {
            question: "Can I exchange a damaged product?",
            answer:
                "Yes, damaged or defective products can be exchanged quickly after verification from our support team.",
        },
        {
            question: "How do I request a return?",
            answer:
                "You can request a return from your account dashboard or by contacting customer support with your order ID.",
        },
        {
            question: "When will I receive my refund?",
            answer:
                "Refunds are usually processed within 5–7 business days after the returned item is approved.",
        },
    ],

    "Payments & Discounts": [
        {
            question: "Can I use discount coupons?",
            answer:
                "Yes. You can apply coupon codes during checkout before payment.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept UPI, debit cards, credit cards, net banking, and secure online wallet payments.",
        },
        {
            question: "Do you offer EMI on furniture?",
            answer:
                "Yes, EMI options are available on selected furniture items through supported payment partners.",
        },
        {
            question: "Can I combine multiple offers together?",
            answer:
                "Some offers can be combined, while others may apply individually depending on the promotion terms.",
        },
    ],

    "Account & Profile": [
        {
            question: "How do I create an account?",
            answer:
                "Click the account icon, register using email or mobile number, and start shopping instantly.",
        },
        {
            question: "How can I update my profile details?",
            answer:
                "You can edit your name, email, address, and phone number anytime from your account settings.",
        },
        {
            question: "I forgot my password. What should I do?",
            answer:
                "Click on 'Forgot Password' on the login page and follow the reset instructions sent to your email.",
        },
        {
            question: "Where can I view my previous orders?",
            answer:
                "All your past and current orders are available inside the My Account section under Order History.",
        },
    ],
};

const FaqSection = () => {
    const categories = Object.keys(faqData);

    const [activeTab, setActiveTab] = useState(
        "General Information"
    );

    const [openIndex, setOpenIndex] = useState(1);

    return (
        <>
            <HeroPage title="FAQs" breadcrumbs={[{ label: "Home", path: "/" }, { label: "FAQs" }]} />
            <section className="py-16 md:py-24 bg-White">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-10">

                        {/* LEFT TABS */}
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setActiveTab(category);
                                        setOpenIndex(null);
                                    }}
                                    className={`w-full text-left px-6 h-16 rounded-2xl border transition-all duration-300 text-lg font-medium
                  ${activeTab === category
                                            ? "bg-accent text-zinc-900 border-accent"
                                            : "bg-white border-zinc-200 hover:border-accent"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* RIGHT FAQ */}
                        <div className="space-y-4">
                            {faqData[activeTab].map((faq, index) => (
                                <div
                                    key={index}
                                    className={`rounded-2xl border overflow-hidden transition-all duration-300
                ${openIndex === index
                                            ? "bg-primary border-primary"
                                            : "bg-white border-zinc-200"
                                        }`}
                                >
                                    <button
                                        onClick={() =>
                                            setOpenIndex(
                                                openIndex === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                        className="w-full flex items-center justify-between px-5 md:px-6 py-5 text-left"
                                    >
                                        <h3
                                            className={`font-semibold text-base md:text-2xl leading-snug
                    ${openIndex === index
                                                    ? "text-white"
                                                    : "text-zinc-900"
                                                }`}
                                        >
                                            {faq.question}
                                        </h3>

                                        <span
                                            className={`text-2xl md:text-3xl font-light
                    ${openIndex === index
                                                    ? "text-accent"
                                                    : "text-zinc-700"
                                                }`}
                                        >
                                            {openIndex === index ? "−" : "+"}
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out
                  ${openIndex === index
                                                ? "grid-rows-[1fr]"
                                                : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-5 md:px-6 pb-5 text-sm md:text-base text-white/80 leading-7 max-w-3xl">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
            <FeaturesSection />
        </>
    );
};

export default FaqSection;