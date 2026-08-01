"use client";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import WhatsappButton from "@/components/global/whatsapp";
import { Suspense, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Loader from "@/components/global/prelodaer";
import { useUIStore } from "@/store/uiStore";

const IndexLayout = ({
  children,
  footerLinks,
}: {
  children: React.ReactNode;
  footerLinks?: React.ReactNode;
}) => {
  const { isLoading, setIsLoading } = useUIStore();

  const handleLoadingComplete = () => {
    // The Loader component handles the exit animation visually.
    // Once the onComplete callback fires, we can technically unmount it
    // or let it sit on top (but visually hidden).
    // For performance, better to unmount, but GSAP exit animation needs time.
    // The Loader component does the visual "curtain up" *before* calling this effectively?
    // Actually, usually we wait for animation to finish, then unmount.

    // In our Loader logic: the onComplete callback is at the very end of the timeline.
    // The timeline includes the "exit" animation (yPercent: -100).
    // So when this is called, the loader is already off-screen.
    setIsLoading(false);
  };
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <NextTopLoader
        color="#DC2626"
        shadow="0 0 10px 5px #DC2626"
        showSpinner={false}
      />
      {isLoading && <Loader onComplete={handleLoadingComplete} />}
      <Nav />
      <WhatsappButton />
      <Suspense fallback={<div></div>}>{children}</Suspense>
      <Footer footerLinks={footerLinks} />
    </>
  );
};

export default IndexLayout;
