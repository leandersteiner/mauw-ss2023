import { Button, Input, Modal, Radio } from 'antd';
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router';

const createProjectModalBodyStyle: CSSProperties = {
  margin: 'auto'
};

const createProjectModalItemStyle: CSSProperties = {
  marginTop: 15,
  marginBottom: 15
};

export const CreateProjectModal: React.FC = () => {
  const navigate = useNavigate();

  const onCancel = () => navigate(-1);

  return (
    <Modal
      title='Start a new Project 🎉'
      open
      destroyOnClose
      onOk={undefined}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' loading={undefined} onClick={undefined}>
          Submit
        </Button>
      ]}
      bodyStyle={createProjectModalBodyStyle}
    >
      <Input style={createProjectModalItemStyle} placeholder='Name' />

      <Radio.Group name='radiogroup' defaultValue={0}>
        <Radio value={0}>Private</Radio>
        <Radio value={1}>Public</Radio>
      </Radio.Group>
    </Modal>
  );
};
