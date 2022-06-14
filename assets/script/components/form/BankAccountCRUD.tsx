import React from 'react';

import {
  Form, Input, Checkbox, Table,
} from 'antd';
import {
  BankAccount, useCreateBankAccountMutation, useUpdateBankAccountMutation, useDeleteBankAccountMutation, BankAccountInput,
} from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';

import { FormType, basicForm } from './FormHelper';

interface BankAccountCreateProps {
  onAttributesUpdate: () => Promise<void>;
  bankaccount? : BankAccount;
  formtype : FormType
}

function BankAccountCRUD(props:BankAccountCreateProps) {
  const [form] = Form.useForm();

  console.log('bankaccount crud on');
  const createMutation = useCreateBankAccountMutation(GraphqlService.getClient());
  const updateMutation = useUpdateBankAccountMutation(GraphqlService.getClient());
  const deleteMutation = useDeleteBankAccountMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    bankaccount,
    formtype,
  } = props;

  const onCreateFinish = async (values: any) => {
    const bankaccountInput = values as BankAccountInput;
    createMutation.mutate({ bankaccount: bankaccountInput });
    onAttributesUpdate();
  };

  const onUpdateFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    const bankaccountInput = values as BankAccountInput;
    if (bankaccount !== undefined) {
      updateMutation.mutate({ id: bankaccount.getId, bankaccount: bankaccountInput });
      onAttributesUpdate();
    }
  };

  const onDeleteFinish = async () => {
    if (bankaccount !== undefined) {
      deleteMutation.mutate({ id: bankaccount.getId });
      onAttributesUpdate();
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
      <Form.Item label="Naam" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="IBAN" name="IBAN" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </>
  );

  const deleteFormItems = (
    <Form.Item name="sure" valuePropName="checked" noStyle>
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  console.log(formtype);
  console.log(bankaccount);

  if (formtype === FormType.CREATE && bankaccount === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', updateCreateFormItems)}
      </>
    );
  }

  if (formtype === FormType.UPDATE && bankaccount !== undefined) {
    const updateInitial = {
      name: bankaccount.name,
      IBAN: bankaccount.IBAN,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype === FormType.READ && bankaccount !== undefined) {
    const readData = [
      { key: 'Naam', value: bankaccount.name },
      { key: 'IBAN', value: bankaccount.IBAN },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype === FormType.DELETE && bankaccount !== undefined) {
    content = (
      <>
        {basicForm(form, onDeleteFinish, 'Verwijder', deleteFormItems)}
      </>
    );
  }

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      {content}
    </div>
  );
}

export default BankAccountCRUD;
