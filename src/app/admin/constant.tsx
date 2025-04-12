import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconUsers,
  IconUserPlus,
  IconCamera,
  IconFileText,
  IconUserCheck,
  IconSettings,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Registered Residents",
    path: "/admin/residents",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Add New Resident",
    path: "/admin/register",
    icon: <IconUserPlus width="24" height="24" />,
  },
  {
    title: "Entry Logs",
    path: "/admin/logs",
    icon: <IconFileText width="24" height="24" />,
  },
  {
    title: "Unrecognized Visitors",
    path: "/admin/unrecognized",
    icon: <IconUserCheck width="24" height="24" />,
  },
];
