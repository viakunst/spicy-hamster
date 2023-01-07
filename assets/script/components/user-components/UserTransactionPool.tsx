import React, { useState } from 'react';

import {
  Table, Space,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { Transaction, useGetOwnOutstandingTransactionsQuery } from '../../Api/Backend';

import GraphqlService from '../../helpers/GraphqlService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';
import { amountRender } from '../../helpers/AmountHelper';
import dateRender from '../../helpers/DateHelper';
import stateRender from '../../helpers/StateHelper';
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

function UserTransactionPool() {
  const {
    data, isLoading, isError,
  } = useGetOwnOutstandingTransactionsQuery(GraphqlService.getClient());

  const [state, setState] = useState<TransactionPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: <>empty</>,
    modelWidth: '60%',
    selectedTransaction: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  // These are the columns of the table.
  const columns: ColumnsType<Transaction> = [
    { title: 'Titel', dataIndex: 'getTitle', key: 'title' },
    { title: 'Datum', key: 'getDate', render: (_, { getDate }) => dateRender(getDate) },
    { title: 'Bedrag', key: 'amount', render: (_, { amount }) => amountRender(amount) },
    { title: 'Persoon', dataIndex: ['getPerson', 'getName'], key: 'person' },
    { title: 'Bankaccount', key: 'account', render: (_, { getTransactionGroup }) => capitalize(getTransactionGroup?.getBankAccount?.name) },
    { title: 'Status', key: 'state', render: (_, { status }) => stateRender(status) },
  ];

  const {
    searchAttribute, searchTerm,
  } = state;

  let transactions = data.getOwnOutstandingTransactions as Transaction[];
  transactions = searchFilter(transactions, searchAttribute, searchTerm);

  const searchConfigAttributes = [
    {
      name: 'Titel activiteit',
      attribute: 'getTitle',
    },
  ];

  return (
    <div>

      <div style={{ padding: 24, background: '#fbfbfb', minHeight: 100 }}>

        <div style={{ padding: 5 }}>
          <Space>
            {searchSelector(
              searchConfigAttributes,
              searchAttribute,
              (att:string | Array<string>) => setState({ ...state, searchAttribute: att }),
              (term:string) => setState({ ...state, searchTerm: term }),
            )}
          </Space>
        </div>

        <Table pagination={false} columns={columns} rowKey="id" dataSource={transactions} />

      </div>
    </div>
  );
}

export default UserTransactionPool;
