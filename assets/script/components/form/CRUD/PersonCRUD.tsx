import React from 'react';

import {
  Form, Input, Checkbox, Table, message,
} from 'antd';
import {
  Person, useCreatePersonMutation, useUpdatePersonMutation, useDeletePersonMutation, PersonInput,
} from '../../../Api/Backend';

import GraphqlService from '../../../helpers/GraphqlService';

import { FormType, basicForm } from '../FormHelper';

interface PersonCreateProps {
  onAttributesUpdate: () => void;
  person? : Person;
  formtype : FormType
}

function PersonCRUD(props:PersonCreateProps) {
  const [form] = Form.useForm();

  const createMutation = useCreatePersonMutation(GraphqlService.getClient());
  const updateMutation = useUpdatePersonMutation(GraphqlService.getClient());
  const deleteMutation = useDeletePersonMutation(GraphqlService.getClient());

  const {
    onAttributesUpdate,
    person,
    formtype,
  } = props;

  let disabled = false;
  if (createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading) {
    disabled = true;
  }

  if (createMutation.isSuccess) {
    createMutation.reset();
    message.success('Persoon succesvol aangemaakt.');
    onAttributesUpdate();
  }
  if (updateMutation.isSuccess) {
    updateMutation.reset();
    message.success('Persoon succesvol geupdated.');
    onAttributesUpdate();
  }
  if (deleteMutation.isSuccess) {
    deleteMutation.reset();
    message.success('Persoon succesvol verwijdered.');
    onAttributesUpdate();
  }

  if (createMutation.isError || updateMutation.isError || deleteMutation.isError) {
    createMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const onCreateFinish = async (values: any) => {
    const personInput = values as PersonInput;
    createMutation.mutate({ person: personInput });
  };

  const onUpdateFinish = async (values: any) => {
    // Push attributes, that are actually editable, to list.
    const { admin } = values;
    const copyValues = values;
    delete copyValues.admin;

    const personInput = copyValues as PersonInput;
    if (admin) {
      personInput.role = 'admin';
    } else {
      personInput.role = '';
    }

    if (person !== undefined) {
      updateMutation.mutate({ id: person.getId, person: personInput });
    }
  };

  const onDeleteFinish = async () => {
    if (person !== undefined) {
      deleteMutation.mutate({ id: person.getId });
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
      <Form.Item label="Voornaam" name="givenName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Achternaam" name="familyName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Adress" name="address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Admin" name="admin" valuePropName="checked" rules={[{ required: false }]}>
        <Checkbox>Deze gebruiker is admin.</Checkbox>
      </Form.Item>
      <Form.Item label="AWS Identifier" name="sub" rules={[{ required: false }]}>
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
      <Checkbox>Ja, ik wil dit account echt verwijderen.</Checkbox>
    </Form.Item>
  );

  if (formtype === FormType.CREATE && person === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', 'Aanmaken...', disabled, updateCreateFormItems)}
      </>
    );
  }

  if (formtype === FormType.UPDATE && person !== undefined) {
    let admin = false;
    if (person.role === 'admin') {
      admin = true;
    }

    const updateInitial = {
      sub: person.sub,
      email: person.email,
      address: person.address,
      givenName: person.givenName,
      familyName: person.familyName,
      admin,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', 'Opslaan...', disabled, updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype === FormType.READ && person !== undefined) {
    const readData = [
      { key: 'Volledige naam', value: person.getName },
      { key: 'email', value: person.email },
      { key: 'address', value: person.address },
      { key: 'Rol', value: person.role },
      { key: 'AWS identifier', value: person.sub },
    ];

    content = (
      <Table dataSource={readData} columns={readColumns} pagination={false} />
    );
  }

  if (formtype === FormType.DELETE && person !== undefined) {
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

export default PersonCRUD;
