import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {
  useParams,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import NameButtonNavbar from 'components/ButtonNavbar';
import styled from 'styled-components';
import { useSubstrate } from 'layout/hooks';
import { calcBlockTimeMs } from 'substrate/utils';

const getTabBasePath = (currentPath) => {
  let currentParts = currentPath.split('/');
  currentParts.pop();
  return currentParts.join('/');
};

const getTabs = (tabTitles: string[], basePath: string) => {
  let tabs = tabTitles.map((title) => ({
    title,
    path: `${basePath}/${title.toLowerCase()}`,
  }));
  return tabs;
};

interface NamePageProps {
  className?: string;
}
const NamePage = ({ className }: NamePageProps) => {
  let { name } = useParams();
  let location = useLocation();
  let tabBasePath = getTabBasePath(location.pathname);
  let tabTitles = ['Register', 'Details', 'Subdomains'];
  let tabs = getTabs(tabTitles, tabBasePath);
  const { api, nameServiceProvider }: any = useSubstrate();
  const [nameRegistration, setNameRegistration] = useState();
  useEffect(() => {
    if (name) {
      nameServiceProvider?.getRegistration(name).then((reg) => {
        setNameRegistration(reg?.unwrapOr(null)?.toJSON());
      });
    }
  }, [
    name,
    nameServiceProvider,
    location?.pathname /* need to query registration everytime location (tab) changes */,
  ]);

  let blockTime = api && calcBlockTimeMs(api);
  return (
    <div className="container d-flex justify-content-center">
      <Card className={`m-sm-5 w-100 ${className}`}>
        <Card.Header>
          <div className="d-flex flex-column flex-md-row px-md-4 py-1 justify-content-between">
            <div className="d-flex align-items-center">
              <div className="fw-light fs-4">{name}</div>
            </div>
            <NameButtonNavbar tabs={tabs} />
          </div>
        </Card.Header>
        <Card.Body>
          <Outlet
            context={{
              nameRegistration: nameRegistration,
              setNameRegistration,
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

const styledNamePage = styled(NamePage)`
  max-width: 1000px;
`;
export default styledNamePage;

type NameRegistrationContextType = {
  nameRegistration: any;
  setNameRegistration: (nameRegistration: any) => void;
};
export function useNameRegistration() {
  return useOutletContext<NameRegistrationContextType>();
}
