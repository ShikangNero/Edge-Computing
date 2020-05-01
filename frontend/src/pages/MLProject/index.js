import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Tabs, Typography, Row, Col, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  FileImageOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import ImageSection from './ImageSection';
import VideoSection from './VideoSection';
import ModelSection from './ModelSection';
import PredictSection from './PredictSection';
import { typeColorPicker } from '@/utils/colorPicker';
import { getCookie } from '@/utils/cookie';
// import styles from './index.less';

const { TabPane } = Tabs;

const MLProject = props => {
  const [init, setInit] = useState(false);
  const {
    match: { params },
    ml: { videoAssets, project },
    dispatch,
  } = props;

  useEffect(() => {
    if (!init) {
      dispatch({
        type: 'ml/getSingleProject',
        payload: {
          projectId: params?.project_id,
        },
      });
      dispatch({
        type: 'image/getImageCollections',
        payload: {
          userId: getCookie('userId'),
          projectId: params?.project_id,
        },
      });
      dispatch({
        type: 'ml/getVideoAssets',
      });
      setInit(true);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card
        className="projectDetailCard"
        title={
          <Col>
            {project?.type && (
              <Row style={{ marginBottom: 8 }}>
                <Tag color={typeColorPicker(project.type)}>{project.type}</Tag>
              </Row>
            )}
            <Row>
              <Typography.Title level={4} style={{ marginLeft: 4 }}>
                {project?.title || 'Project Title'}
              </Typography.Title>
            </Row>
            {project?.description && (
              <Row>
                <Typography.Paragraph
                  type="secondary"
                  style={{ marginLeft: 4, width: '100%', overflow: 'break-word' }}
                  ellipsis={{ rows: 2, expandable: true }}
                >
                  {project.description}
                </Typography.Paragraph>
              </Row>
            )}
          </Col>
        }
      >
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
            <ImageSection projectId={params?.project_id} />
          </TabPane>
          <TabPane
            tab={
              <Typography.Text type="secondary">
                <VideoCameraOutlined style={{ marginRight: 4 }} /> Video Training Assets
              </Typography.Text>
            }
            key="2"
          >
            <VideoSection projectId={params?.project_id} />
          </TabPane>
          <TabPane
            tab={
              <Typography.Text type="secondary">
                <AppstoreOutlined style={{ marginRight: 4 }} /> Models
              </Typography.Text>
            }
            key="3"
          >
            <ModelSection projectId={params?.project_id} />
          </TabPane>
          <TabPane
            tab={
              <Typography.Text type="secondary">
                <ClusterOutlined style={{ marginRight: 4 }} /> Predict
              </Typography.Text>
            }
            key="4"
          >
            <PredictSection projectId={params?.project_id} />
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ ml, image, loading }) => ({
  ml,
  image,
  loading,
}))(MLProject);
