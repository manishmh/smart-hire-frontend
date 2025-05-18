import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { ReactNode } from "react";

const CompanyDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex text-sm overflow-hidden ">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        {children}
      </div>
    </div>
  );
};

export default CompanyDashboardLayout;
