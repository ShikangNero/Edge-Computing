import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import ImageCollectionCard from './ImageCollectionCard';
import AddImages from './AddImages';
import { getCookie } from '@/utils/cookie';

const ImageSection = props => {
  const {
    dispatch,
    projectId,
    image: { collections },
  } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
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
    <>
      <AddImages projectId={projectId} />
      <Row gutter={[16, 16]}>
        {collections.map(imgCollection => (
          <Col xs={24} sm={12} md={8} xl={6} key={imgCollection.id}>
            <ImageCollectionCard
              projectId={projectId}
              imgCollection={imgCollection}
              handleChangeName={newName => {
                // const copiedSamples = [...samples];
                // const curSample = copiedSamples.find(sample => sample.id === imgCollection.id);
                // if (curSample) {
                //   curSample.name = newName;
                // }
                // setSamples(copiedSamples);
              }}
              handleDeleteCollection={() => {
                // const copiedSamples = [...samples];
                // const curSampleIdx = copiedSamples.findIndex(
                //   sample => sample.id === imgCollection.id,
                // );
                // copiedSamples.splice(curSampleIdx, 1);
                // setSamples(copiedSamples);
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default connect(({ ml, image, loading }) => ({
  ml,
  image,
  loading,
}))(ImageSection);
