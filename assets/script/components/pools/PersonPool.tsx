import React, { useState } from 'react';

import {
  Modal, Table, Button, Space, message,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { Person, useGetPersonsQuery, useImportPersonMutation } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import PersonCRUD from '../form/CRUD/PersonCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';
import capitalize from '../../helpers/StringHelper';

import OidcService from '../../helpers/OidcService';

interface PersonPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelWidth: string | number,
  modelContent: JSX.Element,
  selectedPerson: Person | null,
}

function PersonPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetPersonsQuery(GraphqlService.getClient());

  const importMutation = useImportPersonMutation(GraphqlService.getClient());

  const [state, setState] = useState<PersonPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelWidth: '80%',
    modelContent: (<>empty</>),
    selectedPerson: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  let disabled = false;
  if (importMutation.isLoading || importMutation.isLoading) {
    disabled = true;
  }

  if (importMutation.isSuccess) {
    importMutation.reset();
    message.success('Import van personen succesvol.');
    refetch();
  }

  if (importMutation.isError) {
    importMutation.reset();
    message.error('Er is iets fout gegaan.');
  }

  const handleChange = () => {
    closeModal();
    refetch();
  };

  const importPerson = async () => {
    const tok = OidcService.getIdToken();
    console.log(importMutation.data);
    if (tok !== null) {
      importMutation.mutate({ token: tok });
    }
  };

  const openModal = async (e: MouseEvent, formType: string, person?: Person) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelWidth = '60%';
    const modelVisible = true;

    console.log(person);
    switch (formType) {
      case FormType.CREATE:
        modelTitle = 'Maak nieuw persoon aan.';
        modelContent = (
          <PersonCRUD
            formtype={FormType.CREATE}
            onAttributesUpdate={handleChange}
            person={person}
          />
        );
        break;
      case FormType.READ:
        modelTitle = 'Details van persoon';
        modelContent = (
          <PersonCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            person={person}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerk persoon';
        modelContent = (
          <PersonCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            person={person}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijder persoon';
        modelContent = (
          <PersonCRUD
            formtype={FormType.DELETE}
            onAttributesUpdate={handleChange}
            person={person}
          />
        );
        break;
      default:
        console.log('error');
        break;
    }

    setState({
      ...state, modelVisible, modelContent, modelTitle, modelWidth,
    });
  };

  const closeModal = () => {
    setState({ ...state, modelVisible: false });
  };

  // These are the columns of the table.
  const columns: ColumnsType<Person> = [
    {
      title: 'Naam',
      dataIndex: 'getName',
      key: 'getName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      key: 'role',
      render: (_, { role }) => capitalize(role),
    },
    {
      title: 'Details',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button onClick={
            (e) => openModal(e.nativeEvent, FormType.READ, record)
            }
          >Details
          </Button>
          <Button onClick={
            (e) => openModal(e.nativeEvent, FormType.UPDATE, record)
            }
          >Bewerken
          </Button>
          <Button onClick={
            (e) => openModal(e.nativeEvent, FormType.DELETE, record)
            }
          >verwijderen
          </Button>
        </Space>
      ),
    },
  ];

  const {
    modelContent, modelTitle, modelVisible, modelWidth, searchAttribute, searchTerm,
  } = state;

  let persons = data.persons as Person[];
  persons = searchFilter(persons, searchAttribute, searchTerm);

  const searchConfigAttributes = [
    {
      name: 'Volledige naam',
      attribute: 'getName',
    },
  ];

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

        <div style={{ padding: 5, background: '#fff' }}>
          <Space>
            {searchSelector(
              searchConfigAttributes,
              searchAttribute,
              (att:string | Array<string>) => setState({ ...state, searchAttribute: att }),
              (term:string) => setState({ ...state, searchTerm: term }),
            )}
            <Button type="primary" onClick={(e) => openModal(e.nativeEvent, FormType.CREATE)}>
              Nieuw persoon
            </Button>
            <Button type="primary" onClick={() => importPerson()}>
              Importeer
            </Button>
          </Space>
        </div>

        <Table pagination={false} columns={columns} rowKey="id" dataSource={persons} />

        <Modal
          title={modelTitle}
          destroyOnClose
          visible={modelVisible}
          onCancel={closeModal}
          width={modelWidth}
          footer={null}
        >
          { modelContent }
        </Modal>

      </div>
    </div>
  );
}

export default PersonPool;
