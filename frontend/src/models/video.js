import { getVideoByProject, postVideo, getVideo, deleteVideo } from '@/services/video';
import { message } from 'antd';

export default {
  namespace: 'video',

  state: {
    videos: [],
    video: null,
  },

  effects: {
    *getVideo({ payload }, { call, put }) {
      const response = yield call(getVideoByProject, payload);
      yield put({
        type: 'setData',
        videos: response,
      });
    },

    *getVideoDetail({ payload }, { call, put }) {
      const response = yield call(getVideo, payload);
      yield put({
        type: 'setData',
        video: response,
      });
    },

    *uploadVideo({ payload }, { call, put, select }) {
      const response = yield call(postVideo, payload);
      if (response && response !== undefined) {
        const videos = yield select(state => state.video.videos);
        videos.push(response.video);
        message.success('Successfully uploaded video');
        yield put({
          type: 'setData',
          videos,
        });
      } else {
        message.error('Failed to upload video');
      }
    },

    *updateImageTag({ payload }, { put, select }) {
      const { imageId, type } = payload;
      const video = yield select(state => state.video.video);
      const curImage = video?.images?.find(image => image.id === imageId);
      if (curImage) {
        curImage.type = type;
        yield put({
          type: 'setData',
          video,
        });
      }
    },

    *removeVideo({ payload }, { call, put, select }) {
      const response = yield call(deleteVideo, payload);
      if (response !== undefined && response?.message === 'success') {
        const { videoId } = payload;
        const videos = yield select(state => state.video.videos);
        const curIdx = videos.findIndex(video => video.id === videoId);
        message.success('Successfully removed selected video');
        if (curIdx > -1) {
          videos.splice(curIdx, 1);
          yield put({
            type: 'setData',
            videos,
          });
        }
      } else {
        message.error('Failed to remove selected video');
      }
    },
  },

  reducers: {
    setData(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};
