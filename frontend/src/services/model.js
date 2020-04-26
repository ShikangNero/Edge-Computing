import request from '@/utils/request';

export async function getModelsByProject(params) {
  const { userId, projectId } = params;
  const response = await request(
    `http://localhost:8000/models/all?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'GET',
    },
  );
  return response;
}

export async function uploadModel(params) {
  const { userId, projectId, type, files, description, title } = params;
  const response = await request(
    `http://localhost:8000/models/all?user_id=${userId}&project_id=${projectId}&method=upload`,
    {
      method: 'POST',
      body: {
        title,
        description,
        type, // model type
        files, // files[0]: h5, files[1]: txt label
      },
    },
  );
  return response;
}

export async function createModel(params) {
  // PRIMARY
  const { userId, projectId, type, files, description, title } = params;
  const response = await request(
    `http://localhost:8000/models/all?user_id=${userId}&project_id=${projectId}&method=create`,
    {
      method: 'POST',
      body: {
        title,
        description,
        type, // model type
        files, // list. python file
      },
    },
  );
  return response;
}

export async function deleteModel(params) {
  const { modelId } = params;
  const response = await request(`http://localhost:8000/models/${modelId} `, {
    method: 'DELETE',
  });
  return response;
}
