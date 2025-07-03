import SubmitButton from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "@/lib/auth";

async function LoginPage() {
  const seasson = await auth();
  console.log(seasson);

  return (
    <Card className="w-full max-w-sm min-w-xs lg:min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl w-full">Login</CardTitle>
        <CardDescription>
          Enter your email below to login in your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-6"
          action={async (formdata) => {
            "use server";

            await signIn("resend", formdata);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="hello@example.com"
              required
              type="email"
            />
          </div>
          <SubmitButton title="Login" />
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
