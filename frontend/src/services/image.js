import request from '@/utils/request';

export async function getCollections(params) {
  const { userId, projectId } = params;
  const response = await request(
    `http://localhost:8000/images/type?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'GET',
    },
  );
  console.log('get collections', response);
  return response;
}

export async function addImages(params) {
  const { userId, projectId, formData, type } = params;
  console.log(formData);
  const response = await request(
    `http://localhost:8000/images/${type}?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'POST',
      body: formData,
    },
  );
  console.log('add image', response);
  return response;
}

export async function updateCollection(params) {
  const { userId, projectId, oldType, newType } = params;
  const response = await request(
    `http://localhost:8000/images/${oldType}?user_id=${userId}&project_id=${projectId}&type=${newType}`,
    {
      method: 'PUT',
    },
  );
  console.log('change collection name', response);
  return response;
}

export async function deleteCollection(params) {
  const { userId, projectId, type } = params;
  const response = await request(
    `http://localhost:8000/images/${type}?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'DELETE',
    },
  );
  console.log('delete collection', response);
  return response;
}

export async function getImageByCollection(params) {
  const { userId, projectId, type } = params;
  const response = await request(
    `http://localhost:8000/images/${type}?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'GET',
    },
  );
  return response;
}

export async function getImageByVideo(params) {
  const { videoId } = params;
  const response = await request(`http://localhost:8000/images/byVideo?video_id=${videoId}`, {
    method: 'GET',
  });
  return response;
}

export async function deleteImage(params) {
  const { imageId } = params;
  const response = await request(`http://localhost:8000/images/${imageId}`, {
    method: 'DELETE',
  });
  return response;
}

export async function updateImageCollection(params) {
  const { imageId, type } = params;
  const response = await request(`http://localhost:8000/images/${imageId}?type=${type}`, {
    method: 'PUT',
  });
  return response;
}

export async function predictImages(params) {
  const { userId, projectId, files } = params;
  const response = await request(
    `http://localhost:8000/images/predict?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'POST',
      body: {
        files,
      },
    },
  );
  return response;
}
