import { Card } from 'react-bootstrap';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import NameButtonNavbar from '../components/ButtonNavbar';
import styled from 'styled-components';

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
  return (
    <div className={`container justi-content-center`}>
      <Card className={`m-sm-5 ${className}`}>
        <Card.Header>
          <div className="d-flex flex-column flex-md-row px-md-4 py-1 justify-content-between">
            <div className="d-flex align-items-center">
              <div className="fw-light fs-4">{name}</div>
            </div>
            <NameButtonNavbar tabs={tabs} />
          </div>
        </Card.Header>
        <Card.Body>
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
};

const styledNamePage = styled(NamePage)`
  max-width: 1000px;
`;
export default styledNamePage;
