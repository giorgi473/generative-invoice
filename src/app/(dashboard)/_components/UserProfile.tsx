import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserEditProfile from "./UserProfileEdit";
import { auth } from "@/lib/auth";

export default async function UserProfile() {
  const seasson = await auth();
  return (
    <Dialog>
      <DialogTrigger className="w-full text-left px-2 py-1 cursor-pointer hover:bg-muted-foreground/5">
        Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Edit your profile details here.</DialogDescription>
        </DialogHeader>
        <UserEditProfile
          firstName={seasson?.user.firstName}
          lastName={seasson?.user.lastName}
          email={seasson?.user.email}
          currency={seasson?.user.currency}
        />
      </DialogContent>
    </Dialog>
  );
}
