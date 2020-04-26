import request from '@/utils/request';

export async function getVideoByProject(params) {
  const { userId, projectId } = params;
  const response = await request(
    `http://localhost:8000/videos/all?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'GET',
    },
  );
  return response;
}

export async function postVideo(params) {
  const { userId, projectId, model_id, interval, file } = params;
  const response = await request(
    `http://localhost:8000/videos/all?user_id=${userId}&project_id=${projectId}`,
    {
      method: 'POST',
      body: {
        model_id,
        interval,
        file, // object
      },
    },
  );
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
  return response;
}
