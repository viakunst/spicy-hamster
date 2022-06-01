import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal, Table, Button,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { TransactionGroup, useGetTransactionGroupsQuery } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import TransactionGroupCRUD from '../form/TransactionGroupCRUD';
import GraphqlService from '../../helpers/GraphqlService';

interface TransactionGroupPoolState {
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedTransactionGroup: TransactionGroup | null,
}

function TransactionGroupPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetTransactionGroupsQuery(GraphqlService.getClient());

  const [state, setState] = useState<TransactionGroupPoolState>({
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<>empty</>),
    selectedTransactionGroup: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = async () => {
    refetch();
  };

  const openModal = async (
    e: MouseEvent,
    formType: string,
    transactionGroup?: TransactionGroup,
  ) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelVisible = true;

    switch (formType) {
      case FormType.CREATE:
        modelTitle = 'Maak nieuw persoon aan.';
        modelContent = (
          <TransactionGroupCRUD
            formtype={FormType.CREATE}
            onAttributesUpdate={handleChange}
            transactionGroup={transactionGroup}
          />
        );
        break;
      case FormType.READ:
        modelTitle = 'Details van persoon';
        modelContent = (
          <TransactionGroupCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            transactionGroup={transactionGroup}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerk persoon';
        modelContent = (
          <TransactionGroupCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            transactionGroup={transactionGroup}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijder persoon';
        modelContent = (
          <TransactionGroupCRUD
            formtype={FormType.DELETE}
            onAttributesUpdate={handleChange}
            transactionGroup={transactionGroup}
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
  const columns: ColumnsType<TransactionGroup> = [
    {
      title: 'Naam',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Bedrag',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Details',
      key: 'action',
      render: (text, record) => (
        <>
          <span>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.READ, record)
              }
            >Details
            </Button>
          </span>
          <span>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.UPDATE, record)
              }
            >Bewerken
            </Button>
          </span>
          <span>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.DELETE, record)
              }
            >verwijderen
            </Button>
          </span>

        </>
      ),
    },
  ];

  const {
    modelContent, modelTitle, modelVisible,
  } = state;

  const transactionGroups = data.transactionGroups as TransactionGroup[];

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

        <Table pagination={false} columns={columns} rowKey="id" dataSource={transactionGroups} />

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

export default TransactionGroupPool;
