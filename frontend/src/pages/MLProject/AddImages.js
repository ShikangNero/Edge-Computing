import React, { useState } from 'react';
import { Row, Col, Collapse, Upload, Button, Divider, Modal, Select, message } from 'antd';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';
import { getCookie } from '@/utils/cookie';

const { Panel } = Collapse;
const { Option } = Select;

const FAKE_OPTIONS = ['cat', 'dog', 'butterfly'];

const AddImages = props => {
  const [activeKey, setActiveKey] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [loadingFile, setLoadingFile] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [loading, setLoading] = useState([false]);

  // monitor loading status for all post request in the for loop
  let hadLoading = false;
  loading.forEach(isloading => {
    hadLoading = hadLoading || isloading;
  });

  const {
    dispatch,
    image: { collections },
    projectId,
  } = props;

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

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  }

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
                      onClick={() => setActiveKey(activeKey ? null : 'addImage')}
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
                    onChange={value => setSelectedCollection(value)}
                  >
                    {collections.map(option => (
                      <Option key={option.name}>{option.name}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Upload
                    multiple
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    // eslint-disable-next-line no-shadow
                    onChange={({ fileList }) => {
                      const curLoadingFile =
                        fileList && fileList.find(file => file.status === 'uploading');
                      if (curLoadingFile) {
                        setLoadingFile(true);
                      } else {
                        setLoadingFile(false);
                      }
                      const validateFileList = [];
                      fileList.forEach(file => {
                        if (file.type === 'image/jpeg' || file.type === 'image/png') {
                          validateFileList.push(file);
                        }
                      });
                      setFileList(validateFileList);
                    }}
                    beforeUpload={file => {
                      const isJPG = file.type === 'image/jpeg';
                      const isPNG = file.type === 'image/png';
                      if (!isJPG && !isPNG) message.error('Please upload JPG or PNG file');

                      return isJPG || isPNG;
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
                  <Button style={{ marginRight: 16 }} onClick={() => setActiveKey(null)}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      (fileList && fileList.length === 0) ||
                      loadingFile ||
                      !selectedCollection ||
                      selectedCollection.length === 0
                    }
                    loading={hadLoading}
                    onClick={async () => {
                      setLoading(selectedCollection.map(() => true));
                      selectedCollection.forEach((curCollection, idx) => {
                        const formData = new FormData();
                        const uploadImages = fileList?.map(item => item.originFileObj) || [];
                        uploadImages.forEach(image => formData.append('files', image));
                        formData.append('type', curCollection);
                        dispatch({
                          type: 'image/uploadImages',
                          payload: {
                            projectId,
                            userId: getCookie('userId'),
                            formData,
                            type: curCollection,
                          },
                        }).then(() => {
                          loading[idx] = false;
                          setLoading(loading);
                        });
                      });
                      setFileList([]);
                    }}
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
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default connect(({ ml, image }) => ({
  ml,
  image,
}))(AddImages);
