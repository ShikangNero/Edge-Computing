import React, { useState } from 'react';
import { Card, Descriptions, Row, Col, Typography, Tag, Button, Alert, Dropdown, Menu } from 'antd';
import { router } from 'umi';
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import { typeColorPicker } from '@/utils/colorPicker';

const ProjectCard = props => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { project, handleDeleteProject } = props;

  return (
    <Card hoverable style={{ height: '100%', width: '100%' }}>
      <Descriptions
        title={
          <Row>
            <Col span={20} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography.Text strong style={{ fontSize: 16 }}>
                <span
                  style={{ marginRight: 12 }}
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
                          size="small"
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteProject();
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
                        {/* <Popconfirm
                        placement="left"
                        visible={deleteVisible}
                        title="Confirm to delete this project?"
                        onCancel={e => {
                          e.stopPropagation();
                          setDeleteVisible(false);
                        }}
                        onConfirm={e => {
                          e.stopPropagation();
                          handleDeleteProject();
                          setDeleteVisible(false);
                        }}
                      > */}
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
                        {/* </Popconfirm> */}
                      </Menu.Item>
                    </Menu>
                  )
                }
              >
                <MoreOutlined
                  onClick={e => {
                    e.stopPropagation();
                  }}
                />
              </Dropdown>
            </Col>
          </Row>
        }
      >
        {/* <Descriptions.Item label="Type" span={3}>
              <Typography.Text type="secondary">{project.type}</Typography.Text>
            </Descriptions.Item> */}
        <Descriptions.Item label="Description" span={3}>
          <Typography.Text type="secondary">{project.description}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item
          label="Location"
          //   {

          //     <Typography.Text>
          //       <GlobalOutlined style={{ marginRight: 8 }} />
          //       Location
          //     </Typography.Text>
          //   }
          span={3}
        >
          <Typography.Text type="secondary">{project.location}</Typography.Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProjectCard;
