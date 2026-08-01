"use client";
import Image from "next/image";
import logo from "@/../public/logo.png";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { TiThMenu } from "react-icons/ti";
import { RiMenu2Line } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { phoneNumber } from "@/const/data";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { whatsappLink } from "../global/whatsapp";
import { COMMERCIAL_PAGES } from "@/const/commercial";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About CLT",
    href: "/about",
  },
  {
    name: "Our Courses",
    href: "/courses",
  },
  // Appear once marketing signs off the copy; noindex pages stay unlinked.
  ...COMMERCIAL_PAGES.filter((p) => p.indexable).map((p) => ({
    name: p.h1,
    href: `/${p.slug}`,
  })),
  {
    name: "Our team",
    href: "/team",
  },
  {
    name: "Contact Us",
    // hidden: true,
    href: `/contact`,
  },
  {
    name: "Add Ons",
    // hidden: true,
    href: "/addons",
  },
];
const mobileNavItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About CLT",
    href: "/about",
  },
  {
    name: "Our Courses",
    href: "/courses",
  },
  {
    name: "Our team",
    href: "/team",
  },
  {
    name: "Contact Us",
    // hidden: true,
    href: `/contact`,
  },
  {
    name: "Add Ons",
    // hidden: true,
    href: "/addons",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Login",
    href: "/login",
  },
];

const navButtons = [
  {
    name: "SHOP NOW",
    href: whatsappLink,
    className: "hover:border-primary",
  },
  {
    name: "BOOK YOUR CLASSES",
    href: "https://course.clt-academy.com/",
    className: "hover:border-primary",
  },
  {
    name: "LOGIN",
    href: "https://course.clt-academy.com/",
    className: "bg-primary text-white border-primary",
  },
];

const Nav = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed flex flex-row ${
        !isScrolled
          ? "border-[#ffffff1f]  border-b"
          : "backdrop-blur-sm border-transparent bg-black/90 rounded-b-3xl"
      } transition-all duration-300  items-center   w-full  md:px-4 top-0 z-50`}
    >
      <div className="first_part py-5  md:border-r border-white/20 md:px-8 px-3 flex items-center md:justify-start justify-between md:w-auto w-full md:gap-6 gap-2">
        <div className="logo">
          <div
            onClick={() => router.push("/")}
            className="fit-image  md:w-20  w-13"
          >
            <Image src={logo} alt="logo" width={100} height={100} />
          </div>
        </div>
        <div className="md:flex hidden ml-4 items-center  gap-8 ">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              <p
                className={`uppercase  text-nowrap font-semibold text-sm ${
                  item.href === pathname ? "text-primary" : "text-white"
                }`}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="md:flex hidden items-center ml-8 gap-4">
          {navButtons.map((button) => (
            <Button
              key={button.name}
              onClick={() => router.push(button.href)}
              variant="outline"
              className={button.className + "  ease-in duration-200"}
            >
              {button.name}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={() => window.open(navButtons[0].href, "_blank")}
            className="py-1 px-2 rounded-sm cursor-pointer text-xs font-semibold md:hidden flex items-center justify-center bg-white text-black"
          >
            <p>shop now</p>
          </div>
          <div
            onClick={() => window.open(navButtons[1].href, "_blank")}
            className="py-1 px-2 rounded-sm cursor-pointer text-xs font-semibold md:hidden flex items-center justify-center bg-white text-black"
          >
            <p>book classes</p>
          </div>
        </div>
        <div className="md:hidden   flex items-center gap-2">
          <Sheet>
            <SheetTrigger>
              <RiMenu2Line className="text-white cursor-pointer hover:text-primary md:text-4xl text-2xl " />
            </SheetTrigger>
            <SheetContent className="bg-black  text-white border-transparent">
              <SheetHeader className="border-b border-white/20 broder-dashed">
                <div className="logo">
                  <div className="fit-image  md:w-20  w-13">
                    <Image src={logo} alt="logo" width={100} height={100} />
                  </div>
                </div>
              </SheetHeader>
              <div className="flex px-4 flex-col gap-4">
                {mobileNavItems.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <p className="text-white py-3 border-b border-white/20 broder-dashed  ">
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div
        onClick={() =>
          window.open(`tel:${phoneNumber.replace("+", "")}`, "_blank")
        }
        className=" px-3 group cursor-pointer h-full flex-1  md:flex hidden items-center justify-end gap-4"
      >
        <div className="p-4 rounded-full relative bg-white/10 group-hover:bg-primary ease-in duration-200 flex items-center justify-center">
          <FaPhoneAlt className="text-white text-2xl" />
          <div className="absolute rounded-full p-4 bg-primary/50 w-full h-full animate-ping duration-[2000]"></div>
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold text-sm text-white uppercase">
            Hotline Number
          </p>
          <p className="text-xl  font-semibold  text-white">{phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
