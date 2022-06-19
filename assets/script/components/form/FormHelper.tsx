import React from 'react';
import {
  Button, Form, FormInstance,
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

export const basicForm = (
  form: FormInstance,
  onFinish:((values:any)=> void),
  buttonName:string,
  buttonDisabledName:string,
  buttonDisable:boolean,
  formItems:any,
  initialValues?:any,
) => {
  let submitButton = (<Button type="primary" htmlType="submit" style={{ width: '100%' }}>{buttonName}</Button>);
  if (buttonDisable) {
    submitButton = (<Button type="primary" style={{ width: '100%' }} htmlType="submit" disabled>{buttonDisabledName}</Button>);
  }

  return (
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
        {submitButton}
      </Form.Item>
    </Form>
  );
};
