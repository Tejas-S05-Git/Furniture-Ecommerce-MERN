import { Bell, Menu, Search, ChevronDown } from "lucide-react";

const AdminHeader = ({ setOpen }) => {
  return (
    <header className="h-20 bg-white border-b border-zinc-200 px-6 flex items-center justify-between sticky top-0 z-30">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden"
        >
          <Menu />
        </button>

        <div className="hidden md:flex items-center gap-3 bg-secondary px-4 py-3 rounded-xl w-[350px]">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products, orders..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="relative">
          <Bell />

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            A
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-xs text-zinc-500">
              Store Manager
            </p>
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;