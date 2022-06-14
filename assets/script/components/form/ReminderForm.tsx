import React from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form, Input, Checkbox, Table, Select, Button, InputNumber, Divider, Row, Col, Space,
} from 'antd';

import {
  BankAccount, Transaction, TransactionGroup, Person, useGetPersonsQuery, useGetBankAccountsQuery,
} from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';

import { FormType, basicForm } from './FormHelper';

const { Option } = Select;

interface TransactionCreatorProps {

}

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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 22, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const buttonLayout = {
  wrapperCol: {
    xs: { span: 6, offset: 9 },
    sm: { span: 6, offset: 9 },
  },
};

function ReminderForm(props:TransactionCreatorProps) {
  const [form] = Form.useForm();
  const {
    data: data1, isLoading: isLoading1, isError: isError1,
  } = useGetPersonsQuery(GraphqlService.getClient());

  const onFinish = async () => {
    // Send emails.

  };

  return (
    <div style={{ padding: 24, background: '#fff' }}>
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

    </div>
  );
}
