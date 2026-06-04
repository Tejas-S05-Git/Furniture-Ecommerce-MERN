import React, { useState } from "react";
import PersonalInfo from "../components/myAccount/PersonalInfo";
import Orders from "../components/myAccount/Orders";
import Address from "../components/myAccount/Address";
import Payment from "../components/myAccount/Payment";
import PasswordManager from "../components/myAccount/PasswordManager";
import Logout from "../components/myAccount/Logout";
import HeroPage from "../components/HeroPage";

const tabs = [
    "Personal Information",
    "My Orders",
    "Manage Address",
    "Payment Method",
    "Password Manager",
    "Logout",
];

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState("Personal Information");

    return (
        <>
            <HeroPage title="My Account" breadcrumbs={[{ lable: "Home ", path: "/" }, { label: "My Account" }]} />
            <section className="bg-white min-h-screen py-12 lg:py-20">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-10">

                        {/* Sidebar */}
                        <div className="flex lg:flex-col gap-3 overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`min-w-max lg:w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 font-medium
                ${activeTab === tab
                                            ? "bg-accent text-black border-accent"
                                            : "bg-white border-zinc-200 hover:border-primary"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 border border-zinc-200">
                            {activeTab === "Personal Information" && <PersonalInfo />}
                            {activeTab === "My Orders" && <Orders />}
                            {activeTab === "Manage Address" && <Address />}
                            {activeTab === "Payment Method" && <Payment />}
                            {activeTab === "Password Manager" && <PasswordManager />}
                            {activeTab === "Logout" && <Logout />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}