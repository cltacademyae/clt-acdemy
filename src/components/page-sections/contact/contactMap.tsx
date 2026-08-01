"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { phoneNumber } from "@/const/data";
import { trackEvent } from "@/lib/analytics";

const ContactFormMap: React.FC = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const url =
    "https://script.google.com/macros/s/AKfycbw-uyPiyPDttDCasddkRP4-tTD2vqTQivU6MLnUU80g-r6Tsx3P8sVWiX6Zzrgj1zp2/exec";

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const phoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.startsWith("91")) input = input.substring(2);
    if (input.length > 10) input = input.substring(0, 10);

    let formatted = "+91";
    if (input.length > 0) formatted += "-" + input.substring(0, 5);
    if (input.length > 5) formatted += "-" + input.substring(5);

    setFormData({ ...formData, phone: formatted });
    setIsValidPhone(input.length === 10);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          Name: formData.fname,
          Email: formData.email,
          PhoneNumber: " " + formData.phone + "_",
          Message: formData.message,
        }),
      });

      trackEvent("form_submit", { link_position: "contact" });
      toast.success("Message sent successfully");
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        message: "",
      });

      router.push(
        `https://wa.me/${phoneNumber.replace("+", "").replace(" ", "")}?text=${formData.fname} ${formData.lname} \n ${formData.email} \n${formData.phone} \n${formData.message}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Message send failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:px-20  md:py-24">
      <div className="container mx-auto  md:px-4 px-2">
        <div className="flex flex-wrap rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full md:w-1/2 bg-primary md:p-10 p-5">
            <h2 className="text-3xl md:text-start text-center font-semibold text-white mb-2">
              Get in touch with us
            </h2>
            <p className="text-white opacity-80 mb-6 text-center md:text-start">
              We're here to answer your questions & explore new possibilities
              together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 bg-white backdrop-blur-md text-black"
                  required
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 bg-white backdrop-blur-md text-black"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 bg-white backdrop-blur-md text-black"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={phoneNumberChange}
                className="w-full rounded-xl px-4 py-3 bg-white backdrop-blur-md text-black"
                required
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 bg-white backdrop-blur-md text-black"
              ></textarea>

              <button
                type="submit"
                disabled={isLoading || !isValidPhone}
                className={`w-full py-3  active:scale-[.98] rounded-xl text-black font-semibold transition-all ${
                  isLoading || !isValidPhone
                    ? "bg-white opacity-80 cursor-not-allowed"
                    : "bg-accent hover:bg-accent/90 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span className="text-black">submitting...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 md:h-[36rem] h-[20rem]">
            <iframe
              title="CLT Academy location, Hor Al Anz East, Dubai"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.7205914479314!2d55.35109507523786!3d25.279982977657774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x853cb6b56b479e9b%3A0xac07e0b704f49f84!2sCLT%20trading%20academy!5e0!3m2!1sen!2sin!4v1763796652593!5m2!1sen!2sin"
              loading="lazy"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormMap;
