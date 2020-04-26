import React, { useState } from 'react';
import { connect } from 'dva';
import { Card, Descriptions, Row, Col, Typography, Tag, Button, Alert, Dropdown, Menu } from 'antd';
import { router } from 'umi';
import { MoreOutlined } from '@ant-design/icons';
import { typeColorPicker } from '@/utils/colorPicker';

const ProjectCard = props => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { project, dispatch } = props;

  return (
    <Card hoverable style={{ width: '100%', cursor: 'auto' }} bodyStyle={{ height: 200 }}>
      <Descriptions
        className="projectCardDescription"
        style={{ height: '100%' }}
        title={
          <Row align="middle">
            <Col span={20} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography.Text strong style={{ fontSize: 16 }}>
                <span
                  style={{ marginRight: 12, cursor: 'pointer' }}
                  onClick={() => {
                    router.push(`ml-project/${project.id}`);
                  }}
                  className="projectCardTitle"
                >
                  {project.title}
                </span>
                <Tag color={typeColorPicker(project.type)}>{project.type}</Tag>
              </Typography.Text>
            </Col>
            <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Dropdown
                trigger="click"
                placement="topRight"
                overlay={
                  deleteVisible ? (
                    <Menu onclick={e => e.stopPropagation()} style={{ padding: '4px 0' }}>
                      <Row style={{ marginBottom: 8 }}>
                        <Alert
                          type="warning"
                          showIcon
                          message="Confirm to delete this project?"
                          style={{ borderLeft: 'none', borderRight: 'none' }}
                        />
                      </Row>
                      <Row justify="end" style={{ padding: '4px 8px' }}>
                        <Button
                          loading={loading}
                          size="small"
                          onClick={e => {
                            e.stopPropagation();
                            setDeleteVisible(false);
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
                              type: 'ml/removeProject',
                              payload: {
                                projectId: project.id,
                              },
                            }).then(() => setLoading(false));
                            setDeleteVisible(false);
                          }}
                        >
                          Confirm
                        </Button>
                      </Row>
                    </Menu>
                  ) : (
                    <Menu>
                      <Menu.Item>
                        <Button
                          type="link"
                          size="small"
                          onClick={e => {
                            e.stopPropagation();
                          }}
                        >
                          Edit
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          type="link"
                          size="small"
                          onClick={e => {
                            setDeleteVisible(true);
                            e.stopPropagation();
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
                  size="small"
                  icon={<MoreOutlined />}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                />
              </Dropdown>
            </Col>
          </Row>
        }
      >
        <Descriptions.Item label="Description" span={3} style={{ overflow: 'scroll' }}>
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 2, expandable: true }}
            style={{ margin: 0 }}
          >
            {project.description}
          </Typography.Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={3}>
          <Typography.Text type="secondary">{project.location}</Typography.Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default connect(({ ml }) => ({
  ml,
}))(ProjectCard);
