import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal, Table, Button, Space,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { BankAccount, useGetBankAccountsQuery } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import BankAccountCRUD from '../form/BankAccountCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import OidcService from '../../helpers/OidcService';

interface BankAccountPoolState {
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedBankAccount: BankAccount | null,
}

function BankAccountPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetBankAccountsQuery(GraphqlService.getClient());

  const [state, setState] = useState<BankAccountPoolState>({
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<>empty</>),
    selectedBankAccount: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = async () => {
    console.log('refetching');
    refetch();

    setState({ ...state, modelVisible: false });
  };

  const openModal = async (e: MouseEvent, formType: string, bankaccount?: BankAccount) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
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
        modelTitle = 'Details van bankrekening';
        modelContent = (
          <BankAccountCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            bankaccount={bankaccount}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerk bankrekening';
        modelContent = (
          <BankAccountCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            bankaccount={bankaccount}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijder bankrekening';
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
      ...state, modelVisible, modelContent, modelTitle,
    });
  };

  const closeModal = () => {
    setState({ ...state, modelVisible: false });
  };

  // These are the columns of the table.
  const columns: ColumnsType<BankAccount> = [
    {
      title: 'Naam',
      dataIndex: 'name',
      key: 'name',
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
        <>
          <span>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.READ, record)
              }
            >Details
            </Button>
          </span>
          <span>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.UPDATE, record)
              }
            >Bewerken
            </Button>
          </span>
          <span>
            <Button onClick={
              (e) => openModal(e.nativeEvent, FormType.DELETE, record)
              }
            >Verwijderen
            </Button>
          </span>

        </>
      ),
    },
  ];

  const {
    modelContent, modelTitle, modelVisible,
  } = state;

  const bankaccounts = data.bankAccounts as BankAccount[];

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <div style={{ padding: 5, background: '#fff' }}>
          <Space>
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
