import React, { useState } from 'react';
import { Row, Col, Collapse, Upload, Button, Divider, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

const { Panel } = Collapse;
const { Option } = Select;

const FAKE_OPTIONS = ['cat', 'dog', 'butterfly'];

const AddImages = () => {
  const [activeKey, setactiveKey] = useState(null);
  const [previewVisible, setpreviewVisible] = useState(false);
  const [fileList, setfileList] = useState([]);
  const [previewImage, setpreviewImage] = useState('');
  const [loadingFile, setloadingFile] = useState(false);
  const [selectedCollection, setselectedCollection] = useState(null);
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setpreviewImage(file.url || file.preview);
    setpreviewVisible(true);
  }

  // eslint-disable-next-line no-console
  console.log(selectedCollection);
  return (
    <>
      <Row>
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
                      onClick={() => setactiveKey(activeKey ? null : 'addImage')}
                    >
                      Add Images
                    </Button>
                  </Col>
                </Row>
              }
              key="addImage"
            >
              <Row style={{ marginBottom: 24 }} gutter={[8, 8]}>
                {/* <Col span={24}>
                  <Typography.Text type="secondary">
                   
                  </Typography.Text>
                </Col> */}
                <Col span={24}>
                  <Select
                    mode="tags"
                    style={{ width: 300 }}
                    placeholder="Please select a collection for your image(s)"
                    onChange={value => setselectedCollection(value)}
                  >
                    {FAKE_OPTIONS.map(option => (
                      <Option key={option}>{option}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Upload
                    multiple
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    // eslint-disable-next-line no-shadow
                    onChange={({ fileList }) => {
                      const curLoadingFile =
                        fileList && fileList.find(file => file.status === 'uploading');
                      if (curLoadingFile) {
                        setloadingFile(true);
                      } else {
                        setloadingFile(false);
                      }
                      setfileList(fileList);
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div>Upload</div>
                    </div>
                  </Upload>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button style={{ marginRight: 16 }} onClick={() => setactiveKey(null)}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    disabled={(fileList && fileList.length === 0) || loadingFile}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Divider type="horizontal" />
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Modal visible={previewVisible} footer={null} onCancel={() => setpreviewVisible(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default AddImages;
