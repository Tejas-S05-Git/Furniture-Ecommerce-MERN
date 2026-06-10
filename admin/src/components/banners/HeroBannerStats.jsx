import {
  Image,
  CheckCircle,
  XCircle,
  Monitor,
} from "lucide-react";

const HeroBannerStats = ({
  banners,
}) => {
  const totalBanners =
    banners.length;

  const activeBanners =
    banners.filter(
      (banner) =>
        banner.status ===
        "Active"
    ).length;

  const inactiveBanners =
    banners.filter(
      (banner) =>
        banner.status ===
        "Inactive"
    ).length;

  const homepageBanners =
    activeBanners;

  const stats = [
    {
      title:
        "Total Banners",
      value:
        totalBanners,
      icon: Image,
    },

    {
      title:
        "Active Banners",
      value:
        activeBanners,
      icon: CheckCircle,
    },

    {
      title:
        "Inactive Banners",
      value:
        inactiveBanners,
      icon: XCircle,
    },

    {
      title:
        "Homepage Banners",
      value:
        homepageBanners,
      icon: Monitor,
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >
      {stats.map((item) => {
        const Icon =
          item.icon;

        return (
          <div
            key={
              item.title
            }
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            shadow-sm
            hover:shadow-md
            transition-all
            duration-300
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p
                  className="
                  text-zinc-500
                  text-sm
                  "
                >
                  {
                    item.title
                  }
                </p>

                <h2
                  className="
                  text-3xl
                  font-bold
                  mt-2
                  "
                >
                  {
                    item.value
                  }
                </h2>
              </div>

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
                "
              >
                <Icon
                  size={24}
                  className="
                  text-primary
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroBannerStats;