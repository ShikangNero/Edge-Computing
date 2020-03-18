import React from 'react';
import { Row, Card, Input, Typography, Popconfirm } from 'antd';
import { router } from 'umi';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
          <EditOutlined
            key="edit"
            onClick={e => {
              e.stopPropagation();
              this.setState({ editing: true });
            }}
          />,
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
                  style={{ border: 'none' }}
                  value={editName || editName === '' ? editName : initialName}
                  onChange={e => {
                    e.stopPropagation();
                    this.setState({ editName: e.target.value });
                  }}
                  onPressEnter={() => {
                    handleChangeName(editName);
                    this.setState({ editing: false, editName: null });
                  }}
                />
              ) : (
                <Typography.Text>{imgCollection.name}</Typography.Text>
              )}
            </Row>
          }
        />
      </Card>
    );
  }
}

export default ImageCollection;
