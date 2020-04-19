import moment from 'moment';

const FAKE_VIDEOS = [
  {
    id: 'jasifnew321',
    title: 'test video asset 1',
    submittedAt: moment().subtract(3, 'days'),
  },
  {
    id: 'faasdf322',
    title: 'test video asset 2',
    submittedAt: moment().subtract(3, 'days'),
  },
  {
    id: 'basnujyk312',
    title: 'test video asset 3',
    submittedAt: moment().subtract(3, 'days'),
  },
];

export default {
  namespace: 'ml',

  state: {
    projects: [],
    imageAssets: [],
    videoAssets: [],
    video: null,
  },

  effects: {
    *getProjects(_, { put }) {
      yield put({
        type: 'setData',
        projects: [
          {
            id: '14zxcv78a8sd',
            title: 'project 1',
            description: 'this is a classification project',
            type: 'Classification',
            location: 'California / Santa Clara / San Jose',
          },
          {
            id: '8zxva9df98zs90',
            title: 'project 2',
            description: 'this is a face detection project',
            type: 'Detection',
            location: 'California / Santa Clara / San Jose',
          },
          {
            id: '8asx8d9ggs7s',
            title: 'project 3',
            description: 'this is a linear regression project',
            type: 'Classification',
            location: 'California / Santa Clara / San Jose',
          },
        ],
      });
    },

    *removeProject(payload, { put, select }) {
      const { id } = payload;
      const projects = yield select(state => state.ml.projects);
      const removeProjectIdx = projects.findIndex(project => project.id === id);
      if (removeProjectIdx > -1) {
        projects.splice(removeProjectIdx, 1);
      }
      yield put({
        type: 'setData',
        projects,
      });
    },

    *getImageAssets(_, { put }) {
      yield put({
        type: 'setData',
        imageAssets: [
          { id: 1, name: 'cat' },
          { id: 2, name: 'dog' },
          { id: 3, name: 'butterfly' },
        ],
      });
    },

    *updateImageAsset(payload, { put, select }) {
      const { id, name } = payload;
      const imageAssets = yield select(state => state.ml.imageAssets);
      const updateImage = imageAssets?.find(image => image.id === id);
      updateImage.name = name;
      yield put({
        type: 'setData',
        imageAssets,
      });
    },

    *removeImageAsset(payload, { put, select }) {
      const { id } = payload;
      const imageAssets = yield select(state => state.ml.imageAssets);
      const deleteImageIdx = imageAssets?.findIndex(image => image.id === id);
      if (deleteImageIdx > -1) {
        imageAssets.splice(deleteImageIdx, 1);
      }
      yield put({
        type: 'setData',
        imageAssets,
      });
    },

    *getVideoAssets(_, { put }) {
      yield put({
        type: 'setData',
        videoAssets: FAKE_VIDEOS,
      });
    },

    *getVideoDetail(payload, { put }) {
      const { id } = payload;
      const curVideo = FAKE_VIDEOS.find(video => video.id === id);
      yield put({
        type: 'setData',
        video: {
          url: 'https://www.youtube.com/embed/ukzFI9rgwfU',
          ...curVideo,
        },
      });
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
