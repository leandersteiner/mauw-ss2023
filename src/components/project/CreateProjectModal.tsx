import { Modal } from 'antd';
import { useState } from 'react';

export const CreateProjectModal: React.FC = () => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const showCreateProjectModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  return (
    <>
      <Modal
        title='Create Project'
        open={isCreateProjectModalOpen}
        onOk={undefined}
        onCancel={undefined}
      ></Modal>
    </>
  );
};
