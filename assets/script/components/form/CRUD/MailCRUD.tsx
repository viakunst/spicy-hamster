import React, { useEffect } from 'react';

import {
  Form, Checkbox, Table, message,
} from 'antd';
import { Mail, useDeleteMailMutation } from '../../../Api/Backend';

import GraphqlService from '../../../helpers/GraphqlService';

import { FormType, basicForm } from '../FormHelper';

interface MailCRUDProps {
  onAttributesUpdate: () => void;
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

  const deleteMutation = useDeleteMailMutation(GraphqlService.getClient());

  let disabled = false;
  if (deleteMutation.isLoading) {
    disabled = true;
  }

  if (deleteMutation.isSuccess) {
    deleteMutation.reset();
    message.success('Persoon succesvol verwijdered.');
    onAttributesUpdate();
  }

  if (deleteMutation.isError) {
    deleteMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const onDeleteFinish = async () => {
    // Push attributes, that are actually editable, to list.
    console.log(mail?.getId);
    onAttributesUpdate();
  };

  let content = (<>empty</>);

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
    <Form.Item
      name="sure"
      valuePropName="checked"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
      }}
    >
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype === FormType.READ && mail !== undefined) {
    const readData = [
      { key: 'Titel', value: mail.title },
      { key: 'Content', value: mail.content },
      { key: 'verzonden naar', value: mail.recipients },
      { key: 'verzonden door', value: mail.sendBy },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype === FormType.DELETE && mail !== undefined) {
    content = (
      <>
        {basicForm(form, onDeleteFinish, 'Verwijder', 'Verwijderen...', disabled, deleteFormItems)}
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
