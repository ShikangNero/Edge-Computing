import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProjectCard from './ProjectCard';
import ModalCreateProject from './ModalCreateProject';
import { getCookie } from '@/utils/cookie';

const MLDashboard = props => {
  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [init, setInit] = useState(false);
  const {
    ml: { projects },
    dispatch,
  } = props;

  useEffect(() => {
    // console.log(getCookie('token'));
    // console.log(getCookie('userId'))
    if (!init) {
      dispatch({
        type: 'ml/getProjects',
        payload: {
          userId: getCookie('userId'),
        },
      });
      setInit(true);
    }
  });
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
              onClick={() => setCreateProjectVisible(true)}
            >
              Create Project
            </Button>
          </Col>
        </Row>
      }
    >
      <Row gutter={[16, 16]}>
        {projects &&
          projects.map(project => (
            <Col xs={24} md={12} lg={8} key={project.id}>
              <ProjectCard
                project={project}
                handleDeleteProject={() => {
                  dispatch({
                    type: 'ml/removeProject',
                    id: project.id,
                  });
                }}
              />
            </Col>
          ))}
      </Row>
      <ModalCreateProject
        visible={createProjectVisible}
        handleCloseModal={() => setCreateProjectVisible(false)}
      />
    </Card>
  );
};

export default connect(({ ml, loading }) => ({
  ml,
  loading,
}))(MLDashboard);
