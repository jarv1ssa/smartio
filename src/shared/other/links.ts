import { HiHome } from "react-icons/hi";
import { MdSettings } from "react-icons/md";

export const publicLinks = [
  { key: "home", title: "Home", to: "/" },
  { key: "about", title: "About", to: "/about" },
];

export const privateLinks = [
  { key: "dashboard", title: "Dashboard", to: "/dashboard", icon: HiHome },
  {
    key: "settings",
    title: "Settings",
    to: "/settings",
    icon: MdSettings,
  },
];
