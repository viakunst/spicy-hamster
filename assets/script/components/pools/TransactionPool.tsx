import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import Icon from '@ant-design/icons';
import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';

import GraphqlService from '../../helpers/OidcService';

const { Search } = Input;

// Use interface or the graphql backend.ts code.
interface Transaction {

}

interface TransactionPoolState {
  transactions: Transaction[] | undefined,
  searchAttribute: string | null,
  transactionSelected: boolean,
  selectedTransaction: Transaction | null,
}

export function TransactionPool() {
  const [state, setState] = useState<TransactionPoolState>({
    transactions: [],
    searchAttribute: '',
    transactionSelected: false,
    selectedTransaction: null,
  });

  const fetchTransaction = async () => {
    // Use GraphqlService to fill this function.
  };

  // componentDidMount
  useEffect(() => {
    // Get config (optional)
    // Get transactions.
  }, []);

  const handleChange = async (userPoolId: string) => {
    // Refetch transaction and other stuff.
  };

  const createUser = async (e: MouseEvent) => {
    // Model with create stuff..
  };

  const exportData = async (e: MouseEvent) => {
    // Might be useful someday.

    /*
    const {
      activeUserPool,
    } = state;
    e.preventDefault();
    if (activeUserPool) {
      AttributeConfigParser.resolve(attributeConfig, ConfigContext.ADMIN_READ).then(
        async (config) => {
          const users = await activeUserPool.listUsers();

          // create csv file
          const data = [
            config.map((attr) => attr.view({}).title),
            ...users.map((user) => config.map((attr) => user.userAttributes[attr.attribute] ?? '')),
          ];

          // create csv file
          let csv = '';
          data.forEach((row) => {
            csv += `${row.join(',')}\n`;
          });

          // create file download
          const a = document.createElement('a');
          a.download = 'users.csv';
          a.rel = 'noopener';
          a.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
          setTimeout(() => { a.dispatchEvent(new MouseEvent('click')); }, 0);
        },
      );
    }
    */
  };

  const handleSearchAttribute = (searchAttribute:string) => {
    setState({ ...state, searchAttribute });
  };

  const searchField = (name: string, attribute: string) => (
    <Select
      key={attribute ?? ''}
      value={attribute ?? ''}
    >
      {name}
    </Select>
  );

  const onSearch = async (value:string) => {
    // fetch transaction with query string.
  };

  const searchSelector = () => {
    const { searchAttribute } = state;

    // implement config search fields someday.

    /*
    // No searchable fields.
    if (searchConfigInst.configAttributes.length === 0) {
      return (<></>);
    }

    if (searchAttribute?.length === 0) {
      handleSearchAttribute(searchConfigInst.configAttributes[0].attribute);
    }

    // One searchable field.
    if (searchConfigInst.configAttributes.length === 1) {
      return (
        <Search placeholder="Zoek" allowClear onSearch={onSearch} style={{ width: 200 }} />
      );
    }

    // Multiple Searchable fields.
    return (
      <>
        <Select
          defaultValue={searchConfigInst.configAttributes[0].attribute}
          placeholder="Zoekveld"
          style={{ width: 200, marginBottom: 10 }}
          onChange={handleSearchAttribute}
        >
          { searchConfigInst.configAttributes.map((att) => searchField(att.name, att.attribute))}
        </Select>
        <Search placeholder="Zoek" allowClear onSearch={onSearch} style={{ width: 200 }} /> | {' '}
      </>
    ); */
  };

  // These are the columns of the table.
  const columns: ColumnsType<Transaction> = [
    // Fill these correctly.
  ];

  const {
    transactions, selectedTransaction, transactionSelected,
  } = state;

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

        <div className="row">
          {searchSelector()}
          <Button type="primary" onClick={(e) => createUser(e.nativeEvent)}>
            Maak transactie aan.
          </Button> | {' '}
          <Button onClick={(e) => exportData(e.nativeEvent)}>
            Exporteer transactie
          </Button> | {' '}
          <Link to="/">
            <Button>
              Ga terug
            </Button>
          </Link>
        </div>

        <Table pagination={false} columns={columns} dataSource={transactions} />
      </div>
    </div>
  );
}

export default TransactionPool;
