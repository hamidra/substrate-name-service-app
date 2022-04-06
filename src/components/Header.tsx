import { Nav, Navbar } from 'react-bootstrap';
import AccountItem from 'components/AccountItem';
import PolkadotCircle from 'images/polkadot-circle.svg';
import styled from 'styled-components';
import AccountConnect from 'components/AccountConnect';
import { Link } from 'react-router-dom';

const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
const RoundedAccountItem = styled(AccountItem)``;

const Header = () => {
  return (
    <>
      <Navbar className="px-1 px-md-4 py-3" variant="dark">
        <Navbar.Brand>
          {/* <a href="/" target="_blank" rel="noopener noreferrer">*/}
          <Link to="/">
            <Logo
              className="shadow-sm rounded-circle p-1"
              src={PolkadotCircle}
              alt={'Polkadot'}
            />
          </Link>
          {/* </a>*/}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        ></Navbar.Collapse>
        <div className="d-flex justify-content-end">
          <Nav className="flex-grow-0 justify-content-end mr-2 shadow rounded-pill bg-white">
            <div
              style={{ minWidth: '5rem', fontWeight: '400' }}
              className="py-2 px-3 text-center h-100 d-flex"
            >
              <AccountConnect />
            </div>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
