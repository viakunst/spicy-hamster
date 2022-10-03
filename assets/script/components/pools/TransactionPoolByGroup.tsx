import React, { useState } from 'react';

import {
  Modal, Table, Button, Space,
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
import { amountRender } from '../../helpers/AmountHelper';
import dateRender from '../../helpers/DateHelper';
import stateRender from '../../helpers/StateHelper';
import capitalize from '../../helpers/StringHelper';

interface TransactionGroupPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  modelWidth: string | number,
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
    modelWidth: '60%',
    selectedTransactionGroup: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = () => {
    closeModal();
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

  const openTransactionModal = async (
    e: MouseEvent,
    formType: string,
    transaction?: Transaction,
  ) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelWidth = '60%';
    const modelVisible = true;

    if (transaction !== null) {
      switch (formType) {
        case FormType.CREATE:
          modelTitle = 'Maak nieuwe transactie aan.';
          modelContent = (
            <TransactionCRUD
              formtype={FormType.CREATE}
              onAttributesUpdate={handleChange}
              transaction={transaction}
            />
          );
          break;
        case FormType.READ:
          modelTitle = 'Details van een transactie';
          modelContent = (
            <TransactionCRUD
              formtype={FormType.READ}
              onAttributesUpdate={handleChange}
              transaction={transaction}
            />
          );
          break;
        case FormType.UPDATE:
          modelTitle = 'Bewerken van een transactie';
          modelContent = (
            <TransactionCRUD
              formtype={FormType.UPDATE}
              onAttributesUpdate={handleChange}
              transaction={transaction}
            />
          );
          break;
        case FormType.DELETE:
          modelTitle = 'Verwijderen van een transactie';
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

    setState({
      ...state, modelVisible, modelContent, modelTitle, modelWidth,
    });
  };

  const openTransactionGroupModal = async (
    e: MouseEvent,
    formType: string,
    transactionGroup?: TransactionGroup,
  ) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelWidth = '60%';
    const modelVisible = true;

    if (transactionGroup !== null) {
      switch (formType) {
        case FormType.CREATE:
          modelTitle = 'Maak nieuwe transactie groep aan';
          modelContent = (
            <TransactionGroupCRUD
              formtype={FormType.CREATE}
              onAttributesUpdate={handleChange}
              transactionGroup={transactionGroup}
            />
          );
          break;
        case FormType.READ:
          modelTitle = 'Details van een transactie groep';
          modelContent = (
            <TransactionGroupCRUD
              formtype={FormType.READ}
              onAttributesUpdate={handleChange}
              transactionGroup={transactionGroup}
            />
          );
          break;
        case FormType.UPDATE:
          modelTitle = 'Bewerken van een transactie groep';
          modelContent = (
            <TransactionGroupCRUD
              formtype={FormType.UPDATE}
              onAttributesUpdate={handleChange}
              transactionGroup={transactionGroup}
            />
          );
          break;
        case FormType.DELETE:
          modelTitle = 'Verwijderen van een transactie groep';
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
      ...state, modelVisible, modelContent, modelTitle, modelWidth,
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
      { title: 'Status', key: 'state', render: (_, { status }) => stateRender(status) },
      {
        title: 'Details',
        key: 'action',
        render: (text, transactionRecord) => (
          <Space>
            <Button onClick={
              (e) => openTransactionModal(e.nativeEvent, FormType.READ, transactionRecord)
              }
            >Details
            </Button>
            <Button onClick={() => onSwitchStatus(transactionRecord)}>
              Switch Status
            </Button>
            <Button onClick={
              (e) => openTransactionModal(e.nativeEvent, FormType.UPDATE, transactionRecord)
              }
            >Bewerken
            </Button>
            <Button onClick={
              (e) => openTransactionModal(e.nativeEvent, FormType.DELETE, transactionRecord)
              }
            >verwijderen
            </Button>
          </Space>
        ),
      },
    ];

    const tranactionData = record.getTransactions as Transaction[];
    return <Table columns={columns} dataSource={tranactionData} pagination={false} />;
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
      key: 'account',
      render: (_, { getBankAccount }) => capitalize(getBankAccount?.name),
    },
    {
      title: 'Details',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button onClick={
            (e) => openTransactionGroupModal(e.nativeEvent, FormType.UPDATE, record)
            }
          >Bewerken
          </Button>
          <Button onClick={
            (e) => openTransactionGroupModal(e.nativeEvent, FormType.DELETE, record)
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
              (att:string | Array<string>) => setState({ ...state, searchAttribute: att }),
              (term:string) => setState({ ...state, searchTerm: term }),
            )}
            <Button type="primary" onClick={(e) => openTransactionGroupModal(e.nativeEvent, FormType.CREATE)}>
              Nieuwe transactie groep
            </Button>
            <Button type="primary" onClick={(e) => openTransactionModal(e.nativeEvent, FormType.CREATE)}>
              Nieuwe transactie
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
          width={modelWidth}
          footer={null}
        >
          { modelContent }
        </Modal>

      </div>
    </div>
  );
}

export default TransactionPoolByGroup;
