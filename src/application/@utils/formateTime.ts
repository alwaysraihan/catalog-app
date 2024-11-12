export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${amOrPm}`;
};
