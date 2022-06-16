import React from 'react';

import {
  Form, Badge, Table, Button, Divider,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import {
  PersonTransactions, Transaction, useGetAllOutstandingTransactionsCoupledWithPersonQuery, useCreateTransactionGroupMutation,
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

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  console.log(data);

  // Put data in table

  const expandedRowRender = (record:PersonTransactions) => {
    const columns: ColumnsType<Transaction> = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            design
          </span>
        ),
      },
    ];

    const data = record.transactions as Transaction[];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: ColumnsType<PersonTransactions> = [
    { title: 'Name', dataIndex: 'name', key: 'person.getName' },
    { title: 'Email', dataIndex: 'email', key: 'person.email' },
  ];

  const onFinish = async (values: any) => {
    console.log(values);

    // TO-DO: Send emails.
  };

  const personTransactions = data.getAllOutstandingTransactionsCoupledWithPerson as PersonTransactions[];

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
