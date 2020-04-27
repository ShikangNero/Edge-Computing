import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Row, Col, Button, Divider, Typography, Tooltip, List, Avatar, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { getCookie } from '@/utils/cookie';
import PredictedImage from './PredictedImage';

const VideoDetail = props => {
  const {
    match: { params },
    video: { video },
    image: { collections },
    dispatch,
    loading,
  } = props;
  const [initLoaded, setInitloaded] = useState(false);
  useEffect(() => {
    if (!initLoaded) {
      console.log('params', params?.video_id);
      dispatch({
        type: 'video/getVideoDetail',
        payload: {
          videoId: params && params.video_id,
        },
      });
      dispatch({
        type: 'image/getImageCollections',
        payload: {
          userId: getCookie('userId'),
          projectId: params && params.project_id,
        },
      });
      setInitloaded(true);
    }
  });
  return (
    <PageHeaderWrapper>
      <Card
        bodyStyle={{ padding: 0 }}
        // loading={loading.effects['ml/getVideoDetail']}
        headStyle={{ paddingLeft: 12 }}
        title={
          <Row align="middle" style={{ flexWrap: 'nowrap', width: '100%' }}>
            <Col style={{ alignItems: 'center', display: 'flex' }}>
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  router.goBack();
                }}
              />

              <Divider type="vertical" style={{ height: 24, marginRight: 12 }} />
            </Col>

            <Col style={{ width: 'calc(100% - 53px)' }}>
              <Row>
                <Tooltip title={video?.video?.title}>
                  <Typography.Text strong style={{ fontSize: 18 }} ellipsis>
                    {video?.video?.title}
                  </Typography.Text>
                </Tooltip>
              </Row>
              <Row>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {moment(video?.submittedAt).fromNow()}
                </Typography.Text>
              </Row>
            </Col>
          </Row>
        }
      >
        <Row>
          <Col xs={24} sm={16} style={{ height: 500 }}>
            <video
              src={video?.video?.url}
              width="100%"
              height="100%"
              controls
              style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
            />
          </Col>
          <Col xs={24} sm={8} style={{ height: 500 }}>
            <List
              itemLayout="vertical"
              style={{ height: '100%', overflow: 'scroll', width: '100%' }}
              dataSource={video?.images || []}
              renderItem={img => <PredictedImage curImage={img} collections={collections || []} />}
            />
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ video, image }) => ({
  video,
  image,
}))(VideoDetail);
