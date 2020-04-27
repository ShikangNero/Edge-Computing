import { createModel, uploadModel, getModelsByProject, deleteModel } from '@/services/model';

export default {
  namespace: 'model',

  state: {
    models: [],
  },

  effects: {
    *getModels({ payload }, { call, put }) {
      const response = yield call(getModelsByProject, payload);
      yield put({
        type: 'setData',
        models: response?.reverse(),
      });
    },

    *createNewModel({ payload }, { call, put }) {
      const response = yield call(createModel, payload);
    },

    *uploadNewModel({ payload }, { call, put }) {
      const response = yield call(uploadModel, payload);
    },

    *removeModel({ payload }, { call, put }) {
      const response = yield call(deleteModel, payload);
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
