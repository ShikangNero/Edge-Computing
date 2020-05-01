import React, { useState } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Descriptions,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Alert,
  Dropdown,
  Menu,
  Modal,
  Input,
} from 'antd';
import { router } from 'umi';
import { MoreOutlined } from '@ant-design/icons';
import { typeColorPicker } from '@/utils/colorPicker';

const { TextArea } = Input;

const ProjectCard = props => {
  const { project, dispatch } = props;
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editVisible, setEditVisivle] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [description, setDescription] = useState(project?.description);
  moment.locale('en');

  return (
    <>
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
                  visible={dropdownVisible}
                  onVisibleChange={() => setDropdownVisible(!dropdownVisible)}
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
                              setEditVisivle(true);
                              setDropdownVisible(false);
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
          <Descriptions.Item label="Created At" span={3}>
            <Typography.Text type="secondary">
              {moment(project?.create_time).fromNow()}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3} style={{ overflow: 'scroll' }}>
            <Typography.Paragraph
              type="secondary"
              ellipsis={{ rows: 2, expandable: true }}
              style={{ margin: 0 }}
            >
              {project.description}
            </Typography.Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Modal
        title="Edit Project Description"
        visible={editVisible}
        footer={
          <Row justify="end">
            <Button onClick={() => setEditVisivle(false)}>Cancel</Button>
            <Button
              disabled={!description || description === project?.description}
              loading={loading}
              type="primary"
              onClick={() => {
                setLoading(true);
                dispatch({
                  type: 'ml/updateDescription',
                  payload: { projectId: project?.id, description },
                }).then(() => {
                  setEditVisivle(false);
                  setLoading(false);
                });
              }}
            >
              Save
            </Button>
          </Row>
        }
      >
        <TextArea
          rows={3}
          defaultValue={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default connect(({ ml }) => ({
  ml,
}))(ProjectCard);
