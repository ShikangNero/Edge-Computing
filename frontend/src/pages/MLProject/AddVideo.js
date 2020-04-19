import React, { useState } from 'react';
import { Col, Row, Collapse, Button, Divider } from 'antd';

const { Panel } = Collapse;

const AddVideo = () => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <Col span={24}>
      <Collapse
        expandIcon={() => null}
        bordered={false}
        style={{ backgroundColor: 'white' }}
        activeKey={activeKey}
      >
        <Panel
          style={{ border: 'none' }}
          header={
            <Row>
              <Col span={24}>
                <Button
                  style={{ position: 'relative', left: -40 }}
                  onClick={() => setActiveKey(activeKey ? null : 'addVideo')}
                >
                  Upload Video
                </Button>
              </Col>
            </Row>
          }
          key="addVideo"
        >
          <Divider type="horizontal" />
        </Panel>
      </Collapse>
    </Col>
  );
};

export default AddVideo;
