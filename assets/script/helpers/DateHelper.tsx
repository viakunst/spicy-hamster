import moment from 'moment';

const dateRender = (dateString:any) => {
  const formattedDateString = moment(dateString).format('L');
  return formattedDateString;
};

export default dateRender;
