import { Nav, Navbar } from 'react-bootstrap';
import PolkadotCircle from 'images/polkadot-circle.svg';
import styled from 'styled-components';
import AccountConnect from 'components/AccountConnect';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavPills from 'components/NavPills';

const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const NameTabBar = () => {
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
  let location = useLocation();
  let tabBasePath = getTabBasePath(location.pathname);
  let tabTitles = ['Register', 'Details', 'Subdomains'];
  let tabs = getTabs(tabTitles, tabBasePath);

  return (
    <>
      <NavPills tabs={tabs} />
    </>
  );
};

const Header = () => {
  return (
    <>
      <Navbar
        className="px-1 px-md-4 py-3"
        style={{ display: 'grid', gridTemplateColumns: '60px 1fr 60px' }}
        variant="dark"
      >
        <Navbar.Brand>
          <Link to="/">
            <Logo
              className="shadow-sm rounded-circle p-1"
              src={PolkadotCircle}
              alt={'Polkadot'}
            />
          </Link>
        </Navbar.Brand>
        <div>
          <div className="d-none d-md-flex justify-content-center">
            <NameTabBar />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Nav className="flex-grow-0 justify-content-end mr-2 shadow rounded-pill bg-white">
            <div
              style={{ width: 'max-content', fontWeight: '400' }}
              className="text-center h-100 d-flex"
            >
              <AccountConnect />
            </div>
          </Nav>
        </div>
      </Navbar>
      <div className="d-flex d-md-none my-3 justify-content-center">
        <NameTabBar />
      </div>
    </>
  );
};

export default Header;
