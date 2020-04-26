import {
  getCollections,
  addImages,
  updateCollection,
  deleteCollection,
  getImageByCollection,
  deleteImage,
  updateImageCollection,
} from '@/services/image';

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
        // const collectionArr = Object.keys(response).map(key => ({
        //   name: key,
        //   count: response[key],
        // }));
        yield put({
          type: 'setData',
          collections: response,
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

    *updateCollectionName({ payload }, { call, put, select }) {
      const response = yield call(updateCollection, payload);
      const collections = yield select(state => state.image.collections);
      const { oldType, newType } = payload;
      const curCollection = collections.find(collection => collection.name === oldType);
      if (curCollection) {
        curCollection.name = newType;
        yield put({
          type: 'setData',
          collections,
        });
      }
    },

    *removeCollection({ payload }, { call, put, select }) {
      const response = yield call(deleteCollection, payload);
      const collections = yield select(state => state.image.collections);
      const { type } = payload;
      const curIdx = collections.findIndex(collection => collection.name === type);
      if (curIdx > -1) {
        collections.splice(curIdx, 1);
        yield put({
          type: 'setData',
          collections,
        });
      }
    },

    *fetchImageByCollection({ payload }, { call, put }) {
      const response = yield call(getImageByCollection, payload);
      yield put({
        type: 'setData',
        images: response,
      });
    },

    *removeImage({ payload }, { call, put, select }) {
      const response = yield call(deleteImage, payload);
      const images = yield select(state => state.image.images);
      const { imageId } = payload;
      const curIdx = images.findIndex(image => image.id === imageId);
      if (curIdx > -1) {
        images.splice(curIdx, 1);
      }
      yield put({
        type: 'setData',
        images,
      });
    },

    *changeImageCollection({ payload }, { call, put, select }) {
      const response = yield call(updateImageCollection, payload);
      const images = yield select(state => state.image.images);
      const { imageId } = payload;
      const curIdx = images.findIndex(image => image.id === imageId);
      if (curIdx > -1) {
        images.splice(curIdx, 1);
      }
      yield put({
        type: 'setData',
        images,
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
