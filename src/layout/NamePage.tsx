import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {
  useParams,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';

import styled from 'styled-components';
import { useSubstrate } from 'layout/hooks';
import { calcBlockTimeMs } from 'substrate/utils';
interface NamePageProps {
  className?: string;
}
const NamePage = ({ className }: NamePageProps) => {
  let { name } = useParams();
  let location = useLocation();
  const { api, nameServiceProvider }: any = useSubstrate();
  const [nameRegistration, setNameRegistration] = useState();
  useEffect(() => {
    if (name) {
      nameServiceProvider?.getRegistration(name).then((reg) => {
        setNameRegistration(reg?.unwrapOr(null)?.toJSON());
      });
    }
  }, [
    name,
    nameServiceProvider,
    location?.pathname /* need to query registration everytime location (tab) changes */,
  ]);

  let blockTime = api && calcBlockTimeMs(api);
  return (
    <div className="container d-flex justify-content-center">
      <Card
        style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
        className="shadow"
      >
        <Card.Body>
          <Outlet
            context={{
              nameRegistration: nameRegistration,
              setNameRegistration,
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

const styledNamePage = styled(NamePage)`
  max-width: 1000px;
`;
export default styledNamePage;

type NameRegistrationContextType = {
  nameRegistration: any;
  setNameRegistration: (nameRegistration: any) => void;
};
export function useNameRegistration() {
  return useOutletContext<NameRegistrationContextType>();
}
