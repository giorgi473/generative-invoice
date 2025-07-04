import { auth } from "@/lib/auth";
import UserProfileDropdown from "./UserProfileDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";

async function DashboardHeader() {
  const seasson = await auth();
  return (
    <header className="sticky top-0 h-14 w-full border-b bg-white backdrop-blur-3xl flex items-center px-4">
      <SidebarTrigger />
      <div>
        Welcome {" "}
        <span className="font-semibold">
          <span>{seasson?.user.firstName ?? "-"}</span>{" "}
          <span>{seasson?.user.lastName ?? "-"}</span>
        </span>
      </div>
      <div className="ml-auto w-fit">
        <UserProfileDropdown isArrowUp={false} isFullName={false} />
      </div>
    </header>
  );
}

export default DashboardHeader;
