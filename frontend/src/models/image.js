import { getCollections, addImages } from '@/services/image';

export default {
  namespace: 'image',

  state: {
    collections: [],
    images: [],
  },

  effects: {
    *getImageCollections({ payload }, { call, put }) {
      const response = yield call(getCollections, payload);
      if (response && response !== undefined) {
        const collectionArr = Object.keys(response).map(key => ({
          name: key,
          count: response[key],
        }));
        yield put({
          type: 'setData',
          collections: collectionArr,
        });
      }
    },

    *uploadImages({ payload }, { call, put, select }) {
      const response = yield call(addImages, payload);
      const collections = yield select(state => state.image.collections);
      const { type } = payload;
      const curCollection = collections.find(collection => collection.name === type);
      if (curCollection) {
        curCollection.count += 1;
      } else {
        collections.push({ name: type, count: 1 });
      }

      yield put({
        type: 'setData',
        collections,
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
