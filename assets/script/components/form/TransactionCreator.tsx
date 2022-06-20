import React from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form, Input, Checkbox, DatePicker, Select, Button, InputNumber, Divider, message, Space, Tag,
} from 'antd';

import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import FormItem from 'antd/lib/form/FormItem';
import {
  BankAccount, Transaction, TransactionGroupTypeInput, Person, useGetPersonsQuery, useGetBankAccountsQuery, useCreateTransactionGroupMutation, TransactionTypeInput,
} from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';

import { FormType, basicForm } from './FormHelper';

const { Option } = Select;

interface TransactionCreatorProps {

}

const formatterNumber = (val:any) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const parseFloatString = (value:any) => {
  const val = `${value}`;
  const indexpoint = val.indexOf('.');

  if (indexpoint === -1) {
    return `${val.replace('.', '')}00`;
  }
  if (val.length - indexpoint == 2) {
    return `${val.replace('.', '')}0`;
  }
  if (val.length - indexpoint == 3) {
    return val.replace('.', '');
  }

  return val;
};

const parserNumber = (val:any) => val!.replace(/\$\s?|(,*)/g, '');

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

function TransactionCreator(props:TransactionCreatorProps) {
  const [form] = Form.useForm();
  const {
    data: data1, isLoading: isLoading1, isError: isError1,
  } = useGetPersonsQuery(GraphqlService.getClient());

  const {
    data: data2, isLoading: isLoading2, isError: isError2,
  } = useGetBankAccountsQuery(GraphqlService.getClient());

  const createMutation = useCreateTransactionGroupMutation(GraphqlService.getClient());

  if (isLoading1 || isError1 || data1 === undefined || isLoading2 || isError2 || data2 === undefined) {
    return <span>Loading...</span>;
  }

  let submitButton = (<Button type="primary" htmlType="submit" style={{ width: '100%' }}>Maak deze transacties aan!</Button>);
  if (createMutation.isLoading) {
    submitButton = (<Button type="primary" style={{ width: '100%' }} htmlType="submit" disabled>Aanmaken...</Button>);
  }
  if (createMutation.isSuccess) {
    createMutation.reset();
    message.success('Transactie succesful aangemaakt!');
  }
  if (createMutation.isError) {
    createMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const persons = data1.persons as Person[];
  const accounts = data2.bankAccounts as BankAccount[];

  const {
  } = props;

  const onCreateFinish = async (values:any) => {
    console.log(values);
    const transactions:TransactionTypeInput[] = [];

    values.fields.forEach((val:any) => {
      console.log(val);
      const parsedAmount = parseInt(parseFloatString(val.amount));
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
    const { date } = values;
    console.log(date);
    const formattedDate = values.date;
    const createInput = {
      title: values.title,
      bankAccountId: values.account,
      description: values.description,
      date: formattedDate,
      transactions,
    };
    console.log(createInput);
    createMutation.mutate({ transactionGroupTypeInput: createInput });
  };

  const content = (<>Loading</>);

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

  const tagRender = (props: CustomTagProps) => {
    const {
      label, value, closable, onClose,
    } = props;
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
          },
        },
      ]}
    >
      {(fields, { add, remove }) => (
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
                <InputNumber
                  prefix="€"
                  formatter={(value:any) => formatterNumber(value)}
                  parser={(value:any) => parserNumber(value)}
                />
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

export default TransactionCreator;
