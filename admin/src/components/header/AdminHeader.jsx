import { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import notificationsData from "../../data/notificationsData";


const AdminHeader = ({ setOpen }) => {
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] =useState(false);

  const [
    openProfile,
    setOpenProfile,
  ] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <header
      className="
      h-20
      bg-white
      border-b
      border-zinc-200
      px-4
      md:px-6
      flex
      items-center
      justify-between
      sticky
      top-0
      z-30
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            setOpen(true)
          }
          className="lg:hidden"
        >
          <Menu />
        </button>

        <div
          className="
          hidden
          md:flex
          items-center
          gap-3
          bg-secondary
          px-4
          py-3
          rounded-2xl
          w-[350px]
          "
        >
          <Search
            size={18}
          />

          <input
            type="text"
            placeholder="Search products, orders..."
            className="
            bg-transparent
            outline-none
            w-full
            "
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

       {/* Notifications */}

<div className="relative">

  <button
    onClick={() => {
      setOpenNotifications(
        !openNotifications
      );

      setOpenProfile(false);
    }}
    className="
    relative
    p-2
    rounded-xl
    hover:bg-secondary
    transition
    "
  >
    <Bell />

    <span
      className="
      absolute
      -top-1
      -right-1
      w-5
      h-5
      bg-accent
      text-xs
      rounded-full
      flex
      items-center
      justify-center
      "
    >
      3
    </span>
  </button>
{openNotifications && (
  <div
    className="
    absolute
    right-0
    top-14
    w-[380px]
    bg-white
    border
    border-zinc-100
    rounded-3xl
    shadow-2xl
    z-50
    overflow-hidden
    "
  >
    {/* Header */}

    <div
      className="
      px-5
      py-4
      border-b
      border-zinc-100
      flex
      items-center
      justify-between
      "
    >
      <div>
        <h3 className="font-semibold text-lg">
          Notifications
        </h3>

        <p className="text-xs text-zinc-500">
          You have 3 unread notifications
        </p>
      </div>

      <button
        className="
        text-primary
        text-sm
        font-medium
        hover:underline
        "
      >
        Mark all read
      </button>
    </div>

    {/* Notifications */}

    <div className="max-h-[400px] overflow-y-auto">

      {notificationsData.map(
        (notification) => (
          <div
            key={notification.id}
            className="
            px-5
            py-4
            border-b
            border-zinc-100
            hover:bg-secondary
            transition
            cursor-pointer
            "
          >
            <div className="flex gap-3">

              <div
                className="
                w-3
                h-3
                rounded-full
                bg-primary
                mt-2
                shrink-0
                "
              />

              <div className="flex-1">

                <h4
                  className="
                  font-medium
                  text-sm
                  "
                >
                  {notification.title}
                </h4>

                <p
                  className="
                  text-sm
                  text-zinc-500
                  mt-1
                  "
                >
                  {notification.message}
                </p>

                <p
                  className="
                  text-xs
                  text-zinc-400
                  mt-2
                  "
                >
                  {notification.time}
                </p>

              </div>

            </div>
          </div>
        )
      )}

    </div>

    {/* Footer */}

    <div
      className="
      p-4
      bg-zinc-50
      "
    >
      <button
        className="
        w-full
        bg-primary
        text-white
        py-3
        rounded-2xl
        text-sm
        font-medium
        hover:opacity-90
        transition
        "
      >
        View All Notifications
      </button>
    </div>

  </div>
)}

</div>

        {/* Profile */}

        <div className="relative">

          <div
           onClick={() => {
  setOpenProfile(
    !openProfile
  );

  setOpenNotifications(
    false
  );
}}
            className="
            flex
            items-center
            gap-3
            cursor-pointer
            "
          >
             <div
    className="
    w-11
    h-11
    rounded-full
    bg-primary
    flex
    items-center
    justify-center
    text-white
    font-semibold
    "
  >
    A
  </div>

  <span
    className="
    absolute
    bottom-0
    right-0
    w-3.5
    h-3.5
    bg-green-500
    border-2
    border-white
    rounded-full
    "
  />
            <div className="hidden md:block">
              <h3 className="font-semibold">
                Admin
              </h3>

              <p
                className="
                text-xs
                text-zinc-500
                "
              >
                Store Manager
              </p>
            </div>

            <ChevronDown
              size={18}
            />
          </div>

          {/* Dropdown */}

          {openProfile && (
            <div
              className="
              absolute
              right-0
              top-14
              w-60
              bg-white
              border
              border-zinc-100
              rounded-3xl
              shadow-xl
              overflow-hidden
              z-50
              "
            >
              <button
                onClick={() => {
                  navigate(
                    "/admin/profile"
                  );

                  setOpenProfile(
                    false
                  );
                }}
                className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                hover:bg-secondary
                transition
                "
              >
                <User
                  size={18}
                />

                My Profile
              </button>

              <button
                onClick={() => {
                  navigate(
                    "/admin/settings"
                  );

                  setOpenProfile(
                    false
                  );
                }}
                className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                hover:bg-secondary
                transition
                "
              >
                <Settings
                  size={18}
                />

                Settings
              </button>

              <button
                onClick={() => {
                  navigate(
                    "/admin/settings"
                  );

                  setOpenProfile(
                    false
                  );
                }}
                className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                hover:bg-secondary
                transition
                "
              >
                <Shield
                  size={18}
                />

                Security
              </button>

              <div className="border-t border-zinc-100" />

              <button
                onClick={
                  handleLogout
                }
                className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                text-red-500
                hover:bg-red-50
                transition
                "
              >
                <LogOut
                  size={18}
                />

                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;