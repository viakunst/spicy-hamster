import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider, Modal, Select, Table, Input, Button,
} from 'antd';

import { Mail, GetMailsDocument } from '../../Api/Backend';
import { FormType } from '../form/FormHelper';
import MailCRUD from '../form/MailCRUD';

import 'antd/dist/antd.css';

import { ColumnsType } from 'antd/lib/table';

import GraphqlService from '../../helpers/GraphqlService';

interface MailPoolState {
  mails: Mail[] | undefined,
  searchAttribute: string | null,
  modelTitle: string,
  modelVisible: boolean,
  modelContent: JSX.Element,
  selectedMail: Mail | null,
}

export function MailPool() {
  const [state, setState] = useState<MailPoolState>({
    mails: [],
    searchAttribute: '',
    modelTitle: 'unknown',
    modelVisible: false,
    modelContent: (<></>),
    selectedMail: null,
  });

  const fetch = async () => {
    GraphqlService.getClient().request(GetMailsDocument).then((data) => {
      if (data !== undefined) {
        console.log('Succesfull fetch of Mails');
        const mails = data.mails as Mail[];
        setState({ ...state, mails });
      }
    });
  };

  // componentDidMount
  useEffect(() => {
    fetch();
  }, []);

  const handleChange = async () => {
    fetch();
  };

  const openModal = async (e: MouseEvent, formType: string, mail?: Mail) => {
    let modelTitle = 'unknown';
    let modelContent = <></>;
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
      ...state, modelVisible, modelContent, modelTitle,
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
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Details',
      key: 'action',
      render: (text, record) => (
        <>
          <span>
            <Button onClick={(e) => openModal(e.nativeEvent, FormType.READ, record)}>Details</Button>
          </span>
          <span>
            <Button onClick={(e) => openModal(e.nativeEvent, FormType.UPDATE, record)}>Bewerken</Button>
          </span>
          <span>
            <Button onClick={(e) => openModal(e.nativeEvent, FormType.DELETE, record)}>verwijderen</Button>
          </span>

        </>
      ),
    },
  ];

  console.log(state);

  const {
    mails, modelContent, modelTitle, modelVisible,
  } = state;

  return (
    <div>

      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

        <div className="row">
          <Button type="primary" onClick={(e) => openModal(e.nativeEvent, FormType.CREATE)}>
            Nieuw persoon
          </Button> | {' '}
          <Link to="/">
            <Button>
              Ga terug
            </Button>
          </Link>
        </div>

        <Table pagination={false} columns={columns} rowKey="id" dataSource={mails} />

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

export default MailPool;
