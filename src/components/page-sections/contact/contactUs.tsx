"use client";
import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from "react-icons/fa";
import { phoneNumber } from "@/const/data";
import { SITE } from "@/const/seo";
import { trackEvent } from "@/lib/analytics";
const contactInfo = [
  {
    type: "Contact",
    icon: <FaPhoneAlt className="w-6 h-6 text-white" />,
    content: (
      <a
        href={`tel:${phoneNumber}`}
        onClick={() => trackEvent("phone_click", { link_position: "contact" })}
      >
        {phoneNumber}
      </a>
    ),
  },
  {
    type: "Email",
    icon: <FaEnvelope className="w-6 h-6 text-white" />,
    content: (
      <a
        href="mailto:info@clt-academy.com"
        onClick={() => trackEvent("email_click", { link_position: "contact" })}
      >
        info@clt-academy.com
      </a>
    ),
  },
  {
    type: "Address",
    icon: <FaMapMarkerAlt className="w-6 h-6 text-white" />,
    content:
      "CLT Academy | Head Office M09, Al Shaibani Building, Hor Al Anz East, Dubai, United Arab Emirates.",
  },
  {
    // Visible text, not only schema — LocalBusiness hours have to be
    // verifiable against the page they are claimed on.
    type: "Opening Hours",
    icon: <FaRegClock className="w-6 h-6 text-white" />,
    content: `${SITE.openingHours.days[0]} to ${
      SITE.openingHours.days[SITE.openingHours.days.length - 1]
    }, ${SITE.openingHours.opens} to ${SITE.openingHours.closes} (GST)`,
  },
];

const ContactUs: React.FC = () => {
  return (
    <div className="py-5 md:px-20 px-2">
      <div className="container mx-auto md:px-4 px-1">
        <div className="bg-primary rounded-2xl md:p-10 p-2 flex flex-wrap gap-10">
          <div className="bg-white rounded-2xl md:p-10 p-3 w-full">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <h2 className="text-3xl font-bold mb-4">
              Have Questions? We’re Ready to Help
            </h2>

            <p className="text-gray-700 mb-8">
              We are a team of traders and investors who are dedicated to
              helping you learn trading and investing.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b border-gray-300 pb-6 last:border-none"
                >
                  <div className="w-14 h-14 rounded-full bg-primary flex shrink-0 items-center justify-center mr-5">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{item.type}</p>
                    <h3 className="text-lg font-semibold">{item.content}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
