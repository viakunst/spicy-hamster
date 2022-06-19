import React from 'react';

import {
  Form, Input, Checkbox, Table, message,
} from 'antd';
import {
  BankAccount, useCreateBankAccountMutation, useUpdateBankAccountMutation, useDeleteBankAccountMutation, BankAccountInput,
} from '../../../Api/Backend';

import GraphqlService from '../../../helpers/GraphqlService';

import { FormType, basicForm } from '../FormHelper';

interface BankAccountCreateProps {
  onAttributesUpdate: () => void;
  bankaccount? : BankAccount;
  formtype : FormType
}

function BankAccountCRUD(props:BankAccountCreateProps) {
  const [form] = Form.useForm();

  const createMutation = useCreateBankAccountMutation(GraphqlService.getClient());
  const updateMutation = useUpdateBankAccountMutation(GraphqlService.getClient());
  const deleteMutation = useDeleteBankAccountMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    bankaccount,
    formtype,
  } = props;

  let disabled = false;
  if (createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading) {
    disabled = true;
  }

  if (createMutation.isSuccess) {
    createMutation.reset();
    message.success('Bankrekening succesvol aangemaakt.');
    onAttributesUpdate();
  }
  if (updateMutation.isSuccess) {
    updateMutation.reset();
    message.success('Bankrekening succesvol geupdated.');
    onAttributesUpdate();
  }
  if (deleteMutation.isSuccess) {
    deleteMutation.reset();
    message.success('Bankrekening succesvol verwijdered.');
    onAttributesUpdate();
  }

  if (createMutation.isError || updateMutation.isError || deleteMutation.isError) {
    createMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const onCreateFinish = async (values: any) => {
    const bankaccountInput = values as BankAccountInput;
    createMutation.mutate({ bankaccount: bankaccountInput });
  };

  const onUpdateFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    const bankaccountInput = values as BankAccountInput;
    if (bankaccount !== undefined) {
      updateMutation.mutate({ id: bankaccount.getId, bankaccount: bankaccountInput });
    }
  };

  const onDeleteFinish = async (values:any) => {
    if (bankaccount !== undefined && values.sure === true) {
      deleteMutation.mutate({ id: bankaccount.getId });
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
    <Form.Item
      name="sure"
      valuePropName="checked"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
      }}
    >
      <Checkbox> Ja, ik wil dit bank account echt verwijderen. </Checkbox>
    </Form.Item>
  );

  if (formtype === FormType.CREATE && bankaccount === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', 'Aanmaken...', disabled, updateCreateFormItems)}
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
        {basicForm(form, onUpdateFinish, 'Opslaan', 'Opslaan...', disabled, updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype === FormType.READ && bankaccount !== undefined) {
    const readData = [
      { key: 'Naam', value: bankaccount.name },
      { key: 'IBAN', value: bankaccount.IBAN },
    ];

    content = (<Table dataSource={readData} columns={readColumns} pagination={false} />);
  }

  if (formtype === FormType.DELETE && bankaccount !== undefined) {
    content = (
      <>
        {basicForm(form, onDeleteFinish, 'Verwijder', 'Verwijderen...', disabled, deleteFormItems)}
      </>
    );
  }

  return (
    <div style={{
      padding: 5, background: '#fff', width: '100%', resize: 'both',
    }}
    >
      {content}
    </div>
  );
}

export default BankAccountCRUD;
