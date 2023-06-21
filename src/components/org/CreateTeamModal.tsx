import { Button, Checkbox, Input, Modal } from 'antd';
import { CSSProperties, Dispatch, useEffect, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation
} from '@tanstack/react-query';
import { Team } from '../../models/team/Team';
import { createTeam } from '../../api/teamApi';

const createTeamModalBodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '20px'
};

type CreateTeamModalProps = {
  organisationId: string;
  isCreateTeamModalOpen: boolean;
  setIsCreateTeamModalOpen: Dispatch<React.SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Team[], Error>>;
};

export const CreateTeamModal: React.FC<CreateTeamModalProps> = (props: CreateTeamModalProps) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [teamName, setTeamName] = useState<string>('');

  const [isValid, setIsValid] = useState<boolean>(false);

  const { mutate: createTeamMutation } = useMutation(createTeam, {
    onSuccess: (response: Team) => {
      props.setIsCreateTeamModalOpen(false);
      setIsValid(false);
      props.refetch();
    },
    onError: (e: Error) => {
      alert(e.message);
    }
  });

  useEffect(() => {
    if (teamName.length > 3) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [teamName.length]);

  const submitCreateOrganisation = () => {
    if (isValid) {
      createTeamMutation({
        orgId: props.organisationId,
        body: { name: teamName, private: isPrivate }
      });
    } else {
      alert('An error occured');
    }
  };

  const onCancel = () => {
    props.setIsCreateTeamModalOpen(false);
    setIsValid(false);
  };

  return (
    <Modal
      title='Create a new Organisation 🎉'
      open={props.isCreateTeamModalOpen}
      destroyOnClose
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={undefined}
          onClick={submitCreateOrganisation}
          disabled={!isValid}
        >
          Submit
        </Button>
      ]}
      bodyStyle={createTeamModalBodyStyle}
    >
      <Input
        onChange={e => {
          setTeamName(e.target.value);
        }}
        placeholder='Name'
      />

      <Checkbox defaultChecked onChange={() => setIsPrivate(!isPrivate)}>
        Private
      </Checkbox>
    </Modal>
  );
};
