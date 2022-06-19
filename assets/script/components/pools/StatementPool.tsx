import React, { useState } from 'react';
import {
  Modal, Table, Button, Space,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { Statement, useGetStatementsQuery } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import StatementCRUD from '../form/CRUD/StatementCRUD';
import GraphqlService from '../../helpers/GraphqlService';

interface StatementPoolState {
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedStatement: Statement | null,
}

function StatementPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetStatementsQuery(GraphqlService.getClient());

  const [state, setState] = useState<StatementPoolState>({
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<>empty</>),
    selectedStatement: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = () => {
    refetch();
  };

  const openModal = async (e: MouseEvent, formType: string, statement?: Statement) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
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
    modelContent, modelTitle, modelVisible,
  } = state;

  const statements = data.statements as Statement[];

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

        <Space>
          <Button type="primary" onClick={(e) => openModal(e.nativeEvent, FormType.CREATE)}>
            Nieuwe declaratie
          </Button>
        </Space>

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
