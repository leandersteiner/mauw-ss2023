import { Button, Checkbox, Dropdown, Input, MenuProps, Modal, Space } from 'antd';
import { CSSProperties, Dispatch, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DownOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { getTeams } from '../../api/teamApi';
import { Team } from '../../models/team/Team';
import { CreateProjectBodyData, CreateProjectRequest, Project } from '../../models/project/Project';
import { createProject } from '../../api/projectsApi';

const createProjectModalBodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '20px'
};

type CreateProjectModalProps = {
  isCreateProjectModalOpen: boolean;
  setIsCreateProjectModalOpen: Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
  setProjects: Dispatch<React.SetStateAction<Project[]>>;
};

export const CreateProjectModal: React.FC<CreateProjectModalProps> = (
  props: CreateProjectModalProps
) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [projectName, setProjectName] = useState<string>('');
  const [selectedTeam, setTeam] = useState<Team>();

  const [teamIdTeamMap, setTeamIdTeamMap] = useState<Map<string, Team>>(new Map());
  const [teamEntries, setTeamEntries] = useState<MenuProps['items']>();

  const [isValid, setIsValid] = useState<boolean>(false);

  const { isLoading, isError, error, data } = useQuery<Team[], Error>({
    queryKey: ['teams'],
    queryFn: getTeams
  });

  const { mutate: createProjectMutation } = useMutation(createProject, {
    onSuccess: (response: Project) => {
      props.setIsCreateProjectModalOpen(false);
      const { projects } = props;
      projects.push(response);
      props.setProjects(projects);
      setIsValid(false);
    },
    onError: (e: Error) => {
      alert(e.message);
    }
  });

  useEffect(() => {
    if (data !== undefined) {
      const newTeamIdTeamMap: Map<string, Team> = new Map();

      const items = data.map(team => {
        newTeamIdTeamMap.set(team.id, team);
        return {
          label: `${team.organisation.name} / ${team.name}`,
          key: team.id
        } as ItemType;
      });

      setTeamEntries(items);
      setTeamIdTeamMap(newTeamIdTeamMap);
    }
  }, [data]);

  useEffect(() => {
    if (selectedTeam !== undefined && projectName.length > 3) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [projectName.length, selectedTeam]);

  const handleMenuClick: MenuProps['onClick'] = entry => {
    setTeam(teamIdTeamMap.get(entry.key));
  };

  const menuProps = {
    items: teamEntries,
    onClick: handleMenuClick
  };

  const submitCreateProject = () => {
    if (isValid && selectedTeam !== undefined && projectName.length > 3) {
      const body: CreateProjectBodyData = { name: projectName, private: isPrivate };
      const request: CreateProjectRequest = {
        orgId: selectedTeam?.organisation.id,
        teamId: selectedTeam?.id,
        body
      };
      createProjectMutation(request);
    } else {
      alert('An error occured');
    }
  };

  const onCancel = () => {
    setTeam(undefined);
    props.setIsCreateProjectModalOpen(false);
    setIsValid(false);
  };

  return (
    <Modal
      title='Start a new Project 🎉'
      open={props.isCreateProjectModalOpen}
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
          onClick={submitCreateProject}
          disabled={!isValid}
        >
          Submit
        </Button>
      ]}
      bodyStyle={createProjectModalBodyStyle}
    >
      <Input
        onChange={e => {
          setProjectName(e.target.value);
        }}
        placeholder='Name'
      />
      <Dropdown menu={menuProps}>
        <Button loading={isLoading}>
          <Space>
            {selectedTeam
              ? `${selectedTeam.organisation.name} / ${selectedTeam.name}`
              : 'Choose Team'}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Checkbox defaultChecked onChange={() => setIsPrivate(!isPrivate)}>
        Private
      </Checkbox>
    </Modal>
  );
};
