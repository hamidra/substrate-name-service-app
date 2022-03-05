import './App.css';
import { Container } from 'react-bootstrap';
import MainPage from './pages/Main';
import Header from './components/Header';
import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NameRegistrationForm from './pages/NameRegistration';
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
      <HashRouter>
        <Container fluid>
          <Header account={account} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/name">
              <Route path=":name" element={<NameRegistrationForm />} />
            </Route>
          </Routes>
        </Container>
      </HashRouter>
    </>
  );
}

export default App;
