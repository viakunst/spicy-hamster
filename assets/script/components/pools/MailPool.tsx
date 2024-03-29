import React, { useState } from 'react';

import {
  Modal, Table, Button, Space,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import 'antd/dist/antd.css';

import { Mail, useGetMailsQuery } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import MailCRUD from '../form/CRUD/MailCRUD';
import GraphqlService from '../../helpers/GraphqlService';
import { searchFilter, searchSelector } from '../../helpers/SearchHelper';
import dateRender from '../../helpers/DateHelper';

interface MailPoolState {
  searchAttribute: string | Array<string> | null,
  searchTerm: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  modelWidth: string | number,
  selectedMail: Mail | null,
}

function MailPool() {
  const {
    data, isLoading, isError, refetch,
  } = useGetMailsQuery(GraphqlService.getClient());

  const [state, setState] = useState<MailPoolState>({
    searchAttribute: null,
    searchTerm: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelWidth: '60%',
    modelContent: (<>empty</>),
    selectedMail: null,
  });

  if (isLoading || isError || data === undefined) {
    return <span>Loading...</span>;
  }

  const handleChange = () => {
    refetch();
  };

  const openModal = async (e: MouseEvent, formType: string, mail?: Mail) => {
    let modelTitle = 'unknown';
    let modelContent = <>empty</>;
    const modelWidth = '60%';
    const modelVisible = true;

    switch (formType) {
      case FormType.CREATE:
        modelTitle = 'Maak nieuw persoon aan.';
        modelContent = (
          <MailCRUD
            formtype={FormType.CREATE}
            onAttributesUpdate={handleChange}
            mail={mail}
          />
        );
        break;
      case FormType.READ:
        modelTitle = 'Details van persoon';
        modelContent = (
          <MailCRUD
            formtype={FormType.READ}
            onAttributesUpdate={handleChange}
            mail={mail}
          />
        );
        break;
      case FormType.UPDATE:
        modelTitle = 'Bewerk persoon';
        modelContent = (
          <MailCRUD
            formtype={FormType.UPDATE}
            onAttributesUpdate={handleChange}
            mail={mail}
          />
        );
        break;
      case FormType.DELETE:
        modelTitle = 'Verwijder persoon';
        modelContent = (
          <MailCRUD
            formtype={FormType.DELETE}
            onAttributesUpdate={handleChange}
            mail={mail}
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
  const columns: ColumnsType<Mail> = [
    {
      title: 'Titel',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Ontvanger',
      dataIndex: ['recipients', 0, 'person', 'getName'],
      key: 'recipient',
    },
    {
      title: 'Datum van versturen',
      key: 'sendAt',
      render: (_, { sendAt }) => dateRender(sendAt),
    },
    {
      title: 'Verstuurd door',
      dataIndex: 'sendBy',
      key: 'sendBy',
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
            (e) => openModal(e.nativeEvent, FormType.DELETE, record)
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

  let mails = data.mails as Mail[];
  mails = searchFilter(mails, searchAttribute, searchTerm);
  console.log(mails);
  const searchConfigAttributes = [
    {
      name: 'Ontvanger',
      attribute: ['recipients', '0', 'person', 'getName'],
    },
  ];

  return (
    <div>

      <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
        <div style={{ padding: 5, background: '#fff' }}>
          <Space>
            {searchSelector(
              searchConfigAttributes,
              searchAttribute,
              (att:string | Array<string>) => setState({ ...state, searchAttribute: att }),
              (term:string) => setState({ ...state, searchTerm: term }),
            )}
          </Space>
        </div>

        <Table pagination={false} columns={columns} rowKey="id" dataSource={mails} />

        <Modal
          title={modelTitle}
          destroyOnClose
          visible={modelVisible}
          onCancel={closeModal}
          width={modelWidth}
          footer={null}
          style={{ width: 1000, minWidth: 700 }}
        >
          { modelContent }
        </Modal>

      </div>
    </div>
  );
}

export default MailPool;
