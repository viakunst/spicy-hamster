import React from 'react';

import HtmlParser from 'react-html-parser';

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
    message.success('Email succesvol verwijdered.');
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
    let sendTo = '';
    if (mail.recipients !== undefined
      && mail.recipients !== null
      && mail.recipients[0] !== null
      && mail.recipients[0].person !== undefined
      && mail.recipients[0].person !== null
    ) {
      sendTo = mail.recipients[0].person.getName;
    }

    const parsedContent = JSON.parse(mail.content);
    const htmlContent = parsedContent.html.match(/<body>*>((.|\n)*?)<\/body>/)[0].replace(/<[\/]?body>/g, '');

    const readData = [
      { key: 'Titel', value: mail.title },
      { key: 'verzonden naar', value: sendTo },
      { key: 'verzonden door', value: mail.sendBy },
      { key: 'Content', value: (<>{HtmlParser(htmlContent)}</>) },
    ];

    content = (
      <div style={{
        padding: 5, background: '#fff', minHeight: 360, minWidth: 600,
      }}
      >
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
    <div style={{ padding: 5, background: '#fff', minHeight: 360 }}>
      {content}
    </div>
  );
}

export default MailCRUD;
