import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Blog", path: "/blog" },
];

const megaMenuData = {
  Chairs: [
    "Gaming Chair",
    "Office Chair",
    "Armchair",
    "Dining Chair",
    "Bar Stool",
  ],

  Sofa: [
    "Reception Sofa",
    "Sectional Sofa",
    "Lounge Sofa",
    "Curved Sofa",
  ],

  Lighting: [
    "Table Lights",
    "Floor Lights",
    "Ceiling Lights",
    "Wall Lights",
  ],

  Tables: [
    "Dining Tables",
    "Coffee Tables",
    "Side Tables",
    "Console Tables",
  ],
};

export default function Navbar() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Chairs");
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const { cartItems } = useCart();

  const openSidebar = () => {
    setSidebarOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = "auto";
  };

  const closeTopBar = () => {
    setTopBarVisible(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* TOP BAR */}
      {topBarVisible && (
        <div
          data-aos="fade-down"
          data-aos-duration="800"
          className="bg-primary text-white hidden lg:block relative group transition-all duration-300"
        >
          <div className="max-w-[1250px] mx-auto flex items-center justify-between py-4">
            <p className="text-[18px]">Call Us : +123-456-789</p>

            <p className="text-[18px]">
              Sign up and GET 25% OFF for your first order.
              <span className="text-accent underline font-semibold cursor-pointer ml-2">
                Sign up now
              </span>
            </p>

            <div className="flex items-center gap-4 text-accent text-[20px]">
              <i className="ri-facebook-fill cursor-pointer"></i>
              <i className="ri-twitter-fill cursor-pointer"></i>
              <i className="ri-pinterest-fill cursor-pointer"></i>
              <i className="ri-instagram-line cursor-pointer"></i>
              <i className="ri-youtube-fill cursor-pointer"></i>
            </div>
          </div>

          <button
            onClick={closeTopBar}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300 text-2xl"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-[1250px] mx-auto px-4">
          <div className="h-[90px] flex items-center justify-between">

            {/* LOGO */}
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

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-10 text-[18px] font-medium text-zinc-800">
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  className="relative group"
                  data-aos="fade-down"
                  data-aos-delay={100 + index * 100}
                  onMouseEnter={() =>
                    item.name === "Categories" && setShowMegaMenu(true)
                  }
                  onMouseLeave={() =>
                    item.name === "Categories" && setShowMegaMenu(false)
                  }
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `transition duration-300 hover:text-primary ${isActive ? "text-primary" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>

                  {/* ONLY FOR CATEGORIES */}
                  {item.name === "Categories" && showMegaMenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[1240px] bg-white rounded-[30px] shadow-2xl p-10 z-50 border border-zinc-100">

                      <div className="grid grid-cols-5 gap-10">

                        {/* CHAIRS */}
                        <div>
                          <h3 className="font-semibold text-[22px] mb-5">
                            Chairs
                          </h3>

                          <div className="space-y-4 text-zinc-500">
                            <button onClick={() => navigate("/shop?category=Gaming Chair")} className="block hover:text-primary">Gaming Chair</button>
                            <button onClick={() => navigate("/shop?category=Office Chair")} className="block hover:text-primary">Office Chair</button>
                            <button onClick={() => navigate("/shop?category=Armchair")} className="block hover:text-primary">Armchair</button>
                            <button onClick={() => navigate("/shop?category=Dining Chair")} className="block hover:text-primary">Dining Chair</button>
                            <button onClick={() => navigate("/shop?category=Bar Stool")} className="block hover:text-primary">Bar Stool</button>
                          </div>
                        </div>

                        {/* SOFA */}
                        <div>
                          <h3 className="font-semibold text-[22px] mb-5">
                            Sofa
                          </h3>

                          <div className="space-y-4 text-zinc-500">
                            <button onClick={() => navigate("/shop?category=Reception Sofa")} className="block hover:text-primary">Reception Sofa</button>
                            <button onClick={() => navigate("/shop?category=Sectional Sofa")} className="block hover:text-primary">Sectional Sofa</button>
                            <button onClick={() => navigate("/shop?category=Lounge Sofa")} className="block hover:text-primary">Lounge Sofa</button>
                            <button onClick={() => navigate("/shop?category=Curved Sofa")} className="block hover:text-primary">Curved Sofa</button>
                          </div>
                        </div>

                        {/* LIGHTING */}
                        <div>
                          <h3 className="font-semibold text-[22px] mb-5">
                            Lighting
                          </h3>

                          <div className="space-y-4 text-zinc-500">
                            <button onClick={() => navigate("/shop?category=Table Lights")} className="block hover:text-primary">Table Lights</button>
                            <button onClick={() => navigate("/shop?category=Floor Lights")} className="block hover:text-primary">Floor Lights</button>
                            <button onClick={() => navigate("/shop?category=Ceiling Lights")} className="block hover:text-primary">Ceiling Lights</button>
                            <button onClick={() => navigate("/shop?category=Wall Lights")} className="block hover:text-primary">Wall Lights</button>
                          </div>
                        </div>

                        {/* TABLES */}
                        <div>
                          <h3 className="font-semibold text-[22px] mb-5">
                            Tables
                          </h3>

                          <div className="space-y-4 text-zinc-500">
                            <button onClick={() => navigate("/shop?category=Dining Tables")} className="block hover:text-primary">Dining Tables</button>
                            <button onClick={() => navigate("/shop?category=Coffee Tables")} className="block hover:text-primary">Coffee Tables</button>
                            <button onClick={() => navigate("/shop?category=Side Tables")} className="block hover:text-primary">Side Tables</button>
                            <button onClick={() => navigate("/shop?category=Console Tables")} className="block hover:text-primary">Console Tables</button>
                          </div>
                        </div>

                        {/* OFFER BOX */}
                        <div className="bg-accent rounded-[24px] p-6">
                          <h3 className="text-3xl font-bold mb-4">
                            25% Off Furniture
                          </h3>

                          <button
                            onClick={() => navigate("/shop")}
                            className="bg-primary text-white px-6 py-3 rounded-full"
                          >
                            Shop Now
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* DESKTOP ICONS */}
            <div
              data-aos="fade-left"
              data-aos-delay="400"
              className="hidden md:flex items-center gap-5 text-[24px] text-zinc-800"
            >
              <NavbarSearch />
              <div
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer"
              >
                <i className="ri-heart-line hover:text-primary transition text-2xl"></i>

                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-accent text-black text-[11px] font-bold flex items-center justify-center leading-none">
                    {wishlistItems.length}
                  </span>
                )}
              </div>

              <Link to="/cart" className="relative">
                <i className="ri-shopping-cart-2-line text-2xl cursor-pointer hover:text-primary transition"></i>

                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-accent text-black text-[11px] font-bold flex items-center justify-center leading-none">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <Link to="/my-account"><i className="ri-user-3-line cursor-pointer hover:text-primary transition"></i></Link>
            </div>

            {/* MOBILE BTN */}
            <button
              onClick={openSidebar}
              data-aos="zoom-in"
              className="lg:hidden text-3xl"
            >
              <i className="ri-menu-3-line"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${sidebarOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible"
          }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-screen bg-white shadow-2xl z-50 p-6 transition-all duration-500 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-3xl font-bold text-primary">Menu</h1>

          <button onClick={closeSidebar}>
            <i className="ri-close-line text-4xl"></i>
          </button>
        </div>

        <ul className="flex flex-col gap-8 mt-10 text-[20px] font-medium text-zinc-800">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `hover:text-primary transition ${isActive ? "text-primary" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 mt-12 text-[28px] text-primary">
          <i className="ri-search-line cursor-pointer"></i>
          <i className="ri-heart-line cursor-pointer"></i>
          <i className="ri-shopping-cart-2-line cursor-pointer"></i>
          <i className="ri-user-3-line cursor-pointer"></i>
        </div>
      </div>
    </>
  );
}