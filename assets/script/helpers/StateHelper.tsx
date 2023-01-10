import React from 'react';

import {
  Badge,
} from 'antd';

export const PAID = 'Voldaan';
export const UNPAID = 'Openstaand';
export const LOADING = 'Loading';

export const transactionIsLoading = (state:any) => {
  if (state === 'Loading') {
    return true;
  }
  return false;
};

export const switchState = (state:any) => {
  if (state === 'Openstaand') {
    return 'Voldaan';
  }
  if (state === 'Voldaan') {
    return 'Openstaand';
  }
};

const stateRender = (state:any) => {
  if (state === 'Openstaand') {
    return (<span><Badge status="error" />Openstaand</span>);
  }
  if (state === 'Loading') {
    return (<span><Badge status="warning" />Laden</span>);
  }
  if (state === 'Voldaan') {
    return (<span><Badge status="success" />Voldaan</span>);
  }
  return (<span><Badge status="warning" />Onbekend</span>);
};

export default stateRender;
