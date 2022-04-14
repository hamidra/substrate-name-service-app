import styled from 'styled-components';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

interface SearchBoxProps {
  placeholder: string;
  handleSearch: (string) => void;
  className?: string;
}

const searchboxWidth = '4rem';
const iconSize = '32'; // 2 rem assuming 1rem=16px
const iconMargin = '1rem';

const SearchInput = styled(FormControl)`
  width: 100%;
  height: ${searchboxWidth};
`;

const SearchIcon = styled.div`
  position: absolute;
  right: ${iconMargin};
  top: ${iconMargin};
`;

const SearchBox = ({
  placeholder,
  handleSearch,
  className,
}: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleSearch(searchValue);
    }
  };
  return (
    <>
      <div className={`mb-3 search-box ${className || ''}`}>
        <SearchInput
          placeholder={placeholder || ''}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => handleKeypress(e)}
        />
        <SearchIcon
          className="search-icon"
          onClick={() => handleSearch(searchValue)}
        >
          <MagnifyingGlass size={iconSize} />
        </SearchIcon>
      </div>
    </>
  );
};

export default SearchBox;
