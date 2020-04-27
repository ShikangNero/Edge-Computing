import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Modal, Col, Typography, Input, Select, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getCookie } from '@/utils/cookie';

const { Option } = Select;

const UploadModel = props => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileListOne, setFileListOne] = useState([]);
  const [fileListTwo, setFileListTwo] = useState([]);

  const { visible, handleCloseModal, dispatch, projectId } = props;

  function clear() {
    setDescription('');
    setType('');
    setTitle('');
    setFileListOne([]);
    setFileListTwo([]);
  }

  return (
    <Modal
      title="Upload a model"
      visible={visible}
      onCancel={() => {
        clear();
        handleCloseModal();
      }}
      footer={
        <Row justify="end">
          <Button
            onClick={() => {
              clear();
              handleCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            loading={loading}
            disabled={
              !title ||
              !type ||
              !fileListOne ||
              fileListOne.length < 1 ||
              !fileListTwo ||
              fileListTwo.length < 1
            }
            onClick={() => {
              const formData = new FormData();
              formData.append('description', description);
              formData.append('type', type);
              formData.append('title', title);
              const uploadFilesOne = fileListOne?.map(item => item.originFileObj) || [];
              uploadFilesOne.forEach(file => formData.append('files', file));
              const uploadFilesTwo = fileListTwo?.map(item => item.originFileObj) || [];
              uploadFilesTwo.forEach(file => formData.append('files', file));
              console.log(formData.getAll('files'));
              setLoading(true);
              dispatch({
                type: 'model/uploadNewModel',
                payload: {
                  formData,
                  projectId,
                  userId: getCookie('userId'),
                },
              }).then(() => {
                clear();
                setLoading(false);
                handleCloseModal();
              });
            }}
          >
            Create
          </Button>
        </Row>
      }
    >
      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Model Name *</Typography.Text>
        </Col>
        <Col span={16}>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Type *</Typography.Text>
        </Col>
        <Col span={16}>
          <Select
            style={{ width: '100%' }}
            value={type || 'Please select a type'}
            onSelect={value => setType(value)}
          >
            <Option value="Classification">Classification</Option>
            <Option value="Detection">Detection</Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>H5 File *</Typography.Text>
        </Col>
        <Col span={16}>
          <Upload
            listType="text"
            fileList={fileListOne}
            // eslint-disable-next-line no-shadow
            onChange={({ fileList }) => {
              const curLoadingFile = fileList && fileList.find(file => file.status === 'uploading');
              if (curLoadingFile) {
                setLoading(true);
              } else {
                setLoading(false);
              }
              const curFile = fileList[fileList.length - 1];
              if (curFile?.name?.endsWith('.h5')) {
                setFileListOne([curFile]);
              } else {
                setFileListOne([]);
              }
            }}
            beforeUpload={file => {
              const isH5 = file?.name?.endsWith('.h5');
              if (!isH5) message.error('Please upload h5 file');

              return isH5;
            }}
            onRemove={() => {
              setFileListOne([]);
              // return false to prevent ant design original remove action, which will cause error
              return false;
            }}
          >
            <Button>
              <UploadOutlined /> Upload
            </Button>
          </Upload>
        </Col>
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Label File (txt file) *</Typography.Text>
        </Col>
        <Col span={16}>
          <Upload
            listType="text"
            fileList={fileListTwo}
            // eslint-disable-next-line no-shadow
            onChange={({ fileList }) => {
              const curLoadingFile = fileList && fileList.find(file => file.status === 'uploading');
              if (curLoadingFile) {
                setLoading(true);
              } else {
                setLoading(false);
              }
              const curFile = fileList[fileList.length - 1];
              if (curFile?.name?.endsWith('.txt')) {
                setFileListTwo([curFile]);
              } else {
                setFileListTwo([]);
              }
            }}
            beforeUpload={file => {
              const isTxt = file?.name?.endsWith('.txt');
              if (!isTxt) message.error('Please upload a text label file');

              return isTxt;
            }}
            onRemove={() => {
              setFileListTwo([]);
              // return false to prevent ant design original remove action, which will cause error
              return false;
            }}
          >
            <Button>
              <UploadOutlined /> Upload
            </Button>
          </Upload>
        </Col>
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Model Description</Typography.Text>
        </Col>
        <Col span={16}>
          <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} />
        </Col>
      </Row>
    </Modal>
  );
};

export default connect(({ model }) => ({
  model,
}))(UploadModel);
