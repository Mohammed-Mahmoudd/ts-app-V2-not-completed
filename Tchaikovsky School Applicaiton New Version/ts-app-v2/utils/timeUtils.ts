export function timeAgo(date: Date | string | number): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime(); // difference in ms

  const seconds = Math.floor(diff / 1000);
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} wk${weeks > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} yr${years > 1 ? "s" : ""} ago`;
}
