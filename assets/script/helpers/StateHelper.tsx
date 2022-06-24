import React from 'react';

import {
  Badge,
} from 'antd';

export const stateRender = (state:any) => {
  if (status === 'Openstaand') {
    return (<span><Badge status="error" />Openstaand</span>);
  }
  if (status === 'Loading') {
    return (<span><Badge status="warning" />Laden</span>);
  }
  if (status === 'Voldaan') {
    return (<span><Badge status="success" />Voldaan</span>);
  }
  return (<span><Badge status="warning" />Onbekend</span>);
};
