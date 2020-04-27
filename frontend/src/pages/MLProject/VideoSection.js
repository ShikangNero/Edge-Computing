import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Row } from 'antd';
import AddVideo from './AddVideo';
import VideoList from './VideoList';
import { getCookie } from '@/utils/cookie';

const VideoSection = props => {
  const {
    projectId,
    dispatch,
    video: { videos },
    model: { models },
  } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      dispatch({
        type: 'video/getVideo',
        payload: {
          userId: getCookie('userId'),
          projectId,
        },
      });
      dispatch({
        type: 'model/getModels',
        payload: {
          projectId,
          userId: getCookie('userId'),
        },
      });
      setInit(true);
    }
  });
  return (
    <>
      <AddVideo projectId={projectId} models={models || []} />
      <Row>
        <VideoList data={videos || []} projectId={projectId} />
      </Row>
    </>
  );
};

export default connect(({ video, model }) => ({
  video,
  model,
}))(VideoSection);
