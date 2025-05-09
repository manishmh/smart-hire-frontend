'use client'

import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const CompanyDashboard = () => {
  const user = useCurrentUser();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Company Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl">User Info</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <Link href="/company/settings">
        <button className="px-4 py-1 bg-green-700 text-white">Go to Settings</button>
      </Link>
    </div>
  );
};

export default CompanyDashboard;
