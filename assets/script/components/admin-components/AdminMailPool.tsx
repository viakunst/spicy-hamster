import React from 'react';
import MailPool from '../pools/MailPool';

export default function AdminMailPool() {
  return (
    <div className="admin card row">
      <h2>Alle emails van vk.</h2>
      <div className="table">
        <MailPool />
      </div>
      <br />
    </div>
  );
}
