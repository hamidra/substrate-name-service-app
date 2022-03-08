import { Card } from 'react-bootstrap';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import NameButtonNavbar from '../components/ButtonNavbar';

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
const NamePage = () => {
  let { name } = useParams();
  let location = useLocation();
  let tabBasePath = getTabBasePath(location.pathname);
  let tabTitles = ['Register', 'Details', 'Subdomains'];
  let tabs = getTabs(tabTitles, tabBasePath);
  return (
    <Card>
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
  );
};

export default NamePage;
