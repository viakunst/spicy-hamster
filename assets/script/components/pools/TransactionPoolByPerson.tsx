import React, { useState } from 'react';
import {
  Modal, Table, Button, Space, Badge,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import {
  PersonTransactions, Transaction, useGetAllTransactionsCoupledWithPersonQuery, useSwitchTransactionStatusMutation,
} from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import TransactionCRUD from '../form/CRUD/TransactionCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';
import { amountRender } from '../../helpers/AmountInput';
import { dateRender } from '../../helpers/DateHelper';

interface TransactionPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedTransaction: Transaction | null,
}

function TransactionPoolByPerson() {
  const {
    data, isLoading, isError, refetch, isFetching,
  } = useGetAllTransactionsCoupledWithPersonQuery(GraphqlService.getClient());
  const switchStatusMutation = useSwitchTransactionStatusMutation(GraphqlService.getClient());

  const [state, setState] = useState<TransactionPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: <>empty</>,
    selectedTransaction: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = () => {
    refetch();
  };

  if (switchStatusMutation.isSuccess) {
    switchStatusMutation.reset();
    refetch();
  }

  const onSwitchStatus = async (transaction : any) => {
    if (transaction.status !== 'Loading' && switchStatusMutation.isLoading === false && isFetching === false) {
      switchStatusMutation.mutate({ id: transaction.getId });
      transaction.status = 'Loading';
    }
  };

  const openModal = async (e: MouseEvent, formType: string, transaction?: Transaction) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
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

  const expandedRowRender = (record:PersonTransactions) => {
    const columns: ColumnsType<Transaction> = [
      { title: 'Titel', dataIndex: 'getTitle', key: 'title' },
      { title: 'Datum', key: 'date', render: (_, { getDate }) => dateRender(getDate) },
      { title: 'Bedrag', key: 'amount', render: (_, { amount }) => amountRender(amount) },
      { title: 'Bankaccount', dataIndex: ['getTransactionGroup', 'getBankAccount', 'name'], key: 'account' },
      {
        title: 'Status',
        key: 'state',
        render: (_, { status }) => {
          if (status === 'Openstaand') {
            return (<span><Badge status="error" />Openstaand</span>);
          }
          if (status === 'Loading') {
            return (<span><Badge status="warning" />Laden</span>);
          }
          if (status === 'Voldaan') {
            return (<span><Badge status="success" />Voldaan</span>);
          }
          return (<span><Badge status="warning" />Onbekend</span>);
        },
      },
      {
        title: 'Details',
        key: 'action',
        render: (text, transactionRecord) => (
          <Space>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.READ, transactionRecord)
              }
            >Details
            </Button>
            <Button onClick={() => onSwitchStatus(transactionRecord)}>
              Switch status
            </Button>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.UPDATE, transactionRecord)
              }
            >Bewerken
            </Button>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.DELETE, transactionRecord)
              }
            >verwijderen
            </Button>
          </Space>
        ),
      },
    ];

    const data = record.transactions as Transaction[];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const closeModal = () => {
    setState({ ...state, modelVisible: false });
  };

  // These are the columns of the table.
  const columns: ColumnsType<PersonTransactions> = [
    {
      title: 'Persoon',
      dataIndex: ['person', 'getName'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['person', 'email'],
      key: 'email',
    },

  ];

  const {
    modelContent, modelTitle, modelVisible, searchAttribute, searchTerm,
  } = state;

  let personTransactions = data.getAllTransactionsCoupledWithPerson as PersonTransactions[];
  personTransactions = searchFilter(personTransactions, searchAttribute, searchTerm);

  const searchConfigAttributes = [
    {
      name: 'Volledige naam',
      attribute: ['person', 'getName'],
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
              (searchAttribute:string | Array<string>) => setState({ ...state, searchAttribute }),
              (searchTerm:string) => setState({ ...state, searchTerm }),
            )}
            <Button type="primary" onClick={(e) => openModal(e.nativeEvent, FormType.CREATE)}>
              Nieuwe transactie
            </Button>
          </Space>
        </div>

        <Table
          rowKey={(record) => record.person.getId}
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={personTransactions}
          pagination={false}
        />

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

export default TransactionPoolByPerson;
