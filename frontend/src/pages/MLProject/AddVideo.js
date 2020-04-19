import React, { useState } from 'react';
import {
  Col,
  Row,
  Collapse,
  Button,
  Divider,
  Upload,
  Typography,
  Select,
  InputNumber,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;

const AddVideo = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [interval, setInterval] = useState(100);

  return (
    <Col span={24}>
      <Collapse
        expandIcon={() => null}
        bordered={false}
        style={{ backgroundColor: 'white' }}
        activeKey={activeKey}
      >
        <Panel
          style={{ border: 'none' }}
          header={
            <Row>
              <Col span={24}>
                <Button
                  style={{ position: 'relative', left: -40 }}
                  onClick={() => setActiveKey(activeKey ? null : 'addVideo')}
                >
                  Upload Video
                </Button>
              </Col>
            </Row>
          }
          key="addVideo"
        >
          <Col span={24}>
            <Row>
              <Col xs={24} md={12} lg={8} xxl={6} style={{ margin: '8px 0' }}>
                <Row align="middle">
                  <Typography.Text style={{ marginRight: 8 }} type="secondary">
                    Model
                  </Typography.Text>
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    placeholder="Select a model"
                    optionFilterProp="children"
                    onChange={value => setSelectedModel(value)}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Model 1">Model 1</Option>
                    <Option value="Model 2">Model 2</Option>
                    <Option value="Model 3">Model 3</Option>
                  </Select>
                </Row>
              </Col>
              <Col xs={24} md={12} lg={8} xxl={6} style={{ margin: '8px 0' }}>
                <Row align="middle">
                  <Typography.Text style={{ marginRight: 8 }} type="secondary">
                    Input Interval
                  </Typography.Text>
                  <InputNumber
                    min={100}
                    max={500}
                    value={interval}
                    onChange={value => setInterval(value)}
                    style={{ width: 160, marginRight: 4 }}
                  />
                  <Typography.Text type="secondary">/ms</Typography.Text>
                </Row>
              </Col>
            </Row>
            <Row style={{ margin: '8px 0' }}>
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                // accept=".mp4"
                // showUploadList={false}
                // disabled={fileList.length >= 1}
                // eslint-disable-next-line no-shadow
                onChange={({ fileList }) => {
                  console.log('fileList', fileList);
                  const curLoadingFile =
                    fileList && fileList.find(file => file.status === 'uploading');
                  if (curLoadingFile) {
                    setLoadingFile(true);
                  } else {
                    console.log(fileList);
                    setLoadingFile(false);
                  }
                  const curFile = fileList[fileList.length - 1];
                  if (curFile && curFile.type === 'video/mp4') {
                    setFileList([curFile]);
                  } else {
                    setFileList([]);
                  }
                }}
                onRemove={() => {
                  setFileList([]);
                  // return false to prevent ant design original remove action, which will cause error
                  return false;
                }}
                beforeUpload={file => {
                  if (file.type !== 'video/mp4') {
                    message.error('Please upload mp4 file');
                    return false;
                  }
                  return true;
                }}
                fileList={fileList}
              >
                <div>
                  <PlusOutlined />
                  <div>Upload</div>
                </div>
              </Upload>
            </Row>
            <Row justify="end">
              <Button style={{ marginRight: 16 }} onClick={() => setActiveKey(null)}>
                Cancel
              </Button>
              <Button
                type="primary"
                disabled={
                  (fileList && fileList.length === 0) || loadingFile || selectedModel === ''
                }
              >
                Submit
              </Button>
            </Row>
          </Col>
          <Divider type="horizontal" />
        </Panel>
      </Collapse>
    </Col>
  );
};

export default AddVideo;
