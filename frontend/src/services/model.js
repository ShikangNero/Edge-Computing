import request from '@/utils/request';

export async function getModelsByProject(params) {
  const { userId, projectId } = params;
  const response = await request(
    `http://localhost:8000/models/all?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'GET',
    },
  );
  console.log('get models', response);
  return response;
}

export async function uploadModel(params) {
  const { userId, projectId, formData } = params;
  const response = await request(
    `http://localhost:8000/models/all?user_id=${userId}&project_id=${projectId}&method=upload`,
    {
      method: 'POST',
      body: formData,
    },
  );
  console.log('upload new model', response);
  return response;
}

export async function createModel(params) {
  // PRIMARY
  const { userId, projectId, formData } = params;
  const response = await request(
    `http://localhost:8000/models/all?user_id=${userId}&project_id=${projectId}&method=create`,
    {
      method: 'POST',
      body: formData,
    },
  );
  console.log('create new model', response);
  return response;
}

export async function deleteModel(params) {
  const { modelId } = params;
  const response = await request(`http://localhost:8000/models/${modelId} `, {
    method: 'DELETE',
  });
  console.log('delete model', response);
  return response;
}
