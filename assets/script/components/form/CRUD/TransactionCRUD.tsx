import React from 'react';

import {
  Form, Input, Checkbox, Table, message, InputNumber,
} from 'antd';

import {
  Transaction, useCreateTransactionMutation, useUpdateTransactionMutation, TransactionInput, useDeleteTransactionMutation,
} from '../../../Api/Backend';

import { FormType, basicForm } from '../FormHelper';
import GraphqlService from '../../../helpers/GraphqlService';
import { amountRender, amountInput, parseFloatString } from '../../../helpers/AmountInput';

interface TransactionCRUDprops {
  onAttributesUpdate: () => void;
  transaction? : Transaction;
  formtype : FormType
}

function TransactionCRUD(props:TransactionCRUDprops) {
  const [form] = Form.useForm();

  const createMutation = useCreateTransactionMutation(GraphqlService.getClient());
  const updateMutation = useUpdateTransactionMutation(GraphqlService.getClient());
  const deleteMutation = useDeleteTransactionMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    transaction,
    formtype,
  } = props;

  let disabled = false;
  if (createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading) {
    disabled = true;
  }

  if (createMutation.isSuccess) {
    createMutation.reset();
    message.success('Transactie succesvol aangemaakt.');
    onAttributesUpdate();
  }
  if (updateMutation.isSuccess) {
    updateMutation.reset();
    message.success('Transactie succesvol geupdated.');
    onAttributesUpdate();
  }
  if (deleteMutation.isSuccess) {
    deleteMutation.reset();
    message.success('Transactie succesvol verwijdered.');
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
    console.log(values);

    const amount = values.amount as string;
    values.amount = parseInt(parseFloatString(amount.toString()));

    values.timesReminded = parseInt(values.timesReminded);
    console.log(values);
    const transactionInput = values as TransactionInput;
    createMutation.mutate({ transaction: transactionInput });
  };

  const onUpdateFinish = async (values:any) => {
    // Push attributes, that are actually editable, to list.

    console.log(values);
    values.amount = parseInt(parseFloatString(values.amount));
    values.timesReminded = parseInt(values.timesReminded);
    console.log(values);

    const transactionInput = values as TransactionInput;

    if (transaction !== undefined) {
      updateMutation.mutate({ id: transaction.getId, transaction: transactionInput });
    }
  };

  const onDeleteFinish = async () => {
    // Push attributes, that are actually editable, to list.
    if (transaction !== undefined) {
      deleteMutation.mutate({ id: transaction.getId });
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
      <Form.Item label="Opmerking" name="comment" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Reminders" name="timesReminded" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Bedrag" name="amount" rules={[{ required: true }]}>
        {amountInput()}
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
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype === FormType.CREATE && transaction === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', 'Aanmaken...', disabled, updateCreateFormItems)}
      </>
    );
  }

  if (formtype === FormType.UPDATE && transaction !== undefined) {
    const updateInitial = {
      comment: transaction.comment,
      status: transaction.status,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', 'Opslaan...', disabled, updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype === FormType.READ && transaction !== undefined) {
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

  if (formtype === FormType.DELETE && transaction !== undefined) {
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

export default TransactionCRUD;
