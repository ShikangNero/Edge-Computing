import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Row, Col, Button, Divider, Typography, Tooltip, List, Avatar } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';

const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const VideoDetail = props => {
  const {
    match: { params },
    video: { video },
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
                <Tooltip title={video?.title}>
                  <Typography.Text strong style={{ fontSize: 18 }} ellipsis>
                    {video?.title}
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
        <Row style={{ height: 400 }}>
          <Col span={12} style={{ height: '100%' }}>
            <video
              src={video?.url}
              width="100%"
              height="100%"
              controls
              style={{ borderBottomLeftRadius: 10 }}
            />
          </Col>
          <Col span={12} style={{ padding: 12, height: '100%' }}>
            <List
              style={{ height: '100%', overflow: 'scroll' }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Avatar
                    // src={image?.url}
                    icon={<UserOutlined />}
                    shape="square"
                    style={{ width: '100%', height: 40 }}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ video }) => ({
  video,
}))(VideoDetail);
