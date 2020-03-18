import React from 'react';
import { Card, Row, Col, Typography, Descriptions, Button, Tooltip, Popconfirm, Tag } from 'antd';
import { PlusOutlined, ToolOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';
import ModalCreateProject from './ModalCreateProject';
import { typeColorPicker } from '@/utils/colorPicker';

// eslint-disable-next-line react/prefer-stateless-function
class MLDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      createProjectVisible: false,
    };
  }

  render() {
    const fakeProjects = [
      {
        id: '14zxcv78a8sd',
        title: 'project 1',
        description: 'this is a classification project',
        type: 'Classification',
        location: 'California / Santa Clara / San Jose',
      },
      {
        id: '8zxva9df98zs90',
        title: 'project 2',
        description: 'this is a face detection project',
        type: 'Detection',
        location: 'California / Santa Clara / San Jose',
      },
      {
        id: '8asx8d9ggs7s',
        title: 'project 3',
        description: 'this is a linear regression project',
        type: 'Classification',
        location: 'California / Santa Clara / San Jose',
      },
    ];
    const { createProjectVisible } = this.state;
    return (
      <Card
        title={
          <Row>
            <Col
              span={24}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography.Text>My Projects</Typography.Text>
              {/* <Divider type="vertical" style={{ margin: '0 16px 0 24px', height: 24 }} /> */}
              <Button
                type="default"
                icon={<PlusOutlined />}
                style={{ marginLeft: 16 }}
                onClick={() => this.setState({ createProjectVisible: true })}
              >
                Create Project
              </Button>
            </Col>
          </Row>
        }
      >
        <Row gutter={[16, 16]}>
          {fakeProjects &&
            fakeProjects.map(project => (
              <Col xs={24} md={12} lg={8}>
                <Card
                  hoverable
                  style={{ height: '100%', width: '100%' }}
                  onClick={() => {
                    router.push(`ml-project/${project.id}`);
                  }}
                >
                  <Descriptions
                    title={
                      <Row>
                        <Col span={20} style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography.Text strong style={{ fontSize: 16 }}>
                            <span style={{ marginRight: 12 }}>{project.title}</span>
                            <Tag color={typeColorPicker(project.type)}>{project.type}</Tag>
                          </Typography.Text>
                        </Col>
                        <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button.Group>
                            <Tooltip title="edit project">
                              <Button type="link" size="small" icon={<ToolOutlined />} />
                            </Tooltip>
                            <Popconfirm title="Confirm to delete this project?">
                              <Button
                                type="link"
                                size="small"
                                icon={<DeleteOutlined style={{ color: 'red' }} />}
                              />
                            </Popconfirm>
                          </Button.Group>
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
              </Col>
            ))}
        </Row>
        <ModalCreateProject
          visible={createProjectVisible}
          handleCloseModal={() => this.setState({ createProjectVisible: false })}
        />
      </Card>
    );
  }
}

export default MLDashboard;
