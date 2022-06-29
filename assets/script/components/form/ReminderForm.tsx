// Auto generated code has too long variable name.
/* eslint-disable max-len */
import React from 'react';

import {
  Form, Badge, Table, Button, Divider, message,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import {
  PersonTransactions, Transaction,
  useGetAllOutstandingTransactionsCoupledWithPersonQuery,
  useSendAllRemindersMutation,
} from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 20 },
  },
};

const buttonLayout = {
  wrapperCol: {
    xs: { span: 6, offset: 9 },
    sm: { span: 6, offset: 9 },
  },
};

function ReminderForm() {
  const [form] = Form.useForm();

  const {
    data, isLoading, isError,
  } = useGetAllOutstandingTransactionsCoupledWithPersonQuery(GraphqlService.getClient());
  const sendMutation = useSendAllRemindersMutation(GraphqlService.getClient());

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  let submitButton = (
    <Button type="primary" style={{ width: '100%' }} htmlType="submit">
      Verstuur de Betaalherrinneringen!
    </Button>
  );

  if (sendMutation.isLoading) {
    submitButton = (<Button type="primary" style={{ width: '100%' }} htmlType="submit" disabled>Versturen...</Button>);
  }
  if (sendMutation.isSuccess) {
    sendMutation.reset();
    message.success('De herrineringen zijn succesful verstuurd!');
  }
  if (sendMutation.isError) {
    sendMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const onFinish = async () => {
    sendMutation.mutate({});
  };

  const expandedRowRender = (record:PersonTransactions) => {
    const columns: ColumnsType<Transaction> = [
      { title: 'Datum', dataIndex: 'getDate', key: 'getDate' },
      { title: 'Titel', dataIndex: 'getTitle', key: 'getTitle' },
      { title: 'Bedrag', dataIndex: 'amount', key: 'amount' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Openstaand
          </span>
        ),
      },
    ];

    const transactionData = record.transactions as Transaction[];
    return <Table columns={columns} dataSource={transactionData} pagination={false} />;
  };

  const columns: ColumnsType<PersonTransactions> = [
    { title: 'Name', dataIndex: ['person', 'getName'], key: 'name' },
    { title: 'Email', dataIndex: ['person', 'email'], key: 'email' },
  ];

  const personTransactions = data.getAllOutstandingTransactionsCoupledWithPerson as PersonTransactions[];

  let content = (
    <>
      <Divider>Overzicht wie herrinnerd word.</Divider>
      <Table
        className="components-table-demo-nested"
        rowKey={(record) => record.person.getId}
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={personTransactions}
        pagination={false}
      />

      <Divider />

      <Form
        labelCol={formItemLayout?.labelCol}
        wrapperCol={formItemLayout?.wrapperCol}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item wrapperCol={buttonLayout.wrapperCol}>
          {submitButton}
        </Form.Item>
      </Form>
    </>
  );

  if (personTransactions.length === 0) {
    content = (
      <Divider>Geen openstaande transacties.</Divider>
    );
  }

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      {content}
    </div>
  );
}

export default ReminderForm;
