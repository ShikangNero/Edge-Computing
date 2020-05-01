import moment from 'moment';
import { connect } from 'dva';
import React, { useState } from 'react';
import { List, Col, Row, Typography, Dropdown, Menu, Button, Alert, Empty } from 'antd';
import { EllipsisOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { router } from 'umi';

const VideoList = props => {
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, projectId, dispatch } = props;
  return !data || data.length === 0 ? (
    <Row justify="center" style={{ width: '100%' }}>
      <Empty description="No video found" />
    </Row>
  ) : (
    <List
      style={{ width: '100%' }}
      pagination={{
        pageSize: 10,
      }}
      itemLayout="horizontal"
      dataSource={data || []}
      renderItem={item => (
        <List.Item
          style={{ cursor: 'pointer' }}
          className="videoItem"
          onClick={() => {
            router.push(`/ml-project/${projectId}/video_collection/${item.id}`);
          }}
        >
          <Row align="middle">
            <PlayCircleOutlined style={{ marginRight: 8 }} />
            <Col>
              <Row>
                <Typography.Text style={{ fontSize: 18 }} className="videoTitle">
                  {item.title}
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {`Submitted at ${moment(item.submittedAt).fromNow()}`}
                </Typography.Text>
              </Row>
            </Col>
          </Row>
          <Dropdown
            placement="bottomRight"
            trigger="click"
            overlay={
              remove ? (
                <Menu onclick={e => e.stopPropagation()} style={{ padding: '4px 0' }}>
                  <Row style={{ marginBottom: 8 }}>
                    <Alert
                      type="warning"
                      showIcon
                      message="Confirm to delete this image?"
                      style={{ borderLeft: 'none', borderRight: 'none' }}
                    />
                  </Row>
                  <Row justify="end" style={{ padding: '4px 8px' }}>
                    <Button
                      loading={loading}
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        setRemove(false);
                      }}
                      style={{ marginRight: 8 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      loading={loading}
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        setLoading(true);
                        dispatch({
                          type: 'video/removeVideo',
                          payload: {
                            videoId: item?.id,
                          },
                        }).then(() => {
                          setLoading(false);
                          setRemove(false);
                        });
                      }}
                    >
                      Confirm
                    </Button>
                  </Row>
                </Menu>
              ) : (
                <Menu>
                  <Menu.Item key="edit">
                    <Button
                      disabled
                      type="link"
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      Edit
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="delete">
                    <Button
                      type="link"
                      onClick={e => {
                        e.stopPropagation();
                        setRemove(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Menu.Item>
                </Menu>
              )
            }
          >
            <Button
              type="link"
              icon={<EllipsisOutlined />}
              size="small"
              onClick={e => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        </List.Item>
      )}
    />
  );
};

export default connect(({ video, model }) => ({
  video,
  model,
}))(VideoList);
