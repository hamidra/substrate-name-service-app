import { Nav, Navbar, Button } from 'react-bootstrap';
import AccountItem from '../components/Account/AccountItem';
import PolkadotCircle from '../images/polkadot-circle.svg';
import styled from 'styled-components';
import AccountConnect from './Account/AccountConnect';
const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const RoundedAccountItem = styled(AccountItem)``;

const Header = () => {
  return (
    <>
      <Navbar className="px-4 py-3" variant="dark">
        <Navbar.Brand>
          <a
            href="https://polkadot.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo
              className="shadow-sm rounded-circle p-1"
              src={PolkadotCircle}
              alt={'Polkadot'}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        ></Navbar.Collapse>
        <div className="d-flex justify-content-end">
          {
            <>
              <Nav className="d-none d-sm-block flex-grow-0 justify-content-end mr-2 shadow rounded-pill">
                <div
                  style={{ minWidth: '5rem', fontWeight: '400' }}
                  className="py-2 px-3 text-center h-100 d-flex"
                >
                  <AccountConnect />
                </div>
              </Nav>
            </>
          }
        </div>
      </Navbar>
    </>
  );
};

export default Header;
