import { format } from 'date-fns';

export const fDate = date => {
  return format(new Date(date), 'MM/dd/yyyy');
};

