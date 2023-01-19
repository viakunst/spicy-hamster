import React, { useState, useReducer } from 'react';

import {
  Modal, Table, Button, Space,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import {
  Transaction, TransactionGroup, useGetTransactionsQuery, useSwitchTransactionStatusMutation,
} from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import TransactionCRUD from '../form/CRUD/TransactionCRUD';
import TransactionGroupCRUD from '../form/CRUD/TransactionGroupCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';
import { amountRender } from '../../helpers/AmountHelper';
import dateRender from '../../helpers/DateHelper';
import stateRender, { switchState, LOADING, transactionIsLoading } from '../../helpers/StateHelper';
import capitalize from '../../helpers/StringHelper';

interface TransactionPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  modelWidth: string | number,
  selectedTransaction: Transaction | null,
}

function TransactionPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetTransactionsQuery(GraphqlService.getClient());

  const switchStatusMutation = useSwitchTransactionStatusMutation(GraphqlService.getClient());

  const [state, setState] = useState<TransactionPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: <>empty</>,
    modelWidth: '60%',
    selectedTransaction: null,
  });
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const closeModal = () => {
    setState({ ...state, modelVisible: false });
  };

  const handleChange = () => {
    closeModal();
    refetch();
  };

  const onSwitchStatus = async (transaction : any) => {
    const oldStatus = transaction.status;
    const succesStatus = switchState(oldStatus);
    if (!transactionIsLoading(transaction)) {
      try {
        transaction.status = LOADING;
        forceUpdate();
        await switchStatusMutation.mutateAsync({ id: transaction.getId });
      } catch (error) {
        console.error(error);
        transaction.status = oldStatus;
        forceUpdate();
      } finally {
        transaction.status = succesStatus;
        forceUpdate();
      }
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

  // These are the columns of the table.
  const columns: ColumnsType<Transaction> = [
    { title: 'Titel', dataIndex: 'getTitle', key: 'title' },
    { title: 'Datum', key: 'getDate', render: (_, { getDate }) => dateRender(getDate) },
    { title: 'Bedrag', key: 'amount', render: (_, { amount }) => amountRender(amount) },
    { title: 'Persoon', dataIndex: ['getPerson', 'getName'], key: 'person' },
    { title: 'Bankaccount', key: 'account', render: (_, { getTransactionGroup }) => capitalize(getTransactionGroup?.getBankAccount?.name) },
    {
      title: 'Status', key: 'state', width: '10%', render: (_, { status }) => stateRender(status),
    },
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
          <Button
            onClick={() => onSwitchStatus(transactionRecord)}
            disabled={transactionIsLoading(transactionRecord.status)}
          >
            Switch status
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

  const {
    modelContent, modelTitle, modelVisible, modelWidth, searchAttribute, searchTerm,
  } = state;

  let transactions = data.transactions as Transaction[];
  transactions = searchFilter(transactions, searchAttribute, searchTerm);

  const searchConfigAttributes = [
    {
      name: 'Titel activiteit',
      attribute: 'getTitle',
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

        <Table pagination={false} columns={columns} rowKey="id" dataSource={transactions} />

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

export default TransactionPool;
