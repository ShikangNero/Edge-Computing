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

export async function deleteProject(params) {
  const { projectId } = params;
  const response = await request(`http://localhost:8000/projects/${projectId}`, {
    method: 'DELETE',
  });
  console.log('delete project', response);
  return response;
}

export async function getProjectDetail(params) {
  const { projectId } = params;
  const response = await request(`http://localhost:8000/projects/${projectId}`, {
    method: 'GET',
  });
  console.log('get project detail', response);
  return response;
}

export async function updateProjectDescription(params) {
  const { projectId, description } = params;
  const response = await request(
    `http://localhost:8000/projects/${projectId}?description=${description}`,
    {
      method: 'PUT',
    },
  );
  console.log('update project description', response);
  return response;
}
