import NewFormModal from "@/components/dashboard/new-form-modal";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { ReactNode } from "react";

const CompanyDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex text-sm h-screen overflow-hidden relative">
      <NewFormModal />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="mt-11 overflow-y-auto flex-1 px-4 py-2 ml-[230px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardLayout;
