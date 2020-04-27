import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import AddModel from './AddModel';
import ModelList from './ModelList';
import { getCookie } from '@/utils/cookie';

const ModelSection = props => {
  const {
    projectId,
    dispatch,
    model: { models },
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
      setInit(true);
    }
  });
  return (
    <>
      <AddModel projectId={projectId} />
      <ModelList data={models || []} />
    </>
  );
};

export default connect(({ model }) => ({
  model,
}))(ModelSection);
