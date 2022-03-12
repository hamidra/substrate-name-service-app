import './App.css';
import { Container } from 'react-bootstrap';
import MainPage from './pages/Main';
import Header from './components/Header';
import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationCard from './pages/Registration';
import SubdomainsCard from './pages/Subdomains';
import { SubstrateContextProvider } from './substrate';

import NamePage from './pages/NamePage';
import NameDetailsCard from './pages/NameDetail';
import DeveloperConsole from './substrate/DeveloperConsole';

const getAccount = async () => {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
  const alice = keyring.addFromUri('//Alice');
  return alice;
};

function App() {
  const [account, setAccount] = useState<any>();
  useEffect(() => {
    getAccount().then((account) => {
      setAccount(account);
    });
  }, []);

  return (
    <>
      <SubstrateContextProvider>
        <DeveloperConsole />
        <HashRouter>
          <Container fluid>
            <Header account={account} />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/name/:name/"
                element={<Navigate to="register" replace={true} />}
              />
              <Route path="/name/:name/*" element={<NamePage />}>
                <Route path="register" element={<RegistrationCard />} />
                <Route path="details" element={<NameDetailsCard />} />
                <Route path="subdomains" element={<SubdomainsCard />} />
              </Route>
            </Routes>
          </Container>
        </HashRouter>
      </SubstrateContextProvider>
    </>
  );
}

export default App;
