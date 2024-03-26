import {
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineRead,
} from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiTeamLine } from "react-icons/ri";

export const menuLinks = [
  {
    name: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "About",
    href: "/about",
    icon: AiOutlineInfoCircle,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: AiOutlineRead,
  },
  {
    name: "Events",
    href: "/events",
    icon: AiOutlineCalendar,
  },
];

export const dashbaordLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: BsGraphUp,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: FiUsers,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: RiTeamLine,
  },
  {
    name: "Blog",
    href: "/dashboard/blog",
    icon: AiOutlineEdit,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: AiOutlineCalendar,
  },
];
