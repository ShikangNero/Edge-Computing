// import request from '@/utils/request';
// import axios from 'axios';
import request from '@/utils/request';

// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
// export async function getFakeCaptcha(mobile) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }

export async function login(params) {
  const { username, password } = params;
  const response = await request(`http://localhost:8000/users/auth/`, {
    method: 'POST',
    body: {
      username,
      password,
      remember: true,
    },
  });
  if (response.token) {
    return { ...response, status: 'ok', type: 'account', currentAuthority: 'admin' };
  }
  return { ...response, status: 'error', type: 'account', currentAuthority: 'guest' };
  // axios
  //   .post(`${process.env.REACT_APP_API_URL}/users/auth/`, {
  //     username,
  //     password,
  //     remember: true,
  //   })
  //   .then(res => console.log(res));
}
