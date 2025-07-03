import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

function DashboardPage() {
  return (
    <div>
      <Button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        LogOut
      </Button>
    </div>
  );
}

export default DashboardPage;
