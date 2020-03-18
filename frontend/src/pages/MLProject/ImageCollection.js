import React from 'react';
import { Row, Card, Input, Typography, Popconfirm, Tooltip } from 'antd';
import { router } from 'umi';
import { EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';

// const SAMPLES = [{ id: 1 }, { id: 2 }, { id: 3 }];
const { Meta } = Card;
const IMAGE_HEIGHT = 150;

class ImageCollection extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      editName: null,
    };
  }

  render() {
    const { projectId, imgCollection, handleChangeName, handleDeleteCollection } = this.props;
    const { editing, editName } = this.state;
    const initialName = (imgCollection && imgCollection.name) || '';
    return (
      <Card
        style={{ width: '100%' }}
        bodyStyle={{ padding: '12px 24px' }}
        cover={
          <div
            style={{ height: IMAGE_HEIGHT, width: '100%', cursor: 'pointer' }}
            onClick={() => {
              router.push(`/ml-project/${projectId}/${imgCollection.id}`);
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
              onClick={() => this.setState({ editing: false, editName: null })}
            >
              Cancel
              <UndoOutlined key="cancel" style={{ marginLeft: 8 }} />
            </Row>
          ) : (
            <EditOutlined
              key="edit"
              onClick={e => {
                e.stopPropagation();
                this.setState({ editing: true });
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
                    this.setState({ editName: e.target.value });
                  }}
                  onPressEnter={() => {
                    if (editName) {
                      handleChangeName(editName);
                    }
                    this.setState({ editing: false, editName: null });
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
  }
}

export default ImageCollection;
