import React from 'react';

import {
  Form, Input, Checkbox, Table, message,
} from 'antd';
import {
  TransactionGroup, useCreateTransactionGroupMutation, useDeleteTransactionGroupMutation, useUpdateTransactionGroupMutation, TransactionGroupInput,
} from '../../../Api/Backend';

import { FormType, basicForm } from '../FormHelper';
import GraphqlService from '../../../helpers/GraphqlService';

interface TransactionGroupCRUDProps {
  onAttributesUpdate: () => void;
  transactionGroup? : TransactionGroup;
  formtype : FormType
}

function TransactionGroupCRUD(props:TransactionGroupCRUDProps) {
  const [form] = Form.useForm();

  console.log('transaction group crud on');
  const createMutation = useCreateTransactionGroupMutation(GraphqlService.getClient());
  const updateMutation = useUpdateTransactionGroupMutation(GraphqlService.getClient());
  const deleteMutation = useDeleteTransactionGroupMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    transactionGroup,
    formtype,
  } = props;

  let disabled = false;
  if (createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading) {
    disabled = true;
  }

  if (createMutation.isSuccess) {
    createMutation.reset();
    message.success('Transactie Groep succesvol aangemaakt.');
    onAttributesUpdate();
  }
  if (updateMutation.isSuccess) {
    updateMutation.reset();
    message.success('Transactie Groep succesvol geupdated.');
    onAttributesUpdate();
  }
  if (deleteMutation.isSuccess) {
    deleteMutation.reset();
    message.success('Transactie Groep succesvol verwijdered.');
    onAttributesUpdate();
  }

  if (createMutation.isError || updateMutation.isError || deleteMutation.isError) {
    createMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const onCreateFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    const transactionGroupInput = values as TransactionGroupInput;
    // createMutation.mutate({ transactionGroup: transactionGroupInput });
  };

  const onUpdateFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    const transactionGroupInput = values as TransactionGroupInput;
    if (transactionGroup !== undefined) {
      updateMutation.mutate({ id: transactionGroup.getId, transactionGroup: transactionGroupInput });
    }
  };

  const onDeleteFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    if (transactionGroup !== undefined && values.sure === true) {
      deleteMutation.mutate({ id: transactionGroup.getId });
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
      <Form.Item label="IBAN" name="givenName" rules={[{ required: true }]}>
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
    <Form.Item
      name="sure"
      valuePropName="checked"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
      }}
    >
      <Checkbox>Ja, ik wil deze transactiegroep echt verwijderen.</Checkbox>
    </Form.Item>
  );

  console.log(formtype);
  console.log(transactionGroup);

  if (formtype === FormType.CREATE && transactionGroup === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', 'Aanmaken...', disabled, updateCreateFormItems)}
      </>
    );
  }

  if (formtype === FormType.UPDATE && transactionGroup !== undefined) {
    const updateInitial = {
      description: transactionGroup.description,
      title: transactionGroup.title,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', 'Opslaan...', disabled, updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype === FormType.READ && transactionGroup !== undefined) {
    const readData = [
      { key: 'Title of naam', value: transactionGroup.title },
      { key: 'Omschrijving', value: transactionGroup.description },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype === FormType.DELETE && transactionGroup !== undefined) {
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

export default TransactionGroupCRUD;
