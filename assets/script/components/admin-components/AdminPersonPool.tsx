import React from 'react';
import PersonPool from '../pools/PersonPool';

export default function AdminPersonPool() {
  return (
    <div className="admin card row">
      <h2>Alle personen in financieel systeem.</h2>
      <div className="table">
        <PersonPool />
      </div>
      <br />
    </div>
  );
}
