import React, { useEffect, useState } from 'react';

import {
  Button, Form, message, Divider, Input, Checkbox, Table,
} from 'antd';
import { Transaction } from '../../Api/Backend';

import { FormType, basicForm } from './FormHelper';

interface TransactionCRUDprops {
  onAttributesUpdate: () => Promise<void>;
  transaction? : Transaction;
  formtype : FormType
}

function TransactionCRUD(props:TransactionCRUDprops) {
  const [form] = Form.useForm();

  const {
    onAttributesUpdate,
    transaction,
    formtype,
  } = props;

  // componentDidMount
  useEffect(() => {

  }, []);

  const onCreateFinish = async () => {
    // Push attributes, that are actually editable, to list.

    onAttributesUpdate();
  };

  const onUpdateFinish = async () => {
    // Push attributes, that are actually editable, to list.

    onAttributesUpdate();
  };

  const onDeleteFinish = async () => {
    // Push attributes, that are actually editable, to list.

    onAttributesUpdate();
  };

  let content = (<></>);

  const readColumns = [
    {
      title: 'Veld',
      dataIndex: 'key',
      key: 'name',
    },
    {
      title: 'Waarde',
      dataIndex: 'value',
      key: 'age',
    },
  ];

  const updateCreateFormItems = (
    <>
      <Form.Item label="Opmerking" name="comment" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </>
  );

  const deleteFormItems = (
    <Form.Item name="sure" valuePropName="checked" noStyle>
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype == FormType.CREATE && transaction === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', updateCreateFormItems)}
      </>
    );
  }

  if (formtype == FormType.UPDATE && transaction !== undefined) {
    const updateInitial = {
      comment: transaction.comment,
      status: transaction.status,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype == FormType.READ && transaction !== undefined) {
    const readData = [
      { key: 'Opmerking', value: transaction.comment },
      { key: 'Status', value: transaction.status },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype == FormType.DELETE && transaction !== undefined) {
    content = (
      <>
        {basicForm(form, onDeleteFinish, 'Verwijder', deleteFormItems)}
      </>
    );
  }

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      {content}
    </div>
  );
}

export default TransactionCRUD;
