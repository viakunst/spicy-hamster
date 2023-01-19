import moment from 'moment';

const dateRender = (dateString:any) => {
  const formattedDateString = moment(dateString).format('L');
  return formattedDateString;
};

export const dateSort = (dateA:any, dateB:any) => moment(dateA).diff(moment(dateB), 'days');

export default dateRender;
