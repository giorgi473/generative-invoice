"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import imagebase64 from "@/lib/imagebase64";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TSignatureData = {
  name: string;
  image: string;
};

function SettingsPage() {
  const [logo, setLogo] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signatureData, setSignatureData] = useState<TSignatureData>({
    name: "",
    image: "",
  });

  const onChangeSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignatureData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignatureImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length < 0) return;

    const file = files[0];
    const image = await imagebase64(file);

    setSignatureData((prev) => {
      return {
        ...prev,
        image: image,
      };
    });
  };

  const handleOnChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length < 0) return;

    const file = files[0];
    const image = await imagebase64(file);

    setLogo(image);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/settings`);
      const responseData = await response.json();

      if (response.status === 200) {
        setLogo(responseData?.data?.invoiceLogo);
        setSignatureData(
          responseData?.data?.signature || { name: "", image: "" }
        );
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: any
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`/api/settings`, {
        method: "post",
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        toast.success("Setting updating succesfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div>
        <h1 className="font-semibold text-xl">Settings</h1>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="Invoice-Logo">
          <AccordionTrigger className="font-semibold text-base cursor-pointer">
            Invoice Logo
          </AccordionTrigger>
          <AccordionContent>
            <form
              className="w-full grid gap-2"
              onSubmit={(e) => handleSubmit(e, { logo })}
            >
              <Input
                type="file"
                className="max-w-sm w-full"
                onChange={handleOnChangeLogo}
              />
              <div className="w-full max-w-xs">
                {logo ? (
                  <Image
                    src={logo}
                    alt="invoice logo"
                    className="aspect-video h-20 border-2 border-dotted max-h-20 object-scale-down"
                    width={250}
                    height={96}
                  />
                ) : (
                  <div className="aspect-video h-20 border-2 border-dotted flex items-center justify-center rounded-lg">
                    <p className="text-center text-muted-foreground">No Data</p>
                  </div>
                )}
              </div>
              <Button className="w-fit">Save</Button>
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Signature-invoice">
          <AccordionTrigger className="font-semibold text-base cursor-pointer">
            Invoice Signature
          </AccordionTrigger>
          <AccordionContent>
            <form
              className="w-full grid gap-2"
              onSubmit={(e) => handleSubmit(e, { signature: signatureData })}
            >
              <Input
                type="text"
                placeholder="Enter your signature name"
                value={signatureData.name}
                onChange={onChangeSignature}
                name="name"
              />
              <Input
                type="file"
                className="max-w-sm w-full"
                onChange={handleSignatureImage}
              />
              <div className="w-full max-w-xs">
                {signatureData.image ? (
                  <Image
                    src={signatureData.image}
                    alt="signature sign"
                    className="aspect-video h-20 border-2 border-dotted max-h-20 object-scale-down"
                    width={250}
                    height={96}
                  />
                ) : (
                  <div className="aspect-video h-20 border-2 border-dotted flex items-center justify-center rounded-lg">
                    <p className="text-center text-muted-foreground">No Data</p>
                  </div>
                )}
              </div>
              <Button className="w-fit">Save</Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SettingsPage;
