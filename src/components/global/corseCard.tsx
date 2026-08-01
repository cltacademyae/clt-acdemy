"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Calendar, BookOpen, Globe } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";
import { COURSE_SLUGS } from "@/lib/catalog";

interface CourseCardProps {
  course: {
    name: string;
    description: string;
    image: string;
    link: string;
    id: number;
  };
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  // Slug, not the legacy id — no internal link should point at a redirect.
  const href = `/courses/${COURSE_SLUGS[String(course.id)] ?? course.id}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="h-full md:gap-2 gap-2 pb-6 pt-[4px] px-[4px]  overflow-hidden group hover:shadow-xl transition-all duration-300 border-input  border bg-gray-100 backdrop-blur-sm">
        <div className="relative  overflow-hidden">
          <motion.img
            src={`${course.image}`}
            alt={course.name}
            className="w-full md:h-58 h-44 object-cover rounded-lg transition-transform duration-500 "
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 rounded-lg to-transparent" />
         
        </div>

        <CardHeader className="pb-0 md:px-6 px-2">
          <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {course.name}
          </CardTitle>
        </CardHeader>

        <CardContent className=" pt-0 md:px-6 px-2">
          <CardDescription className="text-sm -translate-y-3 line-clamp-3 leading-relaxed">
            {course.description}
          </CardDescription>
        
          <motion.div whileHover={{ scale: 1.02 }} >
            <Button
              asChild
              className="w-full mt-4 bg-primary hover:bg-primary/90 transition-all font-semibold md:text-md duration-200"
            >
              <Link href={href}>
                <BookOpen className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
