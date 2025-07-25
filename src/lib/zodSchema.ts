import z from "zod";

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name is required" })
    .max(50, { message: "First name max 50 character" }),
  lastName: z
    .string()
    .min(3, { message: "Last name is required" })
    .max(50, { message: "Last name max 50 character" }),
  currency: z.string({ message: "Select Currency" }).optional(),
});

export const InvoiceSchemaZod = z.object({
  invoice_no: z.string({ message: "Invoice no. rqquired" }),
  invoice_date: z.date({ message: "Invoice date is required" }),
  due_date: z.date({ message: "Invoice due date " }),
  currency: z.string({ message: "Currency is required" }),
  from: z.object({
    name: z
      .string()
      .min(3, { message: "Name is required" })
      .max(100, { message: "Name is max 100 character" }),
    email: z.string().email({ message: "Email is required" }),
    address1: z.string({ message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
  }),
  to: z.object({
    name: z
      .string()
      .min(3, { message: "Name is required" })
      .max(100, { message: "Name is max 100 character" }),
    email: z.string().email({ message: "Email is required" }),
    address1: z.string({ message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
  }),
  items: z.array(
    z.object({
      item_name: z
        .string()
        .min(3, { message: "Item name is required" })
        .max(100, { message: "Max character will be 100" }),
      quantity: z.number(),
      price: z.number(),
      total: z.number(),
    })
  ),
  sub_total: z.number(),
  discount: z.number(),
  tax_percentage: z.number(),
  total: z.number(),
  notes: z.string().optional(),
  status: z.enum(["PAID", "UNPAID", "CANCEL"]),
});
