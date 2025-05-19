import { ReactNode } from "react";
import { MdDashboard } from "react-icons/md"; 
import { IoSettingsSharp } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";

export interface Items {
  title: string;
  logo: ReactNode;
  link: string;
}

export const topItems: Items[] = [
  {
    title: "Dashboard",
    logo: <MdDashboard />,
    link: "/dashboard",
  },
  {
    title: "All forms",
    logo: <SiGoogleforms />,
    link: "/dashboard/all-forms",
  },
  {
    title: "Create new form",
    logo: <SiGoogleforms />,
    link: "/dashboard/new-form",
  },
];

export const bottomItems: Items[] = [
  {
    title: "Settings",
    logo: <IoSettingsSharp />,
    link: "/dashboard/settings",
  },
];
