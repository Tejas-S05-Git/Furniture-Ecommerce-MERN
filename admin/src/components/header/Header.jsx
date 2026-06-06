import { Bell, Menu, Search } from "lucide-react";

const Header = ({ setOpen }) => {
  return (
    <header
      className="
      h-20
      bg-white
      border-b
      px-6
      flex
      items-center
      justify-between
    "
    >
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden"
      >
        <Menu />
      </button>

      <div
        className="
        hidden md:flex
        items-center
        gap-3
        bg-secondary
        px-4
        py-3
        rounded-xl
        w-[350px]
      "
      >
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell />

        <div className="flex items-center gap-3">
          <div
            className="
            w-11
            h-11
            rounded-full
            bg-primary
          "
          ></div>

          <div className="hidden md:block">
            <h3 className="font-semibold">
              Super Admin
            </h3>

            <p className="text-xs text-zinc-500">
              administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;