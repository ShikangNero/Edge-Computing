import React from 'react';
import { Row, Col, Collapse, Upload, Button, Divider, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

const { Panel } = Collapse;
const { Option } = Select;

const FAKE_OPTIONS = ['cat', 'dog', 'butterfly'];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class AddImages extends React.Component {
  constructor() {
    super();
    this.state = {
      activeKey: null,
      previewVisible: false,
      fileList: [],
      previewImage: '',
      loadingFile: false,
      selectedCollection: null,
    };
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  render() {
    const {
      activeKey,
      previewVisible,
      fileList,
      previewImage,
      loadingFile,
      selectedCollection,
    } = this.state;
    console.log('selectedCollection', selectedCollection);
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
                        onClick={() => this.setState({ activeKey: activeKey ? null : 'addImage' })}
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
                      onChange={value => this.setState({ selectedCollection: value })}
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
                      onPreview={this.handlePreview}
                      // eslint-disable-next-line no-shadow
                      onChange={({ fileList }) => {
                        const curLoadingFile =
                          fileList && fileList.find(file => file.status === 'uploading');
                        if (curLoadingFile) {
                          this.setState({ loadingFile: true });
                        } else {
                          this.setState({ loadingFile: false });
                        }
                        this.setState({ fileList });
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
                    <Button
                      style={{ marginRight: 16 }}
                      onClick={() => this.setState({ activeKey: null })}
                    >
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
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default AddImages;
