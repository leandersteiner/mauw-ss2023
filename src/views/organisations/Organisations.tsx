import { CSSProperties, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { usePathContext } from '../../context/PathContext';
import { Organisation } from '../../models/organisation/Organisation';
import { getOrgs } from '../../api/orgApi';
import { OrganisationEntry } from '../../components/org/OrganisationEntry';

const topBarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px'
};

export const Organisations = () => {
  const { setPath } = usePathContext();
  useEffect(() => setPath('organisations'), [setPath]);

  const [orgs, setOrgs] = useState<Organisation[]>([]);
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);

  const { isLoading, isError, error, data } = useQuery<Organisation[], Error>({
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
      <div style={topBarStyle}>
        <Button icon={<PlusOutlined />} onClick={() => {}}>
          Create Project
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {orgs?.map(org => {
          return (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={org.id}>
              <OrganisationEntry org={org} />
            </Col>
          );
        })}
      </Row>
    </span>
  );
};
