import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import {
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Button,
  Modal,
  Dropdown,
  Menu,
  Alert,
  Select,
  Input,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ArrowLeftOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import ImageCard from './ImageCard';
import { getCookie } from '@/utils/cookie';

const { Option } = Select;

const ImageCollection = props => {
  const {
    image: { images, collections },
    match: { params },
    dispatch,
  } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [init, setinit] = useState(false);
  const [move, setMove] = useState(false);
  const [remove, setRemove] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  let filteredCollections = [];
  if (collections) {
    const curIdx = collections.findIndex(collection => collection.name === params?.collection_id);
    filteredCollections = [...collections];
    if (curIdx > -1) {
      filteredCollections.splice(curIdx, 1);
    }
  }

  const [tags, setTags] = useState(filteredCollections);

  useEffect(() => {
    if (!init) {
      dispatch({
        type: 'image/fetchImageByCollection',
        payload: {
          type: params?.collection_id,
          userId: getCookie('userId'),
          projectId: params?.project_id,
        },
      });
      dispatch({
        type: 'image/getImageCollections',
        payload: {
          userId: getCookie('userId'),
          projectId: params?.project_id,
        },
      });
      setinit(true);
    }
  });

  function getEditingMenu() {
    if (move) {
      return (
        <Menu onclick={e => e.stopPropagation()} style={{ padding: '4px 0' }}>
          <Alert
            type="info"
            showIcon
            message="Please choose the new collection you want to move"
            style={{ borderLeft: 'none', borderRight: 'none' }}
          />
          <Row id="selectRow" style={{ padding: '8px 16px' }}>
            <Select
              style={{ width: '100%' }}
              placeholder="Please select a collection for your image"
              getPopupContainer={() => document.getElementById('selectRow')}
              onClick={e => e.stopPropagation()}
              value={selectedCollection}
              onChange={value => setSelectedCollection(value)}
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      flexWrap: 'nowrap',
                      padding: 8,
                    }}
                  >
                    <Input
                      style={{ flex: 'auto' }}
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                    />
                    <Button
                      type="link"
                      size="small"
                      disabled={!newTag}
                      style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                      onClick={() => {
                        setTags([...tags, { name: newTag }]);
                        setNewTag('');
                      }}
                    >
                      <PlusOutlined /> Add Collection
                    </Button>
                  </div>
                </div>
              )}
            >
              {tags.map(option => (
                <Option key={option.name} onClick={e => e.stopPropagation()}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Row>
          <Row justify="end" style={{ padding: '4px 8px' }}>
            <Button
              loading={loading}
              size="small"
              onClick={e => {
                e.stopPropagation();
                setMove(false);
                setSelectedCollection(null);
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
                  type: 'image/changeImageCollection',
                  payload: {
                    imageId: previewImage?.id,
                    type: selectedCollection,
                  },
                }).then(() => {
                  setLoading(false);
                  setMove(false);
                  setSelectedCollection(null);
                  setPreviewVisible(false);
                });
              }}
            >
              Confirm
            </Button>
          </Row>
        </Menu>
      );
    }
    if (remove) {
      return (
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
                  type: 'image/removeImage',
                  payload: {
                    imageId: previewImage?.id,
                  },
                }).then(() => {
                  setLoading(false);
                  setRemove(false);
                  setPreviewVisible(false);
                });
              }}
            >
              Confirm
            </Button>
          </Row>
        </Menu>
      );
    }
    return null;
  }

  return (
    <PageHeaderWrapper>
      <Card
        headStyle={{ paddingLeft: 12 }}
        title={
          <Row>
            <Col span={24}>
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  router.goBack();
                }}
              />

              <Divider type="vertical" style={{ height: 24, marginRight: 12 }} />
              <Typography.Text strong style={{ fontSize: 16 }}>
                {params?.collection_id || 'Collection Name'}
              </Typography.Text>
            </Col>
          </Row>
        }
      >
        <Row gutter={[16, 16]}>
          {images?.map(image => (
            <Col xs={24} sm={12} md={6} lg={4} xl={3} id={image.id} key={image.id}>
              <ImageCard
                image={image}
                handleOpenPreview={img => {
                  setPreviewVisible(true);
                  setPreviewImage(img);
                }}
              />
            </Col>
          ))}
        </Row>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => {
            setPreviewImage('');
            setPreviewVisible(false);
          }}
          title={
            <Row align="middle">
              <Typography.Text style={{ fontSize: 18, marginRight: 8 }}>
                Image Preview
              </Typography.Text>
              <Dropdown
                trigger="click"
                placement="topLeft"
                overlay={
                  move || remove ? (
                    getEditingMenu()
                  ) : (
                    <Menu>
                      <Menu.Item>
                        <Button
                          type="link"
                          size="small"
                          onClick={e => {
                            e.stopPropagation();
                            setMove(true);
                            setRemove(false);
                          }}
                        >
                          Move
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Button
                          type="link"
                          size="small"
                          onClick={e => {
                            e.stopPropagation();
                            setRemove(true);
                            setMove(false);
                          }}
                        >
                          Delete
                        </Button>
                      </Menu.Item>
                    </Menu>
                  )
                }
              >
                <Button icon={<MoreOutlined />} type="link" size="small" />
              </Dropdown>
            </Row>
          }
          bodyStyle={{ padding: 0 }}
          style={{ minWidth: 400 }}
        >
          <img alt="example" style={{ width: '100%', marginBottom: 50 }} src={previewImage?.url} />
        </Modal>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ image }) => ({
  image,
}))(ImageCollection);
