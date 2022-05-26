import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import {
  Statement, useGetStatementsQuery, GetStatementsQuery, GetStatementsDocument,
} from '../../Api/Backend';

import Icon from '@ant-design/icons';
import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';
import GraphqlService from '../../helpers/GraphqlService';

const { Search } = Input;

interface StatementPoolState {
  statements: Statement[] | undefined,
  searchAttribute: string | null,
  statementSelected: boolean,
  selectedStatement: Statement | null,
}

export function StatementPool() {
  const [state, setState] = useState<StatementPoolState>({
    statements: [],
    searchAttribute: '',
    statementSelected: false,
    selectedStatement: null,
  });

  const fetch = async () => {
    GraphqlService.getClient().request(GetStatementsDocument).then((data) => {
      if (data !== undefined) {
        console.log('Succesfull fetch of Statements');
        const statements = data.statements as Statement[];
        setState({ ...state, statements });
      }
    });
  };

  // componentDidMount
  useEffect(() => {
    fetch();
  }, []);

  const handleChange = async (userPoolId: string) => {
    fetch();
  };

  const createUser = async (e: MouseEvent) => {
    // Model with create stuff..
  };

  const exportData = async (e: MouseEvent) => {

  };

  const handleSearchAttribute = (searchAttribute:string) => {
    setState({ ...state, searchAttribute });
  };

  // These are the columns of the table.
  const columns: ColumnsType<Statement> = [
    {
      title: 'Naam',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
  ];

  console.log(columns);

  const {
    statements, selectedStatement, statementSelected,
  } = state;

  console.log(state);

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

        <div className="row">
          <Button type="primary" onClick={(e) => createUser(e.nativeEvent)}>
            Maak transactie aan.  console.log(columns);
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

        <Table pagination={false} columns={columns} rowKey="id" dataSource={statements} />
      </div>
    </div>
  );
}

export default StatementPool;
