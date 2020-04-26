import React from 'react';
import { connect } from 'dva';
import { Form, Input, Row, Button } from 'antd';
import { router } from 'umi';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
  },
};

const Register = props => {
  const { dispatch } = props;
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={value => {
        console.log(value);
        console.log(dispatch);
        dispatch({
          type: 'login/signup',
          payload: {
            username: value?.user?.name,
            email: value?.user?.email,
            password: value?.password,
          },
        });
      }}
      validateMessages={validateMessages}
      style={{ width: 400, margin: 'auto' }}
    >
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} style={{ justifyContent: 'end' }}>
        <Row justify="space-around">
          <Button
            onClick={() => {
              router.goBack();
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default connect(({ login, loading }) => ({
  login,
  loading,
}))(Register);
