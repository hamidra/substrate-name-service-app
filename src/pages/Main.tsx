import styled from 'styled-components';
import SearchBox from '../components/SearchBox';
import { useNavigate } from 'react-router-dom';
import { generateNameHash } from '../substrate/palletProvider';

interface PageProps {
  className?: string;
}

const MainPage = ({ className }: PageProps) => {
  let navigate = useNavigate();
  return (
    <div className={`container ${className || ''}`}>
      <div className="row justify-content-center">
        <div className="col-8">
          <SearchBox
            placeholder="Find your perfect Kusama account name"
            handleSearch={(phrase) => {
              // validate phrase
              console.log(generateNameHash(phrase, 1));
              navigate(`name/${phrase}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const StyledMainPage = styled(MainPage)`
  margin-top: 30vh;
`;

export default StyledMainPage;
