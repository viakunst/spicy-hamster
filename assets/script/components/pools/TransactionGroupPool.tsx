import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import { TransactionGroup, GetTransactionGroupsDocument } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import TransactionGroupCRUD from '../form/TransactionGroupCRUD';

import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';

import GraphqlService from '../../helpers/GraphqlService';

interface TransactionGroupPoolState {
  transactionGroups: TransactionGroup[] | undefined,
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedTransactionGroup: TransactionGroup | null,
}

export function TransactionGroupPool() {
  const [state, setState] = useState<TransactionGroupPoolState>({
    transactionGroups: [],
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<></>),
    selectedTransactionGroup: null,
  });

  const fetch = async () => {
    GraphqlService.getClient().request(GetTransactionGroupsDocument).then((data) => {
      if (data !== undefined) {
        console.log('Succesfull fetch of TransactionGroups');
        const transactionGroups = data.transactionGroups as TransactionGroup[];
        setState({ ...state, transactionGroups });
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

  const openModal = async (e: MouseEvent, formType: string, transactionGroup?: TransactionGroup) => {
    let modelTitle = 'unknown';
    let modelContent = <></>;
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
    transactionGroups, modelContent, modelTitle, modelVisible,
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
