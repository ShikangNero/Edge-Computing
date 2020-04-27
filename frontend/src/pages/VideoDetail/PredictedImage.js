import React, { useState } from 'react';
import { connect } from 'dva';
import { List, Row, Tag, Avatar, Select, Divider, Input, Button } from 'antd';
import { UserOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const PredictedImage = props => {
  const { curImage, collections, dispatch } = props;
  const [move, setMove] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState('');

  let filteredCollections = [];
  if (collections) {
    const curIdx = collections.findIndex(collection => collection.name === curImage?.type);
    filteredCollections = [...collections];
    if (curIdx > -1) {
      filteredCollections.splice(curIdx, 1);
    }
  }

  const [tags, setTags] = useState(filteredCollections);

  return (
    <List.Item style={{ borderLeft: '1px solid #f0f0f0', padding: 12 }}>
      <Row justify="center" style={{ marginBottom: 12 }}>
        {!move ? (
          <Tag
            color="cyan"
            style={{ fontSize: 12, cursor: 'pointer' }}
            onClick={() => setMove(true)}
          >
            {curImage?.type}
          </Tag>
        ) : (
          <Row style={{ width: '100%' }} align="middle">
            <Select
              style={{ flex: '1 1' }}
              placeholder="Please select a collection for your image"
              //   getPopupContainer={() => document.getElementById('selectRow')}
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
                  dispatch({
                    type: 'video/updateImageTag',
                    payload: {
                      imageId: curImage?.id,
                      type: selectedCollection,
                    },
                  });
                  setLoading(false);
                  setMove(false);
                  setSelectedCollection(null);
                });
              }}
            />
          </Row>
        )}
      </Row>

      <Row justify="center">
        <Avatar
          src={curImage?.url}
          icon={<UserOutlined />}
          shape="square"
          style={{ width: 120, height: 120 }}
        />
      </Row>
    </List.Item>
  );
};

export default connect(({ video, image }) => ({
  video,
  image,
}))(PredictedImage);
