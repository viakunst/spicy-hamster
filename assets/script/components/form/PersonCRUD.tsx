import React, { useEffect, useState } from 'react';

import {
  Button, Form, message, Divider, Input, Checkbox, Table,
} from 'antd';
import { Person, CreatePersonDocument, CreatePersonMutationVariables } from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';

import { FormType, basicForm } from './FormHelper';

interface PersonCreateProps {
  onAttributesUpdate: () => Promise<void>;
  person? : Person;
  formtype : FormType
}

function PersonCRUD(props:PersonCreateProps) {
  const [form] = Form.useForm();

  const {
    onAttributesUpdate,
    person,
    formtype,
  } = props;

  // componentDidMount
  useEffect(() => {

  }, []);

  const onCreateFinish = async () => {
    // Push attributes, that are actually editable, to list.

    const mutationVar = {
      person: {
        address: 'a',
        email: 'a',
        familyName: 'a',
        givenName: 'a',
        sub: 'a',
      },
    } as CreatePersonMutationVariables;

    GraphqlService.getClient().request(CreatePersonDocument, mutationVar).then((data) => {
      console.log(data);
    });

    onAttributesUpdate();
  };

  const onUpdateFinish = async () => {
    // Push attributes, that are actually editable, to list.

    onAttributesUpdate();
  };

  const onDeleteFinish = async () => {
    // Push attributes, that are actually editable, to list.

    onAttributesUpdate();
  };

  let content = (<></>);

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
      <Form.Item label="Voornaam" name="familyName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Adress" name="address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="AWS Identifier" name="sub" rules={[{ required: false }]}>
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
  console.log(person);

  if (formtype == FormType.CREATE && person === undefined) {
    content = (
      <>
        {basicForm(form, onCreateFinish, 'Maak aan', updateCreateFormItems)}
      </>
    );
  }

  if (formtype == FormType.UPDATE && person !== undefined) {
    const updateInitial = {
      sub: person.sub,
      email: person.email,
      address: person.address,
      givenName: person.givenName,
      familyName: person.familyName,
    };

    content = (
      <>
        {basicForm(form, onUpdateFinish, 'Opslaan', updateCreateFormItems, updateInitial)}
      </>
    );
  }

  if (formtype == FormType.READ && person !== undefined) {
    const readData = [
      { key: 'Volledige naam', value: person.getName },
      { key: 'email', value: person.email },
      { key: 'address', value: person.address },
      { key: 'AWS identifier', value: person.sub },
    ];

    content = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Table dataSource={readData} columns={readColumns} />
      </div>
    );
  }

  if (formtype == FormType.DELETE && person !== undefined) {
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

export default PersonCRUD;
