import request from '@/utils/request';

export async function getVideoByProject(params) {
  const { userId, projectId } = params;
  const response = await request(
    `http://localhost:8000/videos/all?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'GET',
    },
  );
  console.log('fetch videos', response);
  return response;
}

export async function postVideo(params) {
  const { userId, projectId, formData } = params;
  const response = await request(
    `http://localhost:8000/videos/all?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'POST',
      body: formData,
    },
  );
  console.log('upload video', response);
  return response;
}

export async function deleteVideo(params) {
  const { videoId } = params;
  const response = await request(`http://localhost:8000/videos/${videoId}`, {
    method: 'DELETE',
  });
  return response;
}

export async function getVideo(params) {
  const { videoId } = params;
  const response = await request(`http://localhost:8000/videos/${videoId}`, {
    method: 'GET',
  });
  console.log('get video detail', response);
  return response;
}
