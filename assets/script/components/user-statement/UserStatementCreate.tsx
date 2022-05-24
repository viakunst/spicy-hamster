import React, { useContext, useState, useEffect } from 'react';
import { UserData } from 'react-oidc';
import {
  Button, Form, message, Radio,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 8, offset: 0 },
    sm: { span: 8, offset: 0 },
  },
  wrapperCol: {
    xs: { span: 30, offset: 0 },
    sm: { span: 30, offset: 0 },
  },
};

interface UserStatementProps {
  onAttributesUpdate: () => Promise<void>;
}

export default function UserStatementCreate(props:UserStatementProps) {
  const [form] = Form.useForm();
  const userData = useContext(UserData);

  // componentDidMount
  useEffect(() => {

  }, []);

  // flush to form. Placeholder thing now.
  const formItems = [
    <Form.Item label="Form Size" name="size">
      <Radio.Group>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
    </Form.Item>,
  ];

  const onFinish = async () => {
    // TO-DO comm with backend.
  };

  return (
    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
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
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
