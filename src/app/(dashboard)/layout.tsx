import { ProtectedPage } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import UserProfileDropdown from "./_components/UserProfileDropdown";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar>
        <UserProfileDropdown />
      </DashboardSidebar>
      <main>
        {children}
        <ProtectedPage />
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
