import React, { useEffect, useState } from 'react';

import {
  Button, Form, message, Divider, Input, Checkbox, Table, FormInstance,
} from 'antd';

export enum FormType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  READ = 'READ',
  DELETE = 'DELETE',
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export const basicForm = (form: FormInstance, onFinish:((values:any)=> void), buttonName:string, formItems:any, initialValues?:any) => (
  <Form
    labelCol={formItemLayout?.labelCol}
    wrapperCol={formItemLayout?.wrapperCol}
    form={form}
    onFinish={onFinish}
    initialValues={initialValues}
  >
    {formItems}
    <Form.Item wrapperCol={{
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    }}
    >
      <Button type="primary" htmlType="submit">{buttonName}</Button>
    </Form.Item>
  </Form>
);
