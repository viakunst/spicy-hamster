import React from 'react';

import {
  InputNumber,
} from 'antd';

const formatterNumber = (val:any) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseFloatString = (value:any) => {
  const val = `${value}`;
  const indexpoint = val.indexOf('.');

  if (indexpoint === -1) {
    return `${val.replace('.', '')}00`;
  }
  if (val.length - indexpoint === 2) {
    return `${val.replace('.', '')}0`;
  }
  if (val.length - indexpoint === 3) {
    return val.replace('.', '');
  }

  return val;
};

const parserNumber = (val:any) => val!.replace(/\$\s?|(,*)/g, '');

export const amountInput = () => (
  <InputNumber
    prefix="€"
    formatter={(value:any) => formatterNumber(value)}
    parser={(value:any) => parserNumber(value)}
  />
);

export const amountRender = (amount:any) => {
  if (amount instanceof String) {
    return amount;
  }
  const euro = amount / 100;
  const euroString = euro.toFixed(2);
  return `€ ${euroString}`;
};
