import React from 'react';

import {
  Form, Input, Checkbox, Table,
} from 'antd';
import { GraphQLClient } from 'graphql-request';
import {
  Statement, useCreateStatementMutation, useUpdateStatementMutation, useDeleteStatementMutation, StatementInput,
} from '../../Api/Backend';

import { FormType, basicForm } from './FormHelper';
import GraphqlService from '../../helpers/GraphqlService';

interface StatementCRUDProps {
  onAttributesUpdate: () => Promise<void>;
  statement? : Statement;
  formtype : FormType;
  admin? : boolean
}

function StatementCRUD(props:StatementCRUDProps) {
  const [form] = Form.useForm();

  console.log('statement crud on');
  const createMutation = useCreateStatementMutation(GraphqlService.getClient());
  const updateMutation = useUpdateStatementMutation(GraphqlService.getClient());
  const deleteMutation = useDeleteStatementMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    statement,
    formtype,
    admin,
  } = props;
  console.log(admin);

  const onCreateFinish = async (values : any) => {
    // Push attributes, that are actually editable, to list.
    const statementInput = values as StatementInput;
    createMutation.mutate({ statement: statementInput });
    onAttributesUpdate();
  };

  const onUpdateFinish = async (values : any) => {
    // Push attributes, that are actually editable, to list.
    const statementInput = values as StatementInput;
    if (statement !== undefined) {
      updateMutation.mutate({ id: statement.getId, statement: statementInput });
      onAttributesUpdate();
    }
  };

  const onDeleteFinish = async () => {
    // Push attributes, that are actually editable, to list.
    if (statement !== undefined) {
      deleteMutation.mutate({ id: statement.getId });
      onAttributesUpdate();
    }
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

  const updateCreateFormItems = (
    <>
      <Form.Item label="IBAN" name="IBAN" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Bedrag" name="amount" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Opmerking" name="comment" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Feedback" name="feedback" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Waarvoor" name="item" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="mail" rules={[{ required: false, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Naam" name="name" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Reden" name="reason" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
    </>
  );

  const deleteFormItems = (
    <Form.Item name="sure" valuePropName="checked" noStyle>
      <Checkbox>Ja, ik wil deze declaratie echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype === FormType.CREATE && statement === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', updateCreateFormItems)}
      </>
    );
  }

  if (formtype === FormType.UPDATE && statement !== undefined) {
    const updateInitial = {
      IBAN: statement.IBAN,
      amount: statement.amount,
      comment: statement.comment,
      feedback: statement.feedback,
      item: statement.item,
      mail: statement.mail,
      name: statement.name,
      reason: statement.reason,
      status: statement.status,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype === FormType.READ && statement !== undefined) {
    const readData = [
      { key: 'IBAN', value: statement.IBAN },
      { key: 'Bedrag', value: statement.amount },
      { key: 'Opmerking', value: statement.comment },
      { key: 'Feedback', value: statement.feedback },
      { key: 'email', value: statement.mail },
      { key: 'naam', value: statement.name },
      { key: 'reden', value: statement.reason },
      { key: 'status', value: statement.status },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype === FormType.DELETE && statement !== undefined) {
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

export default StatementCRUD;
