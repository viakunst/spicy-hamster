import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal, Table, Button, Space,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { BankAccount, useGetBankAccountsQuery } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import BankAccountCRUD from '../form/CRUD/BankAccountCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import OidcService from '../../helpers/OidcService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';

interface BankAccountPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  modelWidth: string | number,
  selectedBankAccount: BankAccount | null,
}

function BankAccountPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetBankAccountsQuery(GraphqlService.getClient());

  const [state, setState] = useState<BankAccountPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<>empty</>),
    modelWidth: '60%',
    selectedBankAccount: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = () => {
    console.log('refetching');
    refetch();

    setState({ ...state, modelVisible: false });
  };

  const openModal = async (e: MouseEvent, formType: string, bankaccount?: BankAccount) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelWidth = '60%';
    const modelVisible = true;

    console.log(bankaccount);
    switch (formType) {
      case FormType.CREATE:
        modelTitle = 'Maak nieuwe bankrekening aan.';
        modelContent = (
          <BankAccountCRUD
            formtype={FormType.CREATE}
            onAttributesUpdate={handleChange}
            bankaccount={bankaccount}
          />
        );
        break;
      case FormType.READ:
        modelTitle = 'Details van bankrekening.';
        modelContent = (
          <BankAccountCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            bankaccount={bankaccount}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerkem van de bankrekening.';
        modelContent = (
          <BankAccountCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            bankaccount={bankaccount}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijderen van de bankrekening.';
        modelContent = (
          <BankAccountCRUD
            formtype={FormType.DELETE}
            onAttributesUpdate={handleChange}
            bankaccount={bankaccount}
          />
        );
        break;
      default:
        console.log('error');
        break;
    }

    setState({
      ...state, modelVisible, modelContent, modelTitle, modelWidth,
    });
  };

  const closeModal = () => {
    setState({ ...state, modelVisible: false });
  };

  // These are the columns of the table.
  const columns: ColumnsType<BankAccount> = [
    {
      title: 'Naam van de rekening',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Manager van de rekening',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'IBAN',
      dataIndex: 'IBAN',
      key: 'IBAN',
    },
    {
      title: 'Details',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button onClick={
            (e) => openModal(e.nativeEvent, FormType.UPDATE, record)
            }
          >Bewerken
          </Button>
          <Button onClick={
            (e) => openModal(e.nativeEvent, FormType.DELETE, record)
            }
          >Verwijderen
          </Button>
        </Space>
      ),
    },
  ];

  const {
    modelContent, modelTitle, modelVisible, modelWidth, searchAttribute, searchTerm,
  } = state;

  let bankaccounts = data.bankAccounts as BankAccount[];
  bankaccounts = searchFilter(bankaccounts, searchAttribute, searchTerm);

  const searchConfigAttributes = [
    {
      name: 'Naam',
      attribute: 'name',
    },
    {
      name: 'Manager',
      attribute: 'manager',
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
              Nieuwe bankrekening
            </Button>
          </Space>
        </div>

        <Table pagination={false} columns={columns} rowKey="id" dataSource={bankaccounts} />

        <Modal
          title={modelTitle}
          destroyOnClose
          visible={modelVisible}
          width={modelWidth}
          onCancel={closeModal}
          footer={null}
        >
          { modelContent }
        </Modal>

      </div>
    </div>
  );
}

export default BankAccountPool;
