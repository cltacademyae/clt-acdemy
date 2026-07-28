"use client";
import CourseCard from "@/components/global/corseCard";
import TeamCard from "@/components/global/teamCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE } from "@/const/seo";
import React, { useState } from "react";
import t1 from "@/../public/team/t1.jpeg";
import t2 from "@/../public/team/t2.png";
import t4 from "@/../public/team/t4.png";
import t5 from "@/../public/team/t5.png";
import t6 from "@/../public/team/t6.png";
import t8 from "@/../public/team/t8.png";
import t10 from "@/../public/team/t10.png";
import t11 from "@/../public/team/t11.png";
import t12 from "@/../public/team/t12.png";
import t13 from "@/../public/team/t13.png";
import t14 from "@/../public/team/t14.png";
import t17 from "@/../public/team/t17.png";
import t18 from "@/../public/team/t18.jpeg";
import t20 from "@/../public/team/t20.png";
import t20_1 from "@/../public/team/t20-1.png";
import t23 from "@/../public/team/t23.png";
import t25 from "@/../public/team/t25.jpeg";
import t26 from "@/../public/team/t26.jpg";
import t29 from "@/../public/team/t29.jpg";
import t30 from "@/../public/team/t30.jpeg";
import t31 from "@/../public/team/t31.webp";
import t32 from "@/../public/team/t32.png";
import t33 from "@/../public/team/t33.png";
import t34 from "@/../public/team/t34.png";
import t35 from "@/../public/team/t35.png";
import t36 from "@/../public/team/t36.png";
import t37 from "@/../public/team/t37.png";
import t38 from "@/../public/team/t38.png";
import t40 from "@/../public/team/t40.jpeg";
import tc1 from "@/../public/team/tc1.png";
import tc2 from "@/../public/team/tc2.png";
import t41 from "@/../public/team/t41.jpeg";
import t42 from "@/../public/team/t42.jpeg";
import t43 from "@/../public/team/t43.jpeg";
import t44 from "@/../public/team/t44.jpeg";
import t45 from "@/../public/team/t45.jpeg";
import t46 from "@/../public/team/t46.jpeg";
import t47 from "@/../public/team/t47.jpeg";
import t48 from "@/../public/team/t48.jpeg";
import t49 from "@/../public/team/t49.jpeg";
import t54 from "@/../public/team/t54.jpeg";
import t51 from "@/../public/team/t51.jpeg";
import t52 from "@/../public/team/t52.jpeg";
import t53 from "@/../public/team/t53.jpeg";
import t3 from "@/../public/team/t3.png";

import t9 from "@/../public/team/t9.jpeg";

import t19 from "@/../public/team/t19.png";


import t24 from "@/../public/team/t24.jpeg";
import t50 from "@/../public/team/t50.jpeg";
import t56 from "@/../public/team/t56.png";
import t57 from "@/../public/team/t57.png";
import t58 from "@/../public/team/t58.jpeg";

import simsarul_haq from "@/../public/team/Simsarul-Haq.jpeg";
import adhil from "@/../public/team/Adhil.jpeg";
import amal from "@/../public/team/Amal.jpeg";
import kiran from "@/../public/team/Kiran-V-R.jpeg";


