import { Alert, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="Invalid username or password" />
        )}

        <UserName
          name="username"
          placeholder="enter the user name"
          rules={[
            {
              required: true,
              message: 'Please enter the user name!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="enter the password"
          rules={[
            {
              required: true,
              message: 'Please enter the password!',
            },
          ]}
        />
        <Submit loading={submitting}>Login</Submit>
        <Typography.Text type="secondary">
          Don't have an account? Click
          <Link className={styles.register} to="/user/register" style={{ margin: '0 4px' }}>
            sign up
          </Link>
          for a new one
        </Typography.Text>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
