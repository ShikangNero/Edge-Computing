import React, { useState } from 'react';
import { connect } from 'dva';
import { Modal, Row, Tag, Avatar, Select, Divider, Input, Button, Card } from 'antd';
import { UserOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const PredictedImage = props => {
  const { curImage, collections, dispatch, previewContainer, type } = props;
  const [move, setMove] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState('');
  const [tags, setTags] = useState([]);

  function handleTagClick() {
    let filteredCollections = [];
    console.log('trigger set tag');
    if (collections) {
      const curIdx = collections.findIndex(collection => collection.name === curImage?.type);
      filteredCollections = [...collections];
      if (curIdx > -1) {
        filteredCollections.splice(curIdx, 1);
      }
    }

    setTags(filteredCollections);
  }

  return (
    <>
      <Row justify="center" style={{ marginBottom: 12 }}>
        {!move ? (
          <div style={{ height: 24 }}>
            <Tag
              color="cyan"
              style={{ fontSize: 12, cursor: 'pointer' }}
              onClick={() => {
                handleTagClick();
                setMove(true);
              }}
            >
              {curImage?.type}
            </Tag>
          </div>
        ) : (
          <Row style={{ width: '100%' }} align="middle">
            <Select
              size="small"
              style={{ flex: '1 1' }}
              placeholder="Select a collection to move"
              //   getPopupContainer={() => document.getElementById('selectRow')}
              onClick={e => e.stopPropagation()}
              // value={selectedCollection}
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
            <Row>
              <Button
                icon={<CloseOutlined />}
                type="link"
                size="small"
                onClick={() => setMove(false)}
              />
              <Button
                icon={<CheckOutlined />}
                disabled={!selectedCollection}
                loading={loading}
                type="link"
                size="small"
                onClick={() => {
                  setLoading(true);
                  dispatch({
                    type: 'image/changeImageCollection',
                    payload: {
                      imageId: curImage?.id,
                      type: selectedCollection,
                    },
                  }).then(() => {
                    if (type === 'predictTest') {
                      dispatch({
                        type: 'image/updatePredictImageTag',
                        payload: {
                          imageId: curImage.id,
                          type: selectedCollection,
                        },
                      });
                    } else {
                      dispatch({
                        type: 'video/updateImageTag',
                        payload: {
                          imageId: curImage?.id,
                          type: selectedCollection,
                        },
                      });
                    }
                    setLoading(false);
                    setMove(false);
                    setSelectedCollection(null);
                  });
                }}
              />
            </Row>
          </Row>
        )}
      </Row>

      <Row justify="center">
        <Card
          bordered={false}
          hoverable
          onClick={() => setPreview(true)}
          bodyStyle={{ padding: 0 }}
        >
          <Avatar
            src={curImage?.url}
            icon={<UserOutlined />}
            shape="square"
            style={{ width: 120, height: 120, cursor: 'pointer' }}
          />
        </Card>
      </Row>
      <Modal
        visible={preview}
        getContainer={() => previewContainer}
        title="Image Preview"
        onCancel={() => setPreview(false)}
        footer={null}
        bodyStyle={{ padding: 0 }}
      >
        <img alt="example" style={{ width: '100%', marginBottom: 50 }} src={curImage?.url} />
      </Modal>
    </>
  );
};

export default connect(({ video, image }) => ({
  video,
  image,
}))(PredictedImage);
