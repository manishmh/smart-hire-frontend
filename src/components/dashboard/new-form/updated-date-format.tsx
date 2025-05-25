export const formatLastUpdated = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);

  return `Last updated ${isToday ? 'today' : 'on ' + date.toLocaleDateString()} at ${timeString}`;
};