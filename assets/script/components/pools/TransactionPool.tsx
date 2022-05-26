import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import { Transaction, GetTransactionsDocument } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import TransactionCRUD from '../form/TransactionCRUD';

import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';

import GraphqlService from '../../helpers/GraphqlService';

interface TransactionPoolState {
  transactions: Transaction[] | undefined,
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedTransaction: Transaction | null,
}

export function TransactionPool() {
  const [state, setState] = useState<TransactionPoolState>({
    transactions: [],
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<></>),
    selectedTransaction: null,
  });

  const fetch = async () => {
    GraphqlService.getClient().request(GetTransactionsDocument).then((data) => {
      if (data !== undefined) {
        console.log('Succesfull fetch of Transactions');
        const transactions = data.transactions as Transaction[];
        setState({ ...state, transactions });
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

  const openModal = async (e: MouseEvent, formType: string, transaction?: Transaction) => {
    let modelTitle = 'unknown';
    let modelContent = <></>;
    const modelVisible = true;

    switch (formType) {
      case FormType.CREATE:
        modelTitle = 'Maak nieuw persoon aan.';
        modelContent = (
          <TransactionCRUD
            formtype={FormType.CREATE}
            onAttributesUpdate={handleChange}
            transaction={transaction}
          />
        );
        break;
      case FormType.READ:
        modelTitle = 'Details van persoon';
        modelContent = (
          <TransactionCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            transaction={transaction}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerk persoon';
        modelContent = (
          <TransactionCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            transaction={transaction}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijder persoon';
        modelContent = (
          <TransactionCRUD
            formtype={FormType.DELETE}
            onAttributesUpdate={handleChange}
            transaction={transaction}
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
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Opmerking',
      dataIndex: 'comment',
      key: 'comment',
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
    transactions, modelContent, modelTitle, modelVisible,
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

        <Table pagination={false} columns={columns} rowKey="id" dataSource={transactions} />

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

export default TransactionPool;
