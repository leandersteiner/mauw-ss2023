import { CSSProperties, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { usePathContext } from '../../context/PathContext';
import { Organisation } from '../../models/organisation/Organisation';
import { getOrgs } from '../../api/orgApi';
import { OrganisationEntry } from '../../components/org/OrganisationEntry';
import { CreateOrganisationModal } from '../../components/org/CreateOrganisationModal';
import { MemberManagementModal } from '../../components/user-management/MemberManagementModal';
import { User } from '../../models/user/User';

const topBarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px'
};

export const Organisations = () => {
  const { setPath } = usePathContext();
  useEffect(() => setPath('organisations'), [setPath]);

  const [orgs, setOrgs] = useState<Organisation[]>([]);
  const [isCreateOrganisationModalOpen, setIsCreateOrganisationModalOpen] = useState(false);

  const { isLoading, isError, error, data, refetch } = useQuery<Organisation[], Error>({
    queryKey: ['orgs'],
    queryFn: getOrgs
  });

  useEffect(() => {
    if (data !== undefined) {
      setOrgs(data);
    }
  }, [data]);

  return (
    <span>
      <CreateOrganisationModal
        isCreateOrganisationModalOpen={isCreateOrganisationModalOpen}
        setIsCreateOrganisationModalOpen={setIsCreateOrganisationModalOpen}
        refetch={refetch}
      />

      <div style={topBarStyle}>
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setIsCreateOrganisationModalOpen(true);
          }}
        >
          Create Organisation
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {orgs?.map(org => {
          return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} key={org.id}>
              <OrganisationEntry org={org} key={org.id} refetch={refetch} />
            </Col>
          );
        })}
      </Row>
    </span>
  );
};
