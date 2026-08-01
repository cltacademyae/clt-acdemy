// Content wins over the stored `readTime` — every post has a defaulted
// "1 min read", which made 2,000-word articles claim one minute.
export function getReadTime(content?: string, fallback?: string): string {
  const text = content
    ? content
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const words = text ? text.split(" ").length : 0;
  if (words > 0) return `${Math.max(1, Math.ceil(words / 225))} min read`;

  if (fallback && fallback.trim()) return fallback;
  return "1 min read";
}