const TeamListing = () => {
  const teamData = [
    // {
    //   id: 1,
    //   name: "Fasir Khalid",
    //   type: "Advisors",
    //   role: "Director of Sales Performance",
    //   bio: "Director of Sales Performance",
    //   imageUrl: t1,
    // },

     {
      id: 18,
      name: "Edwin ",
      type: "Mentors",
      role: "Master Of Academics",
      bio: "Master Of Academics",
      imageUrl: t18,
    },
    // {
    //   id: 22,
    //   name: "Fathimath Thanseera",
    //   type: "Operations",
    //   role: "HR Manager",
    //   bio: "HR Manager",
    //   imageUrl: t30,
    // },
   
   

    {
      id: 2,
      name: "Mohammed Sanjeed",
      type: "Advisors",
      role: "Head of Sales",
      bio: "Head of Sales",
      imageUrl: t2,
    },
      {
      id: 26,
      name: "Nubin Nuhais",
      type: "Information Technology",
      role: "Information Technology Manager",
      bio: "Information Technology Manager",
      imageUrl: t26,
    },
     {
      id: 25,
      name: "Falja Nizar",
      type: "Customer Service",
      role: "Head Of Customer Service",
      bio: "Head Of Customer Service",
      imageUrl: t25,
    },
    {
      id: 30,
      name: "Nandana Jayakrishnan",
      type: "Operations",
      role: "HR Manager",
      bio: "HR Manager",
      imageUrl: t31,
    },
        {
      id: 4,
      name: "Ajmal Ummer",
      type: "Advisors",
      role: "Sales Team Leader",
      bio: "Sales Team Leader",
      imageUrl: t4,
    },
     {
      id: 13,
      name: "Aleesha",
      type: "Advisors",
      role: "Sales Team Leader",
      bio: "Sales Team Leader",
      imageUrl: t13,
    },
        {
      id: 17,
      name: "Muneera",
      type: "Advisors",
      role: "Sales Team Leader",
      bio: "Sales Team Leader",
      imageUrl: t17,
    },
    {
      id: 23,
      name: "Mohamadaffan Memon",
      type: "Advisors",
      role: "Sales Team Leader",
      bio: "Sales Team Leader",
      imageUrl: t23,
    },
    {
      id: 6,
      name: "Alwin Bose",
      type: "Advisors",
      role: "Sales Team Leader",
      bio: "Sales Team Leader",
      imageUrl: t6,
    },
    {
      id: 5,
      name: "Farsana Sirajudheen",
      type: "Advisors",
      role: "Business Development Manager",
      bio: "Business Development Manager",
      imageUrl: t5,
    },
    {
      id: 32,
      name: "Ansa Abdul Offur",
      type: "Operations",
      role: "Assistant Manager in Marketing",
      bio: "Assistant Manager in Marketing",
      imageUrl: t32,
    },

    {
      id: 40,
      name: "Ashwin",
      type: "Mentors",
      role: "Senior mentor",
      bio: "Senior mentor",
      imageUrl: t40,
    },

    {
      id: 20,
      name: "Rahim ",
      type: "Mentors",
      role: "Trading mentor",
      bio: "Trading mentor",
      imageUrl: t50,
    },
    {
      id: 28,
      name: "Nihal ",
      type: "Mentors",
      role: "Trading mentor",
      bio: "Trading mentor",
      imageUrl: t20_1,
    },
    {
      id: 3,
      name: "Rashida Pudhuveettil",
      type: "Mentors",
      role: "Trading mentor",
      bio: "Trading mentor",
      imageUrl: t3,
    },
    {
      id: 45,
      name: "Mathson Mathew ",
      type: "Mentors",
      role: "Junior Mentor",
      bio: "Junior Mentor",
      imageUrl: t45,
    },
    {
      id: 59,
      name: "Kiran V R",
      type: "Mentors",
      role: "Junior Mentor",
      bio: "Junior Mentor",
      imageUrl: kiran,
    },
    {
      id: 60,
      name: "Amal",
      type: "Mentors",
      role: "Junior Mentor",
      bio: "Junior Mentor",
      imageUrl: amal,
    },
    {
      id: 61,
      name: "Adhil",
      type: "Mentors",
      role: "Junior Mentor",
      bio: "Junior Mentor",
      imageUrl: adhil,
    },

    {
      id: 14,
      name: "Bindhyasree",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t14,
    },
    {
      id: 24,
      name: "Della Mariyam",
      type: "Customer Service",
      role: "Customer Relationship Manager",
      bio: "Customer Relationship Manager",
      imageUrl: t24,
    },

    {
      id: 29,
      name: "Ifa Fathima",
      type: "Information Technology",
      role: "Data Engineer ",
      bio: "Data Engineer",
      imageUrl: t29,
    },
{
      id: 30,
      name: "Ashwin D A",
      type: "Information Technology",
      role: "Flutter Developer",
      bio: "Flutter Developer",
      imageUrl: t57,
    },
    {
      id: 31,
      name: "Shabas Rahman",
      type: "Information Technology",
      role: "Full Stack Developer",
      bio: "Full Stack Developer",
      imageUrl: t58,
    },
    {
      id: 8,
      name: "Neha",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t8,
    },
    {
      id: 46,
      name: "Vismaya",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t46,
    },
    {
      id: 47,
      name: "Angel",
      type: "Customer Service",
      role: "Department of Customer Service",
      bio: "Department of Customer Service",
      imageUrl: t47,
    },
    {
      id: 48,
      name: "Rukhiya ",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t48,
    },
    {
      id: 49,
      name: "Febina ",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t49,
    },
    {
      id: 9,
      name: "Nidha Noushal",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t9,
    },
    // {
    //   id: 10,
    //   name: "Arun Sivan",
    //   type: "Advisors",
    //   role: " Bussiness Devolopment Manager",
    //   bio: " Bussiness Devolopment Manager",
    //   imageUrl: t10,
    // },
    // {
    //   id: 11,
    //   name: "Maneesha",
    //   type: "Advisors",
    //   role: " Bussiness Devolopment Manager",
    //   bio: " Bussiness Devolopment Manager",
    //   imageUrl: t11,
    // },
    {
      id: 12,
      name: "Karthika",
      type: "Customer Service",
      role: "Department of Customer Service",
      bio: "Department of Customer Service",
      imageUrl: t12,
    },
    {
      id: 41,
      name: "Fathima Shireen",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t41,
    },
    {
      id: 42,
      name: "Nasida",
      type: "Customer Service",
      role: "Department of Customer Service",
      bio: "Department of Customer Service",
      imageUrl: t42,
    },
    {
      id: 43,
      name: "Rashidha Swalih",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t43,
    },
    {
      id: 44,
      name: "Aswini",
      type: "Advisors",
      role: "Academic Counsellor",  
      bio: "Academic Counsellor",
      imageUrl: t44,
    },
        {
      id: 54,
      name: "Sabsheera",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t54,
    },
    {
      id: 51,
      name: "Fathima Sana",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t51,
    },
    {
      id: 52,
      name: "Fathima V N",
      type: "Advisors",
      role: "Academic Counsellor",
      bio: "Academic Counsellor",
      imageUrl: t52,
    },
    {
      id: 62,
      name: "Simsarul Haq",
      type: "Operations",
      role: "Social Media Coordinator",
      bio: "Social Media Coordinator",
      imageUrl: simsarul_haq,
    },
    {
      id: 33,
      name: "VIVEK P",
      type: "Operations",
      role: "Social Media Coordinator",
      bio: "Social Media Coordinator",
      imageUrl: t33,
    },
    {
      id: 34,
      name: "Mrudhul K",
      type: "Operations",
      role: "Graphic Designer",
      bio: "Graphic Designer",
      imageUrl: t34,
    },
    {
      id: 35,
      name: "Vaishnav C",
      type: "Operations",
      role: "Content Writer",
      bio: "Content Writer",
      imageUrl: t35,
    },
    {
      id: 37,
      name: "sayyid mursal",
      type: "Operations",
      role: "videographer",
      bio: "videographer",
      imageUrl: t37,
    },
    // {
    //   id: 38,
    //   name: "Ardra B",
    //   type: "Operations",
    //   role: "Content writer",
    //   bio: "Content writer",
    //   imageUrl: t38,
    // },
  ]; 
  const mansgementData = [
    {
      id: 100,
      name: "MOHAMMED AQIB LAPIA",
      type: "Management",
      role: "Chief Executive Officer",
      bio: "Chief Executive Officer",
      imageUrl: tc1,
    },
    {
      id: 101,
      name: "MOHAMMED FAIZEEN",
      type: "Management",
      role: "Chief Operating Officer",
      bio: "Chief Operating Officer",
      imageUrl: tc2,
    },
  ];
  const tabs = [
    "All",
    "Management",
    "Mentors",
    "Customer Service",
    "Advisors",
     "Information Technology",
    "Operations"
    ];
  const [currentTab, setCurrentTab] = useState("All");

  // Person structured data (JSON-LD) for every team member / mentor shown
  // below. Invisible to users — powers Google's people/knowledge results.
  const peopleSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/team/#members`,
    itemListElement: [...mansgementData, ...teamData].map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name.trim(),
        jobTitle: member.role,
        image: `${SITE.url}${(member.imageUrl as { src: string }).src}`,
        worksFor: {
          "@type": "EducationalOrganization",
          "@id": `${SITE.url}/#organization`,
          name: SITE.name,
          url: SITE.url,
        },
      },
    })),
  };

  return (
    <div className="w-screen px-1 md:px-10 md:py-10 py-4 flex flex-col gap-4 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(peopleSchema) }}
      />
      <div className="flex w-full justify-between">
        <div className="flex flex-col mb-5 w-full  gap-2  items-center">
          <div className="px-5 md:mb-4 rounded-full w-fit font-semibold border border-primary text-primary text-center py-2">
            <p className="md:text-sm text-xs uppercase text-nowrap">Our Team</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-black/90 capitalize text-center wow fadeInUp">
            Meet Our {currentTab} Team Members
          </h2>

          <p
            className="wow fadeInUp text-center md:w-[40%] w-full"
            data-wow-delay="0.2s"
          >
            Our team is a group of experts who are dedicated to helping you
            learn trading and investing.
          </p>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="flex flex-wrap">
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={tab}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="grid mb-10 justify-center justify-self-center items-center w-full grid-cols-2 md:px-2 px-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2">
        {[...mansgementData, ...teamData]
          .filter((team) =>
            currentTab === "All" ? true : team.type === currentTab
          )
          .map((team, index) => (
            <React.Fragment key={index}>
              {team.type == "Management" ? (
                <div
                  className={`lg:col-span-2 flex items-center ${
                    index % 2 == 0 ? "justify-end" : "justify-start"
                  } col-span-1`}
                >
                  <TeamCard member={team} />
                </div>
              ) : (
                <TeamCard member={team} />
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default TeamListing;
