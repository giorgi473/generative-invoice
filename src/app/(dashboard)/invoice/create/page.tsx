import { ArrowLeft } from "lucide-react";
import CreateEditInvoice from "../../_components/CreateEditInvoice";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";

async function InvoiceCreatePage() {
  const seasson = await auth();
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Link href={"/invoice"} className={buttonVariants({ size: "icon" })}>
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-semibold">Create Invoice</h1>
      </div>
      <CreateEditInvoice
        firstName={seasson?.user.firstName}
        lastName={seasson?.user.lastName}
        email={seasson?.user.email}
        currency={seasson?.user.currency}
      />
    </div>
  );
}

export default InvoiceCreatePage;
