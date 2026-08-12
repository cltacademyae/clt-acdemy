import Link from "next/link";
import { blogPagePath } from "@/lib/pagination";

/**
 * Blog pagination, rendered as real anchors so every post stays reachable with
 * JavaScript disabled and within a few clicks of the homepage.
 */
export default function BlogPagination({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        {page > 1 && (
          <li>
            <Link
              href={blogPagePath(page - 1)}
              rel="prev"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 transition-colors"
            >
              Previous
            </Link>
          </li>
        )}

        {pages.map((n) => (
          <li key={n}>
            {n === page ? (
              <span
                aria-current="page"
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold"
              >
                {n}
              </span>
            ) : (
              <Link
                href={blogPagePath(n)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 transition-colors"
              >
                {n}
              </Link>
            )}
          </li>
        ))}

        {page < total && (
          <li>
            <Link
              href={blogPagePath(page + 1)}
              rel="next"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 transition-colors"
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
