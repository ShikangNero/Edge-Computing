import React, { useState } from 'react';
import { Row, Card, Input, Typography, Popconfirm, Tooltip } from 'antd';
import { router } from 'umi';
import { EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';

const { Meta } = Card;
const IMAGE_HEIGHT = 150;

const ImageCollectionCard = props => {
  const { projectId, imgCollection, handleChangeName, handleDeleteCollection } = props;
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(null);
  const initialName = (imgCollection && imgCollection.name) || '';
  return (
    <Card
      style={{ width: '100%' }}
      bodyStyle={{ padding: '12px 24px' }}
      cover={
        <div
          style={{ height: IMAGE_HEIGHT, width: '100%', cursor: 'pointer' }}
          onClick={() => {
            router.push(`/ml-project/${projectId}/image_collection/${imgCollection.id}`);
          }}
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
      }
      actions={[
        editing ? (
          <Row
            type="flex"
            justify="center"
            align="middle"
            onClick={() => {
              setEditName(null);
              setEditing(false);
            }}
          >
            Cancel
            <UndoOutlined key="cancel" style={{ marginLeft: 8 }} />
          </Row>
        ) : (
          <EditOutlined
            key="edit"
            onClick={e => {
              e.stopPropagation();
              setEditing(true);
            }}
          />
        ),
        <Popconfirm title="Confirm to delete this collection?" onConfirm={handleDeleteCollection}>
          <DeleteOutlined
            key="delete"
            style={{ color: 'red' }}
            onClick={e => e.stopPropagation()}
          />
        </Popconfirm>,
      ]}
    >
      <Meta
        title={
          <Row type="flex" justify="center">
            {editing ? (
              <Input
                autoFocus
                allowClear
                // suffix={<EnterOutlined />}
                style={{ border: 'none', padding: '0 11px', height: 25 }}
                value={editName || editName === '' ? editName : initialName}
                onChange={e => {
                  e.stopPropagation();
                  setEditName(e.target.value);
                }}
                onPressEnter={() => {
                  if (editName) {
                    handleChangeName(editName);
                  }
                  setEditing(false);
                  setEditName(null);
                }}
              />
            ) : (
              <Tooltip title={imgCollection.name}>
                <Typography.Text ellipsis>{imgCollection.name}</Typography.Text>
              </Tooltip>
            )}
          </Row>
        }
      />
    </Card>
  );
};

export default ImageCollectionCard;
