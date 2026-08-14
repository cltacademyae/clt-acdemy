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
        <div className=" max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 py-16 px-6 md:px-16">
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

            <ul className="space-y-3 flex flex-col gap-2 text-gray-300">
              <Link href="/" className="hover:text-white cursor-pointer">
                Home
              </Link>
              <Link href="/about" className="hover:text-white cursor-pointer">
                About
              </Link>

              <Link href="/courses" className="hover:text-white cursor-pointer">
                Our Courses
              </Link>
              <Link href="/team" className="hover:text-white cursor-pointer">
                Our Team
              </Link>
              <Link
                href={`/contact`}
                className="hover:text-white cursor-pointer"
              >
                Contact Us
              </Link>
              <Link
                href={`/gallery`}
                className="hover:text-white cursor-pointer"
              >
                Gallery
              </Link>
              <Link href={`/blogs`} className="hover:text-white cursor-pointer">
                Blogs
              </Link>
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

          {/* Gallery */}
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
