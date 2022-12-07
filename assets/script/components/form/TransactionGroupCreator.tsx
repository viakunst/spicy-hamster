// This rule is broken for an imported types.
/* eslint-disable react/prop-types */

/* eslint-disable max-len */

import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import {
  Form, Input, DatePicker, Select, Button, Divider, message, Tag,
} from 'antd';

import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import FormItem from 'antd/lib/form/FormItem';
import {
  BankAccount, Person, useGetPersonsQuery, useGetBankAccountsQuery,
  useCreateTransactionGroupMutation, TransactionTypeInput,
} from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';

import { amountInput, parseFloatString } from '../../helpers/AmountHelper';

const { Option } = Select;

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

interface TransactionGroupCreatorProps {
  onAttributesUpdate: () => void;
}

function TransactionGroupCreator(props:TransactionGroupCreatorProps) {
  const [form] = Form.useForm();
  const { onAttributesUpdate } = props;

  const {
    data: data1, isLoading: isLoading1, isError: isError1,
  } = useGetPersonsQuery(GraphqlService.getClient());

  const {
    data: data2, isLoading: isLoading2, isError: isError2,
  } = useGetBankAccountsQuery(GraphqlService.getClient());

  const createMutation = useCreateTransactionGroupMutation(GraphqlService.getClient());

  if (isLoading1 || isError1 || data1 === undefined
    || isLoading2 || isError2 || data2 === undefined) {
    return <span>Loading...</span>;
  }

  let submitButton = (
    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
      Maak deze transacties aan!
    </Button>
  );

  if (createMutation.isLoading) {
    submitButton = (<Button type="primary" style={{ width: '100%' }} htmlType="submit" disabled>Aanmaken...</Button>);
  }
  if (createMutation.isSuccess) {
    createMutation.reset();
    message.success('Transactie succesful aangemaakt!');
    onAttributesUpdate();
  }
  if (createMutation.isError) {
    createMutation.reset();
    message.error('Er is iets fout gegaan.');
    onAttributesUpdate();
  }

  const persons = data1.persons as Person[];
  const accounts = data2.bankAccounts as BankAccount[];

  const onCreateFinish = async (values:any) => {
    const transactions:TransactionTypeInput[] = [];

    values.fields.forEach((val:any) => {
      const parsedAmount = parseInt(parseFloatString(val.amount), 10);
      val.person.forEach((person:any) => {
        const transaction = {
          amount: parsedAmount,
          comment: undefined,
          personId: person,
          status: 'Openstaand',
          timesReminded: 0,
        } as TransactionTypeInput;
        transactions.push(transaction);
      });
    });

    const formattedDate = values.date;
    const createInput = {
      title: values.title,
      bankAccountId: values.account,
      description: values.description,
      date: formattedDate,
      transactions,
    };
    createMutation.mutate({ transactionGroupTypeInput: createInput });
  };

  const personOptions = (
    <>
      {persons.map((person) => (
        <Option value={person.getId}>{person.getName}</Option>
      ))}
    </>
  );

  const bankAccountOptions = (
    <>
      {accounts.map((account) => (
        <Option value={account.getId}>{account.name} {account.IBAN}</Option>
      ))}
    </>
  );

  const tagRender = (tagProps: CustomTagProps) => {
    const {
      label, closable, onClose,
    } = tagProps;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="blue"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const priceList = (
    <Form.List
      name="fields"
      rules={[
        {
          validator: async (_, fields) => {
            if (!fields || fields.length < 1) {
              return Promise.reject(new Error('Op zijn minst 1 persoon.'));
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      {(fields, { add }) => (
        <div>
          {fields.map((field, index) => (
            <div key={field.key}>
              <Divider>Prijsoptie {index + 1}</Divider>

              <Form.Item
                label="Prijs"
                rules={[{ required: true }]}
                name={[field.name, 'amount']}
                fieldKey={[field.key, 'amount']}
              >
                {amountInput()}
              </Form.Item>
              <FormItem
                label="Betaalgerechtingen"
                name={[field.name, 'person']}
                fieldKey={[field.key, 'person']}
                rules={[{ required: false }]}
                labelCol={formItemLayout?.labelCol}
                wrapperCol={formItemLayout?.wrapperCol}
              >
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
                >
                  {personOptions}
                </Select>
              </FormItem>
            </div>

          ))}
          <Divider />
          <Form.Item wrapperCol={buttonLayout.wrapperCol}>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: '100%' }}
            >
              <PlusOutlined /> Nieuwe Prijsoptie.
            </Button>
          </Form.Item>
        </div>
      )}

    </Form.List>
  );

  const updateCreateFormItems = (
    <>
      <Form.Item
        label="Titel"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Omschrijving"
        name="description"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Datum"
        name="date"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="account"
        label="Bankrekening"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="De bankrekening van deze activiteit."
          allowClear
        >
          {bankAccountOptions}
        </Select>
      </Form.Item>

      {priceList}
    </>
  );

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Form
        labelCol={formItemLayout?.labelCol}
        wrapperCol={formItemLayout?.wrapperCol}
        form={form}
        onFinish={onCreateFinish}
      >
        {updateCreateFormItems}
        <Form.Item wrapperCol={buttonLayout.wrapperCol}>
          {submitButton}
        </Form.Item>
      </Form>
    </div>
  );
}

export default TransactionGroupCreator;
