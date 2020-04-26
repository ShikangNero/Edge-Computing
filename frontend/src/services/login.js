import request from '@/utils/request';

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
  if (response && response !== undefined && response.token) {
    return { ...response, status: 'ok', type: 'account', currentAuthority: 'admin' };
  }
  return { ...response, status: 'error', type: 'account', currentAuthority: 'guest' };
}

export async function register(params) {
  const { username, password, email } = params;
  const response = await request(`http://localhost:8000/users/`, {
    method: 'POST',
    body: {
      username,
      password,
      email,
    },
  });
  console.log('register', response);
  return response;
}
