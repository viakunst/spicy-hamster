import React from 'react';

import {
  Form, Input, Checkbox, Table, message,
} from 'antd';

import {
  Transaction, useUpdateTransactionMutation, TransactionInput, useDeleteTransactionMutation,
} from '../../../Api/Backend';

import { FormType, basicForm } from '../FormHelper';
import GraphqlService from '../../../helpers/GraphqlService';
import { amountRender, amountInput, parseFloatString } from '../../../helpers/AmountHelper';
import dateRender from '../../../helpers/DateHelper';
import stateRender from '../../../helpers/StateHelper';

import TransactionCreator from '../TransactionCreator';

interface TransactionCRUDprops {
  onAttributesUpdate: () => void;
  transaction? : Transaction;
  formtype : FormType
}

function TransactionCRUD(props:TransactionCRUDprops) {
  const [form] = Form.useForm();

  const updateMutation = useUpdateTransactionMutation(GraphqlService.getClient());
  const deleteMutation = useDeleteTransactionMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    transaction,
    formtype,
  } = props;

  let disabled = false;
  if (updateMutation.isLoading || deleteMutation.isLoading) {
    disabled = true;
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

  if (updateMutation.isError || deleteMutation.isError) {
    updateMutation.reset();
    deleteMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const onUpdateFinish = async (values:any) => {
    // Push attributes, that are actually editable, to list.

    console.log(values);
    const copyValues = values;
    copyValues.amount = parseInt(parseFloatString(copyValues.amount), 10);
    copyValues.timesReminded = parseInt(copyValues.timesReminded, 10);
    console.log(copyValues);

    const transactionInput = copyValues as TransactionInput;

    if (transaction !== undefined) {
      updateMutation.mutate({ id: transaction.getId, transaction: transactionInput });
    }
  };

  const onDeleteFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    if (transaction !== undefined && values.sure === true) {
      deleteMutation.mutate({ id: transaction.getId });
    }
  };

  let content = (<>empty</>);

  const readColumns = [
    {
      title: 'Veld',
      dataIndex: 'key',
      key: 'title',
    },
    {
      title: 'Waarde',
      dataIndex: 'value',
      key: 'age',
    },
  ];

  const updateCreateFormItems = (
    <>
      <Form.Item label="Bedrag" name="amount" rules={[{ required: true }]}>
        {amountInput()}
      </Form.Item>
      <Form.Item label="Opmerking" name="comment" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Herrinneringen" name="timesReminded" rules={[{ required: true }]}>
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
      <Checkbox>Ja, ik wil deze transactie echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype === FormType.CREATE && transaction === undefined) {
    content = (
      <TransactionCreator />
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
      { title: 'Titel', key: 'title', value: transaction.getTitle },
      { title: 'Datum', key: 'date', value: dateRender(transaction.getDate) },
      { title: 'Bedrag', key: 'amount', value: amountRender(transaction.amount) },
      { title: 'Persoon', key: 'person', value: transaction.getPerson?.getName },
      { title: 'Bankaccount', key: 'account', value: transaction.getTransactionGroup?.getBankAccount?.name },
      { title: 'Status', key: 'state', value: stateRender(transaction.status) },
      { title: 'Opmerking', key: 'comment', value: transaction.comment },
      { title: 'Herrinneringen', key: 'timesReminded', value: transaction.timesReminded },
    ];

    content = (
      <Table dataSource={readData} columns={readColumns} />
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
    <div style={{ padding: 5, background: '#fff' }}>
      {content}
    </div>
  );
}

export default TransactionCRUD;
