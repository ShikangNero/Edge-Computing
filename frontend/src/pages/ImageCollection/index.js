import React, { useState } from 'react';
import { connect } from 'dva';
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

const ImageCollection = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  // const [init, setinit] = useState(false);
  // const {
  //   ml: { imageAssets },
  //   dispatch,
  // } = props;
  // useEffect(() => {
  //   if (!init) {
  //     dispatch({
  //       type: 'ml/getImageAssets',
  //     });
  //     setinit(true);
  //   }
  // });

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
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ ml, loading }) => ({
  ml,
  loading,
}))(ImageCollection);
