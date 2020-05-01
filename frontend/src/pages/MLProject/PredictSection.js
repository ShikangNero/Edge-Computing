import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Col, Row, Typography, Empty, Divider } from 'antd';
import AddImages from './AddImages';
import { getCookie } from '@/utils/cookie';
import PredictedImage from '../VideoDetail/PredictedImage';

const PredictSection = props => {
  const {
    projectId,
    dispatch,
    image: { predictedImages, collections },
  } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      dispatch({
        type: 'model/getModels',
        payload: {
          projectId,
          userId: getCookie('userId'),
        },
      });
      dispatch({
        type: 'image/getImageCollections',
        payload: {
          userId: getCookie('userId'),
          projectId,
        },
      });
      setInit(true);
    }
  });

  return (
    <Col id="predictSection">
      <AddImages projectId={projectId} type="predict" />
      <Typography.Title level={4} style={{ marginTop: 24 }}>
        Predict Result
      </Typography.Title>
      <Divider type="horizontal" />
      <Row gutter={[16, 16]}>
        {predictedImages?.length > 0 ? (
          predictedImages.map(image => (
            <Col xs={24} sm={8} md={6} style={{ height: 200 }}>
              <PredictedImage
                curImage={image}
                collections={collections || []}
                type="predictTest"
                previewContainer={document.getElementById('predictSection')}
              />
            </Col>
          ))
        ) : (
          <Row justify="center" style={{ width: '100%' }}>
            <Empty description="Please upload image(s) to predict" />
          </Row>
        )}
      </Row>
    </Col>
  );
};

export default connect(({ image }) => ({
  image,
}))(PredictSection);
