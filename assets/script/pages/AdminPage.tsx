import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  SettingOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import AdminTransactionPool from '../components/admin-components/AdminTransactionPool';
import AdminTransactionGroupPool from '../components/admin-components/AdminTransactionGroupPool';
import AdminMailPool from '../components/admin-components/AdminMailPool';
import AdminPersonPool from '../components/admin-components/AdminPersonPool';
import AdminStatementPool from '../components/admin-components/AdminStatementPool';
import TransactionGroupPool from '../components/pools/TransactionGroupPool';

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
    getItem('Per activiteit', 'group'),
    getItem('Totaal', 'total'),
  ]),

  getItem('Declaraties', 'statements', <ContainerOutlined />),
  getItem('Emails', 'emails', <MailOutlined />),

  getItem('Instellingen', 'settings', <SettingOutlined />, [
    getItem('Bank rekenigen', 'acounts'),
  ]),
];

const DEFAULT_OPEN = 'persons';

export default function AdminPage() {
  // Render all attributes
  const [menuState, setMenuState] = useState<string>(DEFAULT_OPEN);

  const onClick = ({
    item, key, keyPath, domEvent,
  }: any) => {
    setMenuState(key);
  };

  const subPage = () => {
    switch (menuState) {
      case 'persons':
        return <AdminPersonPool />;
      case 'group':
        return <AdminTransactionGroupPool />;
      case 'total':
        return <AdminTransactionPool />;
      case 'statements':
        return <AdminStatementPool />;
      case 'emails':
        return <AdminMailPool />;
      case 'account':
        return <>...</>;
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
