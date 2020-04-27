import {
  getCollections,
  addImages,
  updateCollection,
  deleteCollection,
  getImageByCollection,
  deleteImage,
  updateImageCollection,
} from '@/services/image';
import { message } from 'antd';

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
        yield put({
          type: 'setData',
          collections: response,
        });
      }
    },

    *uploadImages({ payload }, { call, put, select }) {
      const response = yield call(addImages, payload);
      if (response && response !== undefined && response[0]) {
        message.success('Successfully uploaded image(s)');
        const collections = yield select(state => state.image.collections);
        const { type } = payload;
        const curCollection = collections.find(collection => collection.name === type);
        if (curCollection) {
          curCollection.count += 1;
        } else {
          collections.push({ name: type, count: 1, avatarImage: response[0] });
        }

        yield put({
          type: 'setData',
          collections,
        });
      } else {
        message.error('Failed to upload image(s)');
      }
    },

    *updateCollectionName({ payload }, { call, put, select }) {
      const response = yield call(updateCollection, payload);
      if (response && response !== undefined) {
        const collections = yield select(state => state.image.collections);
        const { oldType, newType } = payload;
        const curCollection = collections.find(collection => collection.name === oldType);
        message.success('Successfully updated collection name');
        if (curCollection) {
          curCollection.name = newType;
          yield put({
            type: 'setData',
            collections,
          });
        }
      } else {
        message.error('Failed to update collection name');
      }
    },

    *removeCollection({ payload }, { call, put, select }) {
      const response = yield call(deleteCollection, payload);
      if (response && response !== undefined) {
        const collections = yield select(state => state.image.collections);
        const { type } = payload;
        const curIdx = collections.findIndex(collection => collection.name === type);
        message.success('Successfully deleted collection');
        if (curIdx > -1) {
          collections.splice(curIdx, 1);
          yield put({
            type: 'setData',
            collections,
          });
        }
      } else {
        message.error('Failed to delete collection');
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
      if (response && response !== undefined) {
        const images = yield select(state => state.image.images);
        const { imageId } = payload;
        const curIdx = images.findIndex(image => image.id === imageId);
        if (curIdx > -1) {
          images.splice(curIdx, 1);
        }
        message.success('Successfully deleted image');
        yield put({
          type: 'setData',
          images,
        });
      } else {
        message.error('Failed to delete image');
      }
    },

    *changeImageCollection({ payload }, { call, put, select }) {
      const response = yield call(updateImageCollection, payload);
      if (response && response !== undefined) {
        const images = yield select(state => state.image.images);
        const { imageId } = payload;
        const curIdx = images.findIndex(image => image.id === imageId);
        if (curIdx > -1) {
          images.splice(curIdx, 1);
        }
        message.success('Successfully moved image to the selected collection');
        yield put({
          type: 'setData',
          images,
        });
      } else {
        message.error('Failed to move image to the selected collection');
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
