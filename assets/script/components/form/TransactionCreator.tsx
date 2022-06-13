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
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
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

  if (isLoading1 || isError1 || data1 === undefined || isLoading2 || isError2 || data2 === undefined) {
    return <span>Loading...</span>;
  }
  const persons = data1.persons as Person[];
  const accounts = data2.bankAccounts as BankAccount[];

  const {
  } = props;

  const onCreateFinish = async () => {
    // Push attributes, that are actually editable, to list.

  };

  let content = (<>Loading</>);

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
        <Option value={account.getId}>{account.IBAN}</Option>
      ))}
    </>
  );

  const personList = (field:any) => (
    <Form.List
      name={[field, 'persons']}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Betalingsverplichtingen' : ''}
              required={false}
              key={field.key}
            >
              <Space>

                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Persoon"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                  filterSort={(optionA, optionB) => (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare((optionB!.children as unknown as string).toLowerCase())}
                >
                  {personOptions}
                </Select>

                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />

              </Space>
            </Form.Item>
          ))}

          <Form.Item wrapperCol={buttonLayout.wrapperCol}>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
            >
              Nieuwe persoon
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );

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

              <Form.Item label="Prijs" name={`${field.name}price`} rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>

              {personList(field.name)}
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
      <Form.Item label="Opmerking" name="comment" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="iban" label="Bankrekening" rules={[{ required: true }]}>
        <Select
          placeholder="De bankrekening van deze activiteit."
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      {priceList}
    </>
  );

  content = (
    <>
      {basicForm(form, onCreateFinish, 'Maak aan', updateCreateFormItems)}
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
          <Button type="primary" htmlType="submit">Maak dez aan</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default TransactionCreator;
