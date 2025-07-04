import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/lib/auth";
import getAvatarName from "@/lib/getAvatarName";
import { ChevronDown } from "lucide-react";
import UserProfile from "./UserProfile";

interface IUserProfileDropdown {
  isFullName: boolean;
  isArrowUp: boolean;
}

async function UserProfileDropdown({
  isFullName,
  isArrowUp,
}: IUserProfileDropdown) {
  const seasson = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="border size-9 bg-neutral-300 cursor-pointer">
            <AvatarImage src={seasson?.user.image as string} alt="@shadcn" />
            <AvatarFallback>
              {getAvatarName(
                seasson?.user.firstName.toUpperCase() as string,
                seasson?.user.lastName.toUpperCase() as string
              )}
            </AvatarFallback>
          </Avatar>
          {isFullName && (
            <div>
              <p className="text-ellipsis line-clamp-1 font-medium">
                <span>{seasson?.user.firstName}</span>{" "}
                <span>{seasson?.user.lastName}</span>
              </p>
            </div>
          )}
          {isArrowUp && (
            <ChevronDown className="transition-all ml-auto" size={16} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[250px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserProfile />
        <DropdownMenuItem
          onClick={async () => {
            "use server";
            await signOut();
          }}
          className="bg-red-50 text-red-500 hover:bg-red-100 font-medium cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileDropdown;
