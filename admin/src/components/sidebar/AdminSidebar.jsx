import { NavLink } from "react-router-dom";
import { adminSidebarData } from "../../data/adminSidebarData";
import { Link } from "react-router-dom";
const AdminSidebar = ({ open }) => {
  return (
    <aside
      className={`
      fixed lg:static
      top-0 left-0
      z-50
      h-screen
      w-72
      bg-white
      border-r
      border-zinc-200
     
      overflow-y-auto no-scrollbar
      transition-all
      duration-300
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
    >
      <div className="h-20 flex items-center px-6 border-b">
        <Link
              to="/"
              data-aos="fade-right"
              data-aos-duration="1000"
              className="flex items-center gap-3"
            >
              <div className="w-[45px] h-[45px] rounded-full bg-primary flex items-center justify-center">
                <span className="text-accent text-2xl font-bold">F</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-zinc-800">
                Furniture<span className="text-accent">.</span>
              </h1>
            </Link>
      </div>

      <div className="p-5 space-y-8">
        {adminSidebarData.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <h4 className="text-xs font-semibold text-zinc-400 mb-3">
                {section.title}
              </h4>
            )}

            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      transition-all

                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-secondary text-zinc-700"
                      }
                    `
                    }
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;