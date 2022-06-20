import React from 'react';
import moment from 'moment';

export const dateRender = (dateString:any) => {
  dateString = moment(dateString).format('L');
  return dateString;
};
