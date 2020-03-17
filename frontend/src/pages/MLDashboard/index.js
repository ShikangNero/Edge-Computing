import React from 'react';
import { Card, Row, Col, Typography, Descriptions, Button, Tooltip, Popconfirm } from 'antd';
import { PlusOutlined, ToolOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalCreateProject from './ModalCreateProject';

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
        title: 'project 1',
        description: 'this is a classification project',
        type: 'Classification',
        location: 'California / Santa Clara / San Jose',
      },
      {
        title: 'project 2',
        description: 'this is a face detection project',
        type: 'Detection',
        location: 'California / Santa Clara / San Jose',
      },
      {
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
                <Card hoverable style={{ height: '100%', width: '100%' }}>
                  <Descriptions
                    title={
                      <Row>
                        <Col span={16}>
                          <Typography.Text strong style={{ fontSize: 16 }}>
                            {project.title}
                          </Typography.Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                    <Descriptions.Item label="Type" span={3}>
                      <Typography.Text type="secondary">{project.type}</Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Location" span={3}>
                      <Typography.Text type="secondary">{project.location}</Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                      <Typography.Text type="secondary">{project.description}</Typography.Text>
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
