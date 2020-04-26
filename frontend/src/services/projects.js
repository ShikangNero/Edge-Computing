import request from '@/utils/request';

export async function getProjectByAccount(params) {
  const { userId } = params;
  const response = await request(`http://localhost:8000/projects/all?user_id=${userId}`, {
    method: 'GET',
  });
  console.log('get user projects', response);
  return response;
}

export async function addProject(params) {
  const { userId, title, description, type } = params;
  const response = await request(`http://localhost:8000/projects/all?user_id=${userId}`, {
    method: 'POST',
    body: {
      title,
      description,
      type,
    },
  });
  console.log('add project', response);
  return response;
}
