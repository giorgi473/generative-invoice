import { UnprotectedPage } from "@/components/CheckAuth";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center items-center flex-col min-h-dvh h-dvh overflow-auto relative p-4">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <div className="z-10 relative">{children}</div>
      <UnprotectedPage />
    </main>
  );
}

export default AuthLayout;
