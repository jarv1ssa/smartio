import { HiHome } from "react-icons/hi";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";

export const publicLinks = [
  { key: "home", title: "Home", to: "/" },
  { key: "about", title: "About", to: "/about" },
];

export const privateLinks = [
  { key: "dashboard", title: "Dashboard", to: "/dashboard", icon: HiHome },
  {
    key: "notifications",
    title: "Notifications",
    to: "/notifications",
    icon: IoMdNotifications,
  },
  {
    key: "settings",
    title: "Settings",
    to: "/settings",
    icon: IoMdSettings,
  },
];
