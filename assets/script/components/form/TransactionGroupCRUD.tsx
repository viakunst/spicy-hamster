import React, { useEffect, useState } from 'react';

import {
  Button, Form, message, Divider, Input, Checkbox, Table,
} from 'antd';
import { TransactionGroup } from '../../Api/Backend';

import { FormType, basicForm } from './FormHelper';

interface TransactionGroupCRUDProps {
  onAttributesUpdate: () => Promise<void>;
  transactionGroup? : TransactionGroup;
  formtype : FormType
}

function TransactionGroupCRUD(props:TransactionGroupCRUDProps) {
  const [form] = Form.useForm();

  const {
    onAttributesUpdate,
    transactionGroup,
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
      <Form.Item label="IBAN" name="givenName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Bedrag" name="amount" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Omschrijving" name="description" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Naam" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </>
  );

  const deleteFormItems = (
    <Form.Item name="sure" valuePropName="checked" noStyle>
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype == FormType.CREATE && transactionGroup === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', updateCreateFormItems)}
      </>
    );
  }

  if (formtype == FormType.UPDATE && transactionGroup !== undefined) {
    const updateInitial = {
      IBAN: transactionGroup.IBAN,
      amount: transactionGroup.amount,
      description: transactionGroup.description,
      title: transactionGroup.title,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype == FormType.READ && transactionGroup !== undefined) {
    const readData = [
      { key: 'Title of naam', value: transactionGroup.title },
      { key: 'Omschrijving', value: transactionGroup.description },
      { key: 'Bedrag', value: transactionGroup.amount },
      { key: 'IBAN', value: transactionGroup.IBAN },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype == FormType.DELETE && transactionGroup !== undefined) {
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

export default TransactionGroupCRUD;
