import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";

import GeneralSettings from "../../../components/settings/GeneralSettings";
import BrandingSettings from "../../../components/settings/BrandingSettings";
import SocialSettings from "../../../components/settings/SocialSettings";
import SeoSettings from "../../../components/settings/SeoSettings";
import SecuritySettings from "../../../components/settings/SecuritySettings";

const Settings = () => {
  const [activeTab, setActiveTab] =
    useState("general");

  const tabs = [
    {
      id: "general",
      label: "General",
    },
    {
      id: "branding",
      label: "Branding",
    },
    {
      id: "social",
      label: "Social Links",
    },
    {
      id: "seo",
      label: "SEO",
    },
    {
      id: "security",
      label: "Security",
    },
  ];

  return (
    <div className="space-y-8">

      <PageHeader
        title="Settings"
        subtitle="Manage store settings"
      />

      {/* Tabs */}

      <div
        className="
        bg-white
        border
        border-zinc-100
        rounded-3xl
        p-3
        overflow-x-auto
        "
      >
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id
                )
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-medium
                whitespace-nowrap
                transition
                ${
                  activeTab ===
                  tab.id
                    ? "bg-primary text-white"
                    : "hover:bg-secondary"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab ===
        "general" && (
        <GeneralSettings />
      )}

      {activeTab ===
        "branding" && (
        <BrandingSettings />
      )}

      {activeTab ===
        "social" && (
        <SocialSettings />
      )}

      {activeTab ===
        "seo" && (
        <SeoSettings />
      )}

      {activeTab ===
        "security" && (
        <SecuritySettings />
      )}

    </div>
  );
};

export default Settings;