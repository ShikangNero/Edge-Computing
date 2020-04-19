import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Row, Col, Button, Divider, Typography, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';

const VideoDetail = props => {
  const {
    match: { params },
    ml: { video },
    dispatch,
    loading,
  } = props;
  const [initLoaded, setInitloaded] = useState(false);
  useEffect(() => {
    if (!initLoaded) {
      dispatch({
        type: 'ml/getVideoDetail',
        id: params && params.video_id,
      });
      setInitloaded(true);
    }
  });
  return (
    <PageHeaderWrapper>
      <Card
        bodyStyle={{ padding: '0 0 24px 0' }}
        loading={loading.effects['ml/getVideoDetail']}
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
                <Tooltip title={video && video.title}>
                  <Typography.Text strong style={{ fontSize: 18 }} ellipsis>
                    {video && video.title}
                  </Typography.Text>
                </Tooltip>
              </Row>
              <Row>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {moment(video && video.submittedAt).fromNow()}
                </Typography.Text>
              </Row>
            </Col>
          </Row>
        }
      >
        <iframe
          src={video && video.url}
          frameBorder="0"
          width="100%"
          height={400}
          title={video && video.id}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ ml, loading }) => ({
  ml,
  loading,
}))(VideoDetail);
