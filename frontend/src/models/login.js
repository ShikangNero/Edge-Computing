import { stringify } from 'querystring';
import { router } from 'umi';
import { login, register } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *signup({ payload }, { call }) {
      console.log('signup');
      const response = yield call(register, payload);
      if (response && response !== undefined && response.id) {
        message.success('Account registered successfully');
        router.push('/user/login');
      }
    },

    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'ok') {
        router.push('/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      console.log('cookie', document.cookie);
      document.cookie = 'token=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'userId=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      console.log('cookie', document.cookie);
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      if (payload.token) {
        const date = new Date();
        date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
        const expires = `; expires=${date.toUTCString()}`;
        document.cookie = `token=${payload.token}${expires}; path=/`;
        document.cookie = `userId=${payload.user_id}${expires}; path=/`;
      }

      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
