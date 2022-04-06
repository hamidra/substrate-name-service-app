import styled from 'styled-components';
import SearchBox from 'components/SearchBox';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  className?: string;
}

const MainPage = ({ className }: PageProps) => {
  let navigate = useNavigate();
  return (
    <div
      className={`container text-center text-uppercase landingpage ${
        className || ''
      }`}
    >
      <div className="card-header-title">
        Dot Decentralized <br />
        Name Service
      </div>
      <div className="text-center text-card">
        Find a perfect name for your dot account <br />
        and register it in Dot's Decentralized Name Service.
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-9">
          <SearchBox
            placeholder="Find your perfect Dot name"
            handleSearch={(phrase) => {
              // validate phrase
              navigate(`name/${phrase}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const StyledMainPage = styled(MainPage)`
  margin-top: 15vh;
`;

export default StyledMainPage;
