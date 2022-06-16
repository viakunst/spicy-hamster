import React from 'react';

import {
  Form, Badge, Table, Button, Divider,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import {
  PersonTransactions, Transaction, useGetAllOutstandingTransactionsCoupledWithPersonQuery, useSendAllRemindersMutation,
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
    data, isLoading, isError, refetch,
  } = useGetAllOutstandingTransactionsCoupledWithPersonQuery(GraphqlService.getClient());
  const sendMutation = useSendAllRemindersMutation(GraphqlService.getClient());

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

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

    const data = record.transactions as Transaction[];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: ColumnsType<PersonTransactions> = [
    { title: 'Name', dataIndex: ['person', 'getName'], key: 'name' },
    { title: 'Email', dataIndex: ['person', 'email'], key: 'email' },
  ];

  const onFinish = async () => {
    sendMutation.mutate({});
  };

  const personTransactions = data.getAllOutstandingTransactionsCoupledWithPerson as PersonTransactions[];
  console.log(personTransactions);

  let content = (
    <>
      <Divider>Overzicht wie herrinnerd word.</Divider>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={personTransactions}
      />

      <Divider />

      <Form
        labelCol={formItemLayout?.labelCol}
        wrapperCol={formItemLayout?.wrapperCol}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item wrapperCol={buttonLayout.wrapperCol}>
          <Button type="primary" htmlType="submit">Verstuur de Betaalherrinneringen!</Button>
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
