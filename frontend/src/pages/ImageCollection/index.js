import React from 'react';
import { Card, Col, Row, Typography, Divider, Button, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { router } from 'umi';
import ImageCard from './ImageCard';

const FAKE_IMAGES = [
  {
    id: 'asd12',
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    id: 'fas32',
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    id: '2v9c8',
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    id: '22dv9',
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    id: '33c2c',
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

class ImageCollection extends React.Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
    };
  }

  render() {
    const { previewImage, previewVisible } = this.state;
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
                  Collection Name
                </Typography.Text>
              </Col>
            </Row>
          }
        >
          <Row gutter={[16, 16]}>
            {FAKE_IMAGES.map(image => (
              <Col xs={24} sm={12} md={6} lg={4} xl={3} id={image.id}>
                <ImageCard
                  image={image}
                  handleOpenPreview={img =>
                    this.setState({ previewVisible: true, previewImage: img })
                  }
                />
              </Col>
            ))}
          </Row>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={() => this.setState({ previewVisible: false, previewImage: '' })}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ImageCollection;
