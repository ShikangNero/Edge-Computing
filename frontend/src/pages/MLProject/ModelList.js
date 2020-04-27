import React, { useState } from 'react';
import { connect } from 'dva';
import { List, Row, Col, Typography, Dropdown, Menu, Button, Tag, Alert } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { typeColorPicker } from '@/utils/colorPicker';

const ModelList = props => {
  const { data, dispatch } = props;
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <List
      style={{ width: '100%', margin: '8px 0' }}
      pagination={{
        pageSize: 10,
      }}
      itemLayout="horizontal"
      dataSource={data || []}
      renderItem={item => (
        <List.Item style={{ cursor: 'pointer' }}>
          <Row align="middle">
            {/* <PlayCircleOutlined style={{ marginRight: 8 }} /> */}
            <Col>
              <Row style={{ marginBottom: 8 }}>
                <Tag color={typeColorPicker(item.type)}>{item.type}</Tag>
              </Row>
              <Row>
                <Typography.Paragraph
                  style={{ fontSize: 18, marginBottom: 0, marginLeft: 4 }}
                  ellipsis={{ rows: 2 }}
                >
                  {item.title}
                </Typography.Paragraph>
              </Row>
              {/* <Row>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {`Submitted at ${moment(item.submittedAt).fromNow()}`}
              </Typography.Text>
            </Row> */}
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
                          type: 'model/removeModel',
                          payload: {
                            modelId: item?.id,
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
                    <Button disabled type="link" onClick={e => e.stopPropagation()}>
                      Edit
                    </Button>
                  </Menu.Item>
                  <Menu.Item
                    key="delete"
                    onClick={value => {
                      value.domEvent.stopPropagation();
                      setRemove(true);
                    }}
                  >
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

export default connect(({ model }) => ({
  model,
}))(ModelList);
