import './App.css';
import { Container } from 'react-bootstrap';
import { getAlice } from './substrate/utils';

import Header from './components/Header';
import { useEffect, useState } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
import { SubstrateContextProvider } from './substrate/SubstrateContext';
import NameServiceRoutes from './pages/Routes';

import DeveloperConsole from './substrate/DeveloperConsole';

function App() {
  const [account, setAccount] = useState<any>();
  useEffect(() => {
    getAlice().then((account) => {
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
            <NameServiceRoutes />
          </Container>
        </HashRouter>
      </SubstrateContextProvider>
    </>
  );
}

export default App;
