import moment from 'moment';
import React from 'react';
import { List, Col, Row, Typography, Dropdown, Menu, Button } from 'antd';
import { EllipsisOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { router } from 'umi';

const VideoList = props => {
  const { data, projectId } = props;
  return (
    <List
      style={{ width: '100%' }}
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
            overlay={
              <Menu>
                <Menu.Item key="edit">Edit</Menu.Item>
                <Menu.Item key="delete">Delete</Menu.Item>
              </Menu>
            }
          >
            <Button type="link" icon={<EllipsisOutlined />} size="small" />
          </Dropdown>
        </List.Item>
      )}
    />
  );
};

export default VideoList;
