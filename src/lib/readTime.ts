// Manually set readTime (in minutes) wins — mentors now pick this explicitly
// per post. Word-count estimation is only a fallback for posts created
// before that field existed.
export function getReadTime(content?: string, readTimeMinutes?: number): string {
  if (readTimeMinutes && readTimeMinutes > 0) {
    return `${Math.round(readTimeMinutes)} min read`;
  }

  const text = content
    ? content
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const words = text ? text.split(" ").length : 0;
  if (words > 0) return `${Math.max(1, Math.ceil(words / 225))} min read`;

  return "1 min read";
}
