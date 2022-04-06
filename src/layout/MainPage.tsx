import styled from 'styled-components';
import SearchBox from 'components/SearchBox';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  className?: string;
}

const MainPage = ({ className }: PageProps) => {
  let navigate = useNavigate();
  return (
    <div className={`container text-center landingpage ${className || ''}`}>
      <div className="text-uppercase card-header-title">
        Dot Decentralized <br />
        Name Service
      </div>
      <div className="text-center text-card">
        Find a perfect name for your dot account. <br />
        Register it in Dot Name Service to use in your wallet and favorite apps.
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-9">
          <SearchBox
            placeholder="Find your perfect Dot name"
            handleSearch={(phrase) => {
              // ToDo: this logic (adding .dot) should be refactored to be configurable by components.
              phrase = `${phrase}.dot`;
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
