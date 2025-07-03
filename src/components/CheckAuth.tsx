import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function ProtectedPage() {
  const seasson = await auth();
  if (!seasson) {
    redirect("/login");
  }
  return <></>;
}

export async function UnprotectedPage() {
  const session = await auth();

  if (session) {
    if (
      !session.user.firstName ||
      !session.user.lastName ||
      !session.user.currency
    ) {
      redirect("/onboarding");
    } else {
    }
    redirect("/dashboard");
  }

  return <></>;
}
