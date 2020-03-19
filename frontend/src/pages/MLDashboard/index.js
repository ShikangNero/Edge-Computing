import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProjectCard from './ProjectCard';
import ModalCreateProject from './ModalCreateProject';

// eslint-disable-next-line react/prefer-stateless-function
class MLDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      createProjectVisible: false,
      fakeProjects: [
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
      ],
    };
  }

  render() {
    const { createProjectVisible, fakeProjects } = this.state;
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
                <ProjectCard
                  project={project}
                  handleDeleteProject={() => {
                    const copiedProjects = [...fakeProjects];
                    const curProjIdx = copiedProjects.findIndex(proj => proj.id === project.id);
                    if (curProjIdx > -1) {
                      copiedProjects.splice(curProjIdx, 1);
                      this.setState({ fakeProjects: copiedProjects });
                    }
                  }}
                />
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
