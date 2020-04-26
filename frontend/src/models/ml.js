import moment from 'moment';
import { message } from 'antd';
import {
  getProjectByAccount,
  addProject,
  deleteProject,
  getProjectDetail,
} from '../services/projects';

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
    project: null,
  },

  effects: {
    *getProjects({ payload }, { call, put }) {
      const response = yield call(getProjectByAccount, payload);
      yield put({
        type: 'setData',
        projects: response,
      });
    },

    *createProject({ payload }, { call, put, select }) {
      const response = yield call(addProject, payload);
      if (response && response !== undefined && response.id) {
        message.success('Successfully added your new project');
        let projects = yield select(state => state.ml.projects);
        projects = [...projects, response];
        yield put({
          type: 'setData',
          projects,
        });
      }
    },

    *getSingleProject({ payload }, { call, put }) {
      const response = yield call(getProjectDetail, payload);
      yield put({
        type: 'setData',
        project: response,
      });
    },

    *removeProject({ payload }, { call, put, select }) {
      const { projectId } = payload;
      const response = yield call(deleteProject, payload);
      const projects = yield select(state => state.ml.projects);
      const removeProjectIdx = projects.findIndex(project => project.id === projectId);
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
