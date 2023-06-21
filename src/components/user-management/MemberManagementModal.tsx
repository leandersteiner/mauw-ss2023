import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from '@tanstack/react-query';
import { Dispatch } from 'react';
import { Divider, Modal } from 'antd';
import { User } from '../../models/user/User';
import { UserSearch } from './UserSearch';
import { MemberOverview } from './MemberOverview';

type MemberManagementModalProps = {
  isMemberManagementModalOpen: boolean;
  setIsMemberManagementModalOpen: Dispatch<React.SetStateAction<boolean>>;
  owner: User;
  members: User[];
  orgId: string;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
  teamId?: string;
  projectId?: string;
};

export const MemberManagementModal: React.FC<MemberManagementModalProps> = (
  props: MemberManagementModalProps
) => {
  const onCancel = () => {
    props.setIsMemberManagementModalOpen(false);
  };

  return (
    <Modal
      title='Manage members'
      open={props.isMemberManagementModalOpen}
      destroyOnClose
      onCancel={onCancel}
      footer={null}
    >
      <UserSearch
        members={props.members}
        owner={props.owner}
        refetch={props.refetch}
        orgId={props.orgId}
        teamId={props.teamId}
        projectId={props.projectId}
      />

      <Divider>Members</Divider>

      <MemberOverview owner={props.owner} members={props.members} />
    </Modal>
  );
};
