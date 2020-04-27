import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Modal, Col, Typography, Input, Select, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getCookie } from '@/utils/cookie';

const { Option } = Select;

const TrainModel = props => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { visible, handleCloseModal, dispatch, projectId } = props;

  function clear() {
    setDescription('');
    setType('');
    setTitle('');
    setFileList([]);
  }

  return (
    <Modal
      title="Train your new model"
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
            loading={loading}
            type="primary"
            disabled={!title || !type || !fileList || fileList.length < 1}
            onClick={() => {
              const formData = new FormData();
              formData.append('files', fileList[0].originFileObj);
              formData.append('description', description);
              formData.append('type', type);
              formData.append('title', title);
              setLoading(true);
              console.log(formData.getAll('files'));
              dispatch({
                type: 'model/createNewModel',
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
          <Typography.Text>File use to train (python file) *</Typography.Text>
        </Col>
        <Col span={16}>
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="text"
            fileList={fileList}
            // eslint-disable-next-line no-shadow
            onChange={({ fileList }) => {
              console.log('fileList', fileList);
              const curLoadingFile = fileList && fileList.find(file => file.status === 'uploading');
              if (curLoadingFile) {
                setLoading(true);
              } else {
                console.log(fileList);
                setLoading(false);
              }
              const curFile = fileList[fileList.length - 1];
              if (curFile?.name?.endsWith('.py')) {
                setFileList([curFile]);
              } else {
                setFileList([]);
              }
            }}
            beforeUpload={file => {
              const isPython = file?.name?.endsWith('.py');
              if (!isPython) message.error('Please upload python file');

              return isPython;
            }}
            onRemove={() => {
              setFileList([]);
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
}))(TrainModel);
