"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Twitter, Linkedin, Github } from "lucide-react";

type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: any;
  lightBg?: boolean;
  twitter?: string;
  linkedin?: string;
  github?: string;
};

const cardVariants = {
  idle: { y: 0, scale: 1 },
  hover: { y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const overlayVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      animate="idle"
      variants={cardVariants as any}
      className={`w-full max-w-sm ${member.role === "Management" ? "col-span-2" : ""}`}
    >
     <div className={`${member.imageUrl ? "bg-red-900" : "bg-gray-100"} md:h-[25rem] h-[15rem] flex items-end justify-center rounded-2xl relative overflow-hidden`}>
        {member.imageUrl && (
          <div className="absolute top-0 left-0 w-full h-full">
            <Image src={member.imageUrl} placeholder="blur" alt={member.name} fill className="object-cover" />
          </div>
        )}
        <div className={`${member.lightBg ? "bg-black/60" : "bg-white/5"} backdrop-blur-3xl relative z-10 w-[90%] py-4 mb-2 px-4 rounded-2xl`}>
            <h3 className={`md:text-xl text-sm font-bold ${member.imageUrl ? "text-white" : "text-black/90"}`}>{member.name}</h3>
            <p className={`md:text-sm text-xs ${member.imageUrl ? "text-white/60" : "text-black/60"}`}>{member.role}</p>
        </div>
     </div>
    </motion.div>
  );
}


