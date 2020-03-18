import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const IMAGE_HEIGHT = 150;

class ImageCard extends React.Component {
  render() {
    const { image, handleOpenPreview } = this.props;
    return (
      //   <Popover
      //     trigger="click"
      //     content={
      //       <Row>
      //         <Col span={24}>
      //           <Button type="link" size="small">
      //             Move
      //           </Button>
      //           <Divider type="vertical" />
      //           <Button
      //             type="link"
      //             size="small"
      //             icon={<DeleteOutlined style={{ color: 'red' }} />}
      //             style={{ color: 'red' }}
      //           >
      //             Delete
      //           </Button>
      //         </Col>
      //       </Row>
      //     }
      //   >
      <Card
        bordered={false}
        hoverable
        bodyStyle={{ padding: 0 }}
        onClick={() => handleOpenPreview(image.src || '')}
      >
        <Avatar
          src={image.src}
          icon={<UserOutlined />}
          shape="square"
          style={{ width: '100%', height: IMAGE_HEIGHT }}
        />
      </Card>
      //   </Popover>
    );
  }
}

export default ImageCard;
