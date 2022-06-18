import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  ContainerOutlined,
  SettingOutlined,
  MailOutlined,
} from '@ant-design/icons';

import AdminTransactionPool from '../components/admin-components/AdminTransactionPool';
import AdminMailPool from '../components/admin-components/AdminMailPool';
import AdminPersonPool from '../components/admin-components/AdminPersonPool';
import AdminStatementPool from '../components/admin-components/AdminStatementPool';
import TransactionCreator from '../components/form/TransactionCreator';
import AdminBankAccountPool from '../components/admin-components/AdminBankAccountPool';
import ReminderForm from '../components/form/ReminderForm';

const queryClient = new QueryClient();

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Personen', 'persons', <ContainerOutlined />),

  getItem('Betaalherrinneringen', 'transactions', <ContainerOutlined />, [
    getItem('Nieuwe transactie groep', 'transaction-new'),
    getItem('Per persoon', 'transaction-person'),
    getItem('Per activiteit', 'transaction-group'),
    getItem('Totaal', 'transaction-total'),
    getItem('Verstuur betaalherrinneringen', 'transaction-reminder'),
  ]),

  getItem('Declaraties', 'statements', <ContainerOutlined />),
  getItem('Emails', 'emails', <MailOutlined />),

  getItem('Instellingen', 'settings', <SettingOutlined />, [
    getItem('Bank rekenigen', 'accounts'),
  ]),

  getItem('Terug', 'back', <ContainerOutlined />),
];

const DEFAULT_OPEN = 'persons';

export default function AdminPage() {
  // Render all attributes
  const [menuState, setMenuState] = useState<string>(DEFAULT_OPEN);
  const history = useHistory();

  const onClick = ({
    item, key, keyPath, domEvent,
  }: any) => {
    if (key === 'back') {
      history.push('/');
    }
    setMenuState(key);
  };

  const subPage = () => {
    switch (menuState) {
      case 'persons':
        return <AdminPersonPool />;
      case 'transaction-new':
        return <TransactionCreator />;
      case 'transaction-reminder':
        return <ReminderForm />;
      case 'transaction-group':
        return <AdminTransactionPool mode="group" />;
      case 'transaction-person':
        return <AdminTransactionPool mode="person" />;
      case 'transaction-total':
        return <AdminTransactionPool mode="total" />;
      case 'statements':
        return <AdminStatementPool />;
      case 'emails':
        return <AdminMailPool />;
      case 'accounts':
        return <AdminBankAccountPool />;
      default:
        return <>...</>;
    }
  };

  return (
    <>
      <Menu
        defaultSelectedKeys={[DEFAULT_OPEN]}
        defaultOpenKeys={[DEFAULT_OPEN]}
        mode="horizontal"
        theme="dark"
        items={items}
        onClick={onClick}
      />

      <div className="admin card row">
        <QueryClientProvider client={queryClient}>
          {subPage()}
        </QueryClientProvider>
      </div>

    </>

  );
}
