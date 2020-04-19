import React, { useState } from 'react';
import { Card, Descriptions, Row, Col, Typography, Tag, Button, Tooltip, Popconfirm } from 'antd';
import { router } from 'umi';
import { ToolOutlined, DeleteOutlined } from '@ant-design/icons';
import { typeColorPicker } from '@/utils/colorPicker';

const ProjectCard = props => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { project, handleDeleteProject } = props;

  return (
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
                  <Button
                    type="link"
                    size="small"
                    icon={<ToolOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  />
                </Tooltip>
                <Popconfirm
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
                >
                  <Button
                    type="link"
                    size="small"
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                    onClick={e => {
                      e.stopPropagation();
                      setDeleteVisible(true);
                    }}
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
  );
};

export default ProjectCard;
