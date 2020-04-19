import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const IMAGE_HEIGHT = 150;

const ImageCard = props => {
  const { image, handleOpenPreview } = props;
  return (
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
};

export default ImageCard;
