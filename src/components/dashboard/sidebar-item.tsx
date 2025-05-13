import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const SidebarItem = ({
    logo,
    title,
    num,
    link,
  }: {
    logo: ReactNode;
    title: string;
    num?: number;
    link?: string;
  }) => {
  
    return (
      <div> 
      </div>
    );
  };
  
  export default SidebarItem;
