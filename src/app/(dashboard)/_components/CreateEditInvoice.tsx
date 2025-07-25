"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InvoiceSchemaZod } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface IcreateEditInvoiceProps {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
  currency: string | undefined;
}

function CreateEditInvoice({
  firstName,
  lastName,
  email,
  currency,
}: IcreateEditInvoiceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof InvoiceSchemaZod>>({
    resolver: zodResolver(InvoiceSchemaZod),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof InvoiceSchemaZod>) => {
    console.log(data);
  };
  return (
    <form className="grid py-4">
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex items-center justify-center bg-neutral-100 rounded-l-md">
              #
            </div>
            <Input
              type="text"
              id="invoice-no"
              className=" rounded-l-none"
              {...register("invoice_no", { required: true })}
              placeholder="Invoice No."
            />
          </div>
          {errors?.invoice_no && (
            <p className="text-xl text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>

        <div />
        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex items-center justify-center bg-neutral-100 rounded-l-md">
              <CalendarIcon className="size-4" />
            </div>
            <Popover>
              <PopoverTrigger asChild className="w-full">
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    " pl-3 text-left font-normal",
                    !watch("invoice_date") && "text-muted-foreground",
                    "justify-start font-normal rounded-l-none flex-1"
                  )}
                >
                  {watch("invoice_date") ? (
                    format(watch("invoice_date"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  // selected={field.value}
                  // onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors?.invoice_no && (
            <p className="text-xl text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}

export default CreateEditInvoice;
