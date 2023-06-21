import { Button, Checkbox, Input, Modal } from 'antd';
import { CSSProperties, Dispatch, useEffect, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation
} from '@tanstack/react-query';
import { Organisation } from '../../models/organisation/Organisation';
import { createOrg } from '../../api/orgApi';

const createOrganisationModalBodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '20px'
};

type CreateOrganisationModalProps = {
  isCreateOrganisationModalOpen: boolean;
  setIsCreateOrganisationModalOpen: Dispatch<React.SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Organisation[], Error>>;
};

export const CreateOrganisationModal: React.FC<CreateOrganisationModalProps> = (
  props: CreateOrganisationModalProps
) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [orgName, setOrgName] = useState<string>('');
  const [isCreatingOrg, setIsCreatingOrg] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { mutate: createOrgMutation } = useMutation(createOrg, {
    onSuccess: (response: Organisation) => {
      setIsCreatingOrg(false);
      props.setIsCreateOrganisationModalOpen(false);
      setIsValid(false);
      props.refetch();
    },
    onError: (e: Error) => {
      alert(e.message);
    }
  });

  useEffect(() => {
    if (orgName.length > 3) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [orgName.length]);

  const submitCreateOrganisation = () => {
    if (isValid) {
      setIsCreatingOrg(true);
      createOrgMutation({ name: orgName, private: isPrivate });
    } else {
      alert('An error occured');
    }
  };

  const onCancel = () => {
    props.setIsCreateOrganisationModalOpen(false);
    setIsValid(false);
  };

  return (
    <Modal
      title='Create a new Organisation 🎉'
      open={props.isCreateOrganisationModalOpen}
      destroyOnClose
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={isCreatingOrg}
          onClick={submitCreateOrganisation}
          disabled={!isValid}
        >
          Submit
        </Button>
      ]}
      bodyStyle={createOrganisationModalBodyStyle}
    >
      <Input
        onChange={e => {
          setOrgName(e.target.value);
        }}
        placeholder='Name'
      />

      <Checkbox defaultChecked onChange={() => setIsPrivate(!isPrivate)}>
        Private
      </Checkbox>
    </Modal>
  );
};
