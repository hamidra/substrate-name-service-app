import styled from 'styled-components';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';

interface SearchBoxProps {
  placeholder: string;
  handleSearch: (string) => void;
  className?: string;
}

const SearchInput = styled(FormControl)`
  width: 100%;
  height: 4rem;
`;
const SearchBox = ({
  placeholder,
  handleSearch,
  className,
}: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <>
      <InputGroup className={`mb-3 shadow ${className || ''}`}>
        <SearchInput
          placeholder={placeholder || ''}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          onClick={() => handleSearch(searchValue)}
        >
          Search
        </Button>
      </InputGroup>
    </>
  );
};

export default SearchBox;
