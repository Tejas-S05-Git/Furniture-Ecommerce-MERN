import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-zinc-800">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-1">
          Welcome back. Here's your store overview.
        </p>
      </div>

      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border">
        <CalendarDays size={18} />

        <span className="text-sm">
          June 2026
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;