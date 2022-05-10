import { format } from 'date-fns';

export const getYesterday = (structure: string): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return format(date, structure);
}