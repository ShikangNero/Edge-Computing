import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Card, Input, Typography, Popconfirm, Tooltip, Badge } from 'antd';
import { router } from 'umi';
import { EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { getCookie } from '@/utils/cookie';

const { Meta } = Card;
const IMAGE_HEIGHT = 150;

const ImageCollectionCard = props => {
  const { projectId, imgCollection } = props;
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(null);
  const initialName = (imgCollection && imgCollection.name) || '';

  const { dispatch } = props;

  return (
    <Card
      style={{ width: '100%' }}
      bodyStyle={{ padding: '12px 24px' }}
      cover={
        <Badge
          // className="site-badge-count-109"
          count={imgCollection.count}
          style={{ backgroundColor: '#393e46', color: 'white', boxShadow: ' 0 0 0 1px white' }}
          offset={[-18, 18]}
        >
          <div
            style={{ height: IMAGE_HEIGHT, width: '100%', cursor: 'pointer' }}
            onClick={() => {
              router.push(`/ml-project/${projectId}/image_collection/${imgCollection.name}`);
            }}
          >
            <img
              alt="example"
              src={imgCollection?.avatarImage?.url}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </Badge>
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
        <Popconfirm
          title="Confirm to delete this collection?"
          onConfirm={() => {
            dispatch({
              type: 'image/removeCollection',
              payload: {
                type: imgCollection?.name,
                userId: getCookie('userId'),
                projectId,
              },
            });
          }}
        >
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
                    dispatch({
                      type: 'image/updateCollectionName',
                      payload: {
                        userId: getCookie('userId'),
                        projectId,
                        oldType: imgCollection?.name,
                        newType: editName,
                      },
                    });

                    // handleChangeName(editName);
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

export default connect(({ ml, image }) => ({
  ml,
  image,
}))(ImageCollectionCard);
