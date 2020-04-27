import React, { useState } from 'react';
import { Button, Row, Modal, Col, Typography, Input, Select } from 'antd';
import TrainModel from './TrainModel';
import UploadModel from './UploadModel';

const { Option } = Select;

const AddModel = props => {
  const [trainVisible, setTrainVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const { projectId } = props;

  return (
    <>
      <Row>
        <Button style={{ marginRight: 8 }} onClick={() => setTrainVisible(true)}>
          Train New Model
        </Button>
        <Button onClick={() => setUploadVisible(true)}>Upload Model Files</Button>
      </Row>
      <TrainModel
        visible={trainVisible}
        handleCloseModal={() => setTrainVisible(false)}
        projectId={projectId}
      />
      <UploadModel
        visible={uploadVisible}
        handleCloseModal={() => setUploadVisible(false)}
        projectId={projectId}
      />
    </>
  );
};

export default AddModel;
