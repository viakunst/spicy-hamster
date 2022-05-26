import React, { useEffect, useState } from 'react';

import {
  Button, Form, message, Divider, Input, Checkbox, Table,
} from 'antd';
import { Mail } from '../../Api/Backend';

import { FormType, basicForm } from './FormHelper';

interface MailCRUDProps {
  onAttributesUpdate: () => Promise<void>;
  mail? : Mail;
  formtype : FormType
}

function MailCRUD(props:MailCRUDProps) {
  const [form] = Form.useForm();

  const {
    onAttributesUpdate,
    mail,
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

  const deleteFormItems = (
    <Form.Item name="sure" valuePropName="checked" noStyle>
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype == FormType.READ && mail !== undefined) {
    const readData = [
      { key: 'Titel', value: mail.title },
      { key: 'Content', value: mail.content },
      { key: 'verzonden naar', value: mail.recipients },
      { key: 'persoon?', value: mail.person },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype == FormType.DELETE && mail !== undefined) {
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

export default MailCRUD;
