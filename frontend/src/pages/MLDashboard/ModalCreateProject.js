import React from 'react';
import { Modal, Row, Col, Typography, Input, Select } from 'antd';

const { Option } = Select;

class ModalCreateProject extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      type: '',
      location: '',
    };
  }

  resetState() {
    this.setState({
      title: '',
      description: '',
      type: '',
      location: '',
    });
  }

  render() {
    const { visible, handleCloseModal } = this.props;
    const { title, description, type, location } = this.state;
    return (
      <Modal
        title="Create New Project"
        visible={visible}
        onCancel={() => {
          this.resetState();
          handleCloseModal();
        }}
        onOk={() => {
          // TODO: post to server
          this.resetState();
          handleCloseModal();
        }}
      >
        <Row style={{ marginBottom: 12 }}>
          <Col span={8}>
            <Typography.Text>Project Title</Typography.Text>
          </Col>
          <Col span={16}>
            <Input value={title} onChange={e => this.setState({ title: e.target.value })} />
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col span={8}>
            <Typography.Text>Description</Typography.Text>
          </Col>
          <Col span={16}>
            <Input.TextArea
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col span={8}>
            <Typography.Text>Type</Typography.Text>
          </Col>
          <Col span={16}>
            <Select
              style={{ width: '100%' }}
              value={type || 'Please select a type'}
              onSelect={value => this.setState({ type: value })}
            >
              <Option value="Classification">Classification</Option>
              <Option value="Detection">Detection</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col span={8}>
            <Typography.Text>Location</Typography.Text>
          </Col>
          <Col span={16}>
            <Input value={location} onChange={e => this.setState({ location: e.target.value })} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ModalCreateProject;
