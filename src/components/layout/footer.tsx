"use client";
import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { phoneNumber } from "@/const/data";
import RiskDisclosure from "@/components/global/riskDisclosure";
import { trackEvent } from "@/lib/analytics";

const Footer = ({ footerLinks }: { footerLinks?: React.ReactNode }) => {
  return (
    <footer className="w-full bg-[#1f1f1f] rounded-t-3xl -mt-6 relative z-10 text-white ">
      <div className="w-full flex items-center justify-center">
        {/*
          Three columns, three tracks. The grid used to declare four while only
          ever holding three, which left a dead track on the right.
        */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 py-16 px-6 md:px-16">
          {/* Left Section */}
          <div>
            <img
              src="/logo.png"
              alt="CLT Academy"
              width={470}
              height={380}
              className="w-20 mb-6"
            />

            <p className="text-lg font-semibold mb-3">
              BUILT BY TRADERS. DRIVEN BY PURPOSE.
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              At CLT Academy, we don't just teach trading — we shape the mindset
              of elite traders. We’re not just an academy. We’re a movement.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/clt-academy/"
                className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-black hover:bg-primary transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.youtube.com/@CLTAcademyDxB"
                className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-black hover:bg-primary transition"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/clt_academy.ae/?hl=en"
                className="w-10 h-10 flex items-center justify-center rounded-md bg-white text-black hover:bg-primary transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Quick Links</h3>
            <div className="w-10 h-[3px] bg-red-500 mb-4"></div>

            <ul className="flex flex-col gap-3 text-gray-300">
              {[
                { href: "/", name: "Home" },
                { href: "/about", name: "About" },
                { href: "/courses", name: "Our Courses" },
                { href: "/team", name: "Our Team" },
                { href: "/contact", name: "Contact Us" },
                { href: "/gallery", name: "Gallery" },
                { href: "/blogs", name: "Blogs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full ">
            <h3 className="text-2xl font-semibold mb-3">Contact</h3>
            <div className="w-10 h-[3px] bg-red-500 mb-4"></div>

            <div className="space-y-4 text-gray-300">
              <p className="flex items-start gap-3">
                <IoLocationSharp className="text-xl text-nowrap   mt-1" />
                CLT Academy | Head Office <br />M09, Al&nbsp;Shaibani Building,
                Hor&nbsp;Al&nbsp;Anz&nbsp;East, Dubai, United Arab Emirates.
              </p>
              <p className="flex items-center gap-3">
                <FiPhoneCall className="text-xl" />
                <a
                  href={`tel:${phoneNumber}`}
                  onClick={() =>
                    trackEvent("phone_click", { link_position: "footer" })
                  }
                  className="hover:text-white"
                >
                  +971 55 745 4939
                </a>
              </p>
              <p className="flex items-center gap-3">
                <MdEmail className="text-xl" />
                <a
                  href="mailto:info@clt-academy.com"
                  onClick={() =>
                    trackEvent("email_click", { link_position: "footer" })
                  }
                  className="hover:text-white"
                >
                  info@clt-academy.com
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
      {footerLinks}
      <RiskDisclosure />
      <div className="w-full bg-black  ">
        <div className="max-w-7xl mx-auto flex items-center md:flex-row flex-col md:gap-0 gap-1 py-2 justify-between md:px-32 md:py-6 md:h-3">
          <p className="text-xs">© 2026 CLT Academy. All rights reserved.</p>
          <p className="text-xs flex items-center gap-2">
            <Link
              href="/disclaimer"
              className="hover:text-white cursor-pointer"
            >
              Disclaimer
            </Link>
            |
            <Link
              href="/privacy-policy"
              className="hover:text-white cursor-pointer"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              href="/terms-and-conditions"
              className="hover:text-white cursor-pointer"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
