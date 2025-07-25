import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function InvoicePage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Invoice</h1>
        <Link
          href={`/invoice/create`}
          className={cn(buttonVariants(), "cursor-pointer")}
        >
          Create Invoice
        </Link>
      </div>
    </div>
  );
}

export default InvoicePage;
