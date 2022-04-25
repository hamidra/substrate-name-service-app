import { useState, useEffect } from 'react';
import {
  useParams,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';

import styled from 'styled-components';
import { useSubstrate } from 'layout/hooks';

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

  return (
    <div className="container my-md-5 d-flex justify-content-center">
      <Outlet
        context={{
          nameRegistration: nameRegistration,
          setNameRegistration,
        }}
      />
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
