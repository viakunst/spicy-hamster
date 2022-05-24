import React, { useEffect, useState } from 'react';

import {
  Button, Form, message, Divider, Radio,
} from 'antd';

interface AdminCreateProps {
  onAttributesUpdate: () => Promise<void>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

function AdminCreateTransaction(props:AdminCreateProps) {
  const [form] = Form.useForm();

  const {
    onAttributesUpdate,
  } = props;

  // componentDidMount
  useEffect(() => {

  }, []);

  const onFinish = async () => {
    // TO-DO: api call to back end.
  };

  const formItems = [
    <Form.Item label="Form Size" name="size">
      <Radio.Group>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
    </Form.Item>,
  ];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <div>
        <h3>Hallo, admin!</h3>
        <p> Deze functie maakt een nieuw account aan voor alle systemen
          die ViaKunst gebruikt. Let dus op; dit is niet alleen een ledenlijst,
          maar dus een lijst van volledige VK accounts.
        </p>
        <Divider />
      </div>

      <Form
        labelCol={formItemLayout?.labelCol}
        wrapperCol={formItemLayout?.wrapperCol}
        form={form}
        onFinish={onFinish}
      >
        {formItems}
        <Form.Item wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        }}
        >
          <Button type="primary" htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminCreateTransaction;
