"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return <Button>{pending ? "Please wait..." : title}</Button>;
}

export default SubmitButton;
