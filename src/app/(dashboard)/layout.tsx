import { ProtectedPage } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import UserProfileDropdown from "./_components/UserProfileDropdown";
import DashboardHeader from "./_components/DashboardHeader";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar>
        <UserProfileDropdown isFullName isArrowUp />
      </DashboardSidebar>
      <main className="w-full relative">
        <DashboardHeader />
        <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        <ProtectedPage />
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
