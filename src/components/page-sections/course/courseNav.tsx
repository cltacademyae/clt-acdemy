"use client";
import { Button } from "@/components/ui/button";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/** Real anchors, not router.push — every course must be reachable without JS. */
const CourseNav = ({
  previous,
  next,
  courseName,
}: {
  previous: string | null;
  next: string | null;
  courseName: string;
}) => {
  const whatsapp = useWhatsapp("course_page");
  return (
  <div className="flex w-full mb-10 md:px-10 px-1 justify-between items-center">
    {previous ? (
      <Button asChild className="bg-gray-200 hover:text-white text-black">
        <Link href={`/courses/${previous}`}>
          <FaArrowLeft />
          Previous Course
        </Link>
      </Button>
    ) : (
      <span />
    )}

    <Button
      onClick={() => whatsapp.open({ course_name: courseName })}
    >
      Enroll Now
    </Button>

    {next ? (
      <Button asChild className="bg-gray-200 hover:text-white text-black">
        <Link href={`/courses/${next}`}>
          Next Course
          <FaArrowRight />
        </Link>
      </Button>
    ) : (
      <span />
    )}
  </div>
  );
};

export default CourseNav;
