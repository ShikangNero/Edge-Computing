import moment from 'moment';
import { message } from 'antd';
import {
  getProjectByAccount,
  addProject,
  deleteProject,
  getProjectDetail,
  updateProjectDescription,
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
      if (response !== undefined && response?.message === 'success') {
        message.success('Successfully removed selected project');
        const projects = yield select(state => state.ml.projects);
        const removeProjectIdx = projects.findIndex(project => project.id === projectId);
        if (removeProjectIdx > -1) {
          projects.splice(removeProjectIdx, 1);
        }
        yield put({
          type: 'setData',
          projects,
        });
      } else {
        message.error('Failed to remove selected project');
      }
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

    *updateDescription({ payload }, { call, put, select }) {
      const response = yield call(updateProjectDescription, payload);
      if (response !== undefined && response?.message === 'success') {
        const projects = yield select(state => state.ml.projects);
        const { projectId, description } = payload;
        const curProject = projects.find(project => project.id === projectId);
        message.success('Successfully updated project description');
        if (curProject) {
          curProject.description = description;
          yield put({
            type: 'setData',
            projects,
          });
        }
      } else {
        message.error('Failed to update project description');
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
