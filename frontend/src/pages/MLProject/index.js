import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Tabs, Typography, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FileImageOutlined, VideoCameraOutlined, AppstoreOutlined } from '@ant-design/icons';
import ImageCollectionCard from './ImageCollectionCard';
import AddImages from './AddImages';
import AddVideo from './AddVideo';
import VideoList from './VideoList';
// import styles from './index.less';

const { TabPane } = Tabs;

const SAMPLES = [
  { id: 'sdafdsao12', name: 'cat' },
  { id: '1254njh98', name: 'dog' },
  { id: 'fasdho330', name: 'butterfly' },
];

const MLProject = props => {
  const [samples, setSamples] = useState(SAMPLES);
  const [init, setInit] = useState(false);
  const {
    match: { params },
    ml: { videoAssets },
    dispatch,
  } = props;

  useEffect(() => {
    if (!init) {
      dispatch({
        type: 'ml/getVideoAssets',
      });
      setInit(true);
    }
  });

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
                <Col xs={24} sm={12} md={8} xl={6} key={imgCollection.id}>
                  <ImageCollectionCard
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
                      setSamples(copiedSamples);
                    }}
                    handleDeleteCollection={() => {
                      const copiedSamples = [...samples];
                      const curSampleIdx = copiedSamples.findIndex(
                        sample => sample.id === imgCollection.id,
                      );
                      copiedSamples.splice(curSampleIdx, 1);
                      setSamples(copiedSamples);
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
            <AddVideo />
            <Row>
              <VideoList data={videoAssets} projectId={params && params.project_id} />
            </Row>
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
};

export default connect(({ ml, loading }) => ({
  ml,
  loading,
}))(MLProject);
