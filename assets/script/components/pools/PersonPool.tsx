import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import { Person, GetPersonsDocument, useGetPersonsQuery } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import PersonCRUD from '../form/PersonCRUD';

import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';

import GraphqlService from '../../helpers/GraphqlService';
import { GraphQLClient } from 'graphql-request';

interface PersonPoolState {
  persons: Person[] | undefined,
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedPerson: Person | null,
}

const options = {
  onSuccess: (data: any) => {
    console.log('success call');
    console.log(data);
  },
};

export function PersonPool() {
  const req = useGetPersonsQuery(GraphqlService.getClient(), {}, options);

  const [state, setState] = useState<PersonPoolState>({
    persons: [],
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<></>),
    selectedPerson: null,
  });

  const fetch = async () => {
    GraphqlService.getClient().request(GetPersonsDocument).then((data) => {
      if (data !== undefined) {
        console.log('Succesfull fetch of persons');
        const persons = data.persons as Person[];
        setState({ ...state, persons });
      }
    });
  };

  // componentDidMount
  useEffect(() => {
    fetch();
  }, []);

  const handleChange = async () => {
    fetch();
  };

  const openModal = async (e: MouseEvent, formType: string, person?: Person) => {
    let modelTitle = 'unknown';
    let modelContent = <></>;
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
      ...state, modelVisible, modelContent, modelTitle,
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
      title: 'Details',
      key: 'action',
      render: (text, record) => (
        <>
          <span>
            <Button onClick={(e) => openModal(e.nativeEvent, FormType.READ, record)}>Details</Button>
          </span>
          <span>
            <Button onClick={(e) => openModal(e.nativeEvent, FormType.UPDATE, record)}>Bewerken</Button>
          </span>
          <span>
            <Button onClick={(e) => openModal(e.nativeEvent, FormType.DELETE, record)}>verwijderen</Button>
          </span>

        </>
      ),
    },
  ];

  console.log(state);

  const {
    persons, modelContent, modelTitle, modelVisible,
  } = state;

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

        <div className="row">
          <Button type="primary" onClick={(e) => openModal(e.nativeEvent, FormType.CREATE)}>
            Nieuw persoon
          </Button> | {' '}
          <Link to="/">
            <Button>
              Ga terug
            </Button>
          </Link>
        </div>

        <Table pagination={false} columns={columns} rowKey="id" dataSource={persons} />

        <Modal
          title={modelTitle}
          destroyOnClose
          visible={modelVisible}
          onCancel={closeModal}
          footer={null}
        >
          { modelContent }
        </Modal>

      </div>
    </div>
  );
}

export default PersonPool;
