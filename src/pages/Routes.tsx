import MainPage from './Main';
import RegistrationCard from './Registration';
import SubdomainsCard from './Subdomains';
import NamePage from './NamePage';
import NameDetailsCard from './NameDetail';
import { Route, Navigate } from 'react-router-dom';
import NameServiceProvider from '../substrate/nsPalletProvider';
import { useSubstrate } from '../substrate';
import { useEffect, useState } from 'react';
import { getAlice, generateCommitHash, get32BitSalt } from '../substrate/utils';

const NameServiceRoutes = () => {
  let { state: substrate }: any = useSubstrate();
  let [nameServiceProvider, setNameServiceProvider] = useState(null);
  useEffect(() => {
    let nameServiceProvider =
      substrate.apiState === 'READY'
        ? new NameServiceProvider(substrate.api)
        : null;
    nameServiceProvider?.initialize();
    setNameServiceProvider(nameServiceProvider);
  }, [substrate?.apiState, substrate?.api]);

  const handleRegistrationCommit = async (name) => {
    let aliceAccount = getAlice();
    const salt = get32BitSalt();
    const commitHash = generateCommitHash(name, salt);
    console.log(salt, commitHash);
    nameServiceProvider?.commit(aliceAccount, commitHash);
  };

  return (
    <>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/name/:name/"
        element={<Navigate to="register" replace={true} />}
      />
      <Route path="/name/:name/*" element={<NamePage />}>
        <Route
          path="register"
          element={
            <RegistrationCard handleRegistration={handleRegistrationCommit} />
          }
        />
        <Route path="details" element={<NameDetailsCard />} />
        <Route path="subdomains" element={<SubdomainsCard />} />
      </Route>
    </>
  );
};

export default NameServiceRoutes;
