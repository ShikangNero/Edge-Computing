import React, { useState } from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Typography, Input, Select, Button } from 'antd';
import { getCookie } from '@/utils/cookie';

const { Option } = Select;

const ModalCreateProject = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  // const [location, setLocation] = useState('');

  const { visible, handleCloseModal, dispatch } = props;

  function resetState() {
    setTitle('');
    setDescription('');
    setType('');
    // setLocation('');
  }

  return (
    <Modal
      title="Create New Project"
      visible={visible}
      footer={
        <Row justify="end">
          <Button
            onClick={() => {
              resetState();
              handleCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            disabled={!title || !type}
            type="primary"
            onClick={async () => {
              setLoading(true);
              dispatch({
                type: 'ml/createProject',
                payload: {
                  userId: getCookie('userId'),
                  title,
                  description,
                  type,
                },
              }).then(() => setLoading(false));
              resetState();
              handleCloseModal();
            }}
          >
            Create
          </Button>
        </Row>
      }
      onCancel={() => {
        resetState();
        handleCloseModal();
      }}
    >
      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Project Title *</Typography.Text>
        </Col>
        <Col span={16}>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Type *</Typography.Text>
        </Col>
        <Col span={16}>
          <Select
            style={{ width: '100%' }}
            value={type || 'Please select a type'}
            onSelect={value => setType(value)}
          >
            <Option value="Classification">Classification</Option>
            <Option value="Detection">Detection</Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Description</Typography.Text>
        </Col>
        <Col span={16}>
          <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} />
        </Col>
      </Row>

      {/* <Row style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Typography.Text>Location</Typography.Text>
        </Col>
        <Col span={16}>
          <Input value={location} onChange={e => setLocation(e.target.value)} />
        </Col>
      </Row> */}
    </Modal>
  );
};

export default connect(({ ml }) => ({
  ml,
}))(ModalCreateProject);
