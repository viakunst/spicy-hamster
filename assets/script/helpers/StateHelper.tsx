import React from 'react';

import {
  Badge,
} from 'antd';

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
