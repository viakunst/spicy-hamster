import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import { Statement, GetStatementsDocument } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import StatementCRUD from '../form/StatementCRUD';

import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';

import GraphqlService from '../../helpers/GraphqlService';

interface StatementPoolState {
  statements: Statement[] | undefined,
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedStatement: Statement | null,
}

export function StatementPool() {
  const [state, setState] = useState<StatementPoolState>({
    statements: [],
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<></>),
    selectedStatement: null,
  });

  const fetch = async () => {
    GraphqlService.getClient().request(GetStatementsDocument).then((data) => {
      if (data !== undefined) {
        console.log('Succesfull fetch of Statements');
        const statements = data.statements as Statement[];
        setState({ ...state, statements });
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

  const openModal = async (e: MouseEvent, formType: string, statement?: Statement) => {
    let modelTitle = 'unknown';
    let modelContent = <></>;
    const modelVisible = true;

    switch (formType) {
      case FormType.CREATE:
        modelTitle = 'Maak nieuw persoon aan.';
        modelContent = (
          <StatementCRUD
            formtype={FormType.CREATE}
            onAttributesUpdate={handleChange}
            statement={statement}
          />
        );
        break;
      case FormType.READ:
        modelTitle = 'Details van persoon';
        modelContent = (
          <StatementCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            statement={statement}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerk persoon';
        modelContent = (
          <StatementCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            statement={statement}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijder persoon';
        modelContent = (
          <StatementCRUD
            formtype={FormType.DELETE}
            onAttributesUpdate={handleChange}
            statement={statement}
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
  const columns: ColumnsType<Statement> = [
    {
      title: 'Naam',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Waarvoor',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Bedrag',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
    statements, modelContent, modelTitle, modelVisible,
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

        <Table pagination={false} columns={columns} rowKey="id" dataSource={statements} />

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

export default StatementPool;
