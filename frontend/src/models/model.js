import { createModel, uploadModel, getModelsByProject, deleteModel } from '@/services/model';
import { message } from 'antd';

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

    *createNewModel({ payload }, { call, put, select }) {
      const response = yield call(createModel, payload);
      if (response !== undefined && response?.message === 'success') {
        message.success('Successfully trained a new model');
        const models = yield select(state => state.model.models);
        models.unshift(response);
        yield put({
          type: 'setData',
          models,
        });
      } else {
        message.error('Failed to train the model');
      }
    },

    *uploadNewModel({ payload }, { call, put, select }) {
      const response = yield call(uploadModel, payload);
      if (response !== undefined && response?.id) {
        message.success('Successfully upload a new model');
        const models = yield select(state => state.model.models);
        models.unshift(response);
        yield put({
          type: 'setData',
          models,
        });
      } else {
        message.error('Failed to upload the model');
      }
    },

    *removeModel({ payload }, { call, put, select }) {
      const response = yield call(deleteModel, payload);
      if (response !== undefined && response?.message === 'success') {
        const { modelId } = payload;
        const models = yield select(state => state.model.models);
        const curIdx = models.findIndex(model => model.id === modelId);
        message.success('Successfully removed selected model');
        if (curIdx > -1) {
          models.splice(curIdx, 1);
          yield put({
            type: 'setData',
            models,
          });
        }
      } else {
        message.success('Failed to remove selected model');
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
