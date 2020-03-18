import React from 'react';
import { Card, Tabs, Typography, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FileImageOutlined, VideoCameraOutlined, AppstoreOutlined } from '@ant-design/icons';
import ImageCollection from './ImageCollection';
import AddImages from './AddImages';
// import styles from './index.less';

const { TabPane } = Tabs;

const SAMPLES = [
  { id: 1, name: 'cat' },
  { id: 2, name: 'dog' },
  { id: 3, name: 'butterfly' },
];

class MLProject extends React.Component {
  constructor() {
    super();
    this.state = {
      samples: SAMPLES,
    };
  }

  render() {
    const {
      match: { params },
    } = this.props;
    const { samples } = this.state;
    return (
      <PageHeaderWrapper>
        <Card title="Project Detail">
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <Typography.Text type="secondary">
                  <FileImageOutlined style={{ marginRight: 4 }} />
                  Image Training Assets
                </Typography.Text>
              }
              key="1"
            >
              <AddImages />
              <Row gutter={[16, 16]}>
                {samples.map(imgCollection => (
                  <Col xs={24} sm={12} md={8} xl={6} id={imgCollection.id}>
                    <ImageCollection
                      projectId={params && params.project_id}
                      imgCollection={imgCollection}
                      handleChangeName={newName => {
                        const copiedSamples = [...samples];
                        const curSample = copiedSamples.find(
                          sample => sample.id === imgCollection.id,
                        );
                        if (curSample) {
                          curSample.name = newName;
                        }
                        this.setState({ samples: copiedSamples });
                      }}
                      handleDeleteCollection={() => {
                        const copiedSamples = [...samples];
                        const curSampleIdx = copiedSamples.findIndex(
                          sample => sample.id === imgCollection.id,
                        );
                        copiedSamples.splice(curSampleIdx, 1);
                        this.setState({ samples: copiedSamples });
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </TabPane>
            <TabPane
              tab={
                <Typography.Text type="secondary">
                  <VideoCameraOutlined style={{ marginRight: 4 }} /> Video Training Assets
                </Typography.Text>
              }
              key="2"
            >
              Video
            </TabPane>
            <TabPane
              tab={
                <Typography.Text type="secondary">
                  <AppstoreOutlined style={{ marginRight: 4 }} /> Models
                </Typography.Text>
              }
              key="3"
            >
              Models
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MLProject;
