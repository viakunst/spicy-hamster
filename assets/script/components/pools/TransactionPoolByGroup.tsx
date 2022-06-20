import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal, Table, Button, Space, Badge,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import {
  Transaction, TransactionGroup, useGetTransactionGroupsQuery, useSwitchTransactionStatusMutation,
} from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import TransactionGroupCRUD from '../form/CRUD/TransactionGroupCRUD';
import TransactionCRUD from '../form/CRUD/TransactionCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';
import { amountRender } from '../../helpers/AmountInput';
import { dateRender } from '../../helpers/DateHelper';

interface TransactionGroupPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedTransactionGroup: TransactionGroup | null,
}

function TransactionPoolByGroup() {
  const {
    data, isLoading, isError, refetch, isFetching,
  } = useGetTransactionGroupsQuery(GraphqlService.getClient());

  const switchStatusMutation = useSwitchTransactionStatusMutation(GraphqlService.getClient());
  const [state, setState] = useState<TransactionGroupPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<>empty</>),
    selectedTransactionGroup: null,
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

  const openModal = async (
    e: MouseEvent,
    formType: string,
    transactionGroup?: TransactionGroup,
    transaction?: Transaction,
  ) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelVisible = true;

    if (transaction !== null) {
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
    }
    if (transactionGroup !== null) {
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
    }

    setState({
      ...state, modelVisible, modelContent, modelTitle,
    });
  };

  const closeModal = () => {
    setState({ ...state, modelVisible: false });
  };

  const expandedRowRender = (record:TransactionGroup) => {
    const columns: ColumnsType<Transaction> = [
      { title: 'Persoon', dataIndex: ['getPerson', 'getName'], key: 'name' },
      { title: 'Bedrag', key: 'amount', render: (_, { amount }) => amountRender(amount) },
      { title: 'Opmerking', dataIndex: 'comment', key: 'comment' },
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
              (e) => openModal(e.nativeEvent, FormType.READ, undefined, transactionRecord)
              }
            >Details
            </Button>
            <Button onClick={() => onSwitchStatus(transactionRecord)}>
              Switch Status
            </Button>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.UPDATE, undefined, transactionRecord)
              }
            >Bewerken
            </Button>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.DELETE, undefined, transactionRecord)
              }
            >verwijderen
            </Button>
          </Space>
        ),
      },
    ];

    const data = record.getTransactions as Transaction[];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  // These are the columns of the table.
  const columns: ColumnsType<TransactionGroup> = [
    {
      title: 'Naam',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Omschrijving',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Datum',
      key: 'date',
      render: (_, { date }) => dateRender(date),
    },
    {
      title: 'Bankrekening',
      dataIndex: ['getBankAccount', 'name'],
      key: 'account',
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
    modelContent, modelTitle, modelVisible, searchAttribute, searchTerm,
  } = state;

  let transactionGroups = data.transactionGroups as TransactionGroup[];
  transactionGroups = searchFilter(transactionGroups, searchAttribute, searchTerm);

  const searchConfigAttributes = [
    {
      name: 'Titel activiteit',
      attribute: 'title',
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
              Nieuwe transactie groep
            </Button>
          </Space>
        </div>

        <Table
          rowKey={(record) => record.getId}
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={transactionGroups}
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

export default TransactionPoolByGroup;
