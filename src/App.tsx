import './App.css';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import { HashRouter, Routes } from 'react-router-dom';
import {
  SubstrateContextProvider,
  useSubstrate,
} from './substrate/SubstrateContext';
import NameServiceRoutes from './pages/Routes';

import DeveloperConsole from './substrate/DeveloperConsole';

function App() {
  return (
    <>
      <SubstrateContextProvider>
        <DeveloperConsole />
        <HashRouter>
          <Container fluid>
            <Header />
            <NameServiceRoutes />
          </Container>
        </HashRouter>
      </SubstrateContextProvider>
    </>
  );
}

export default App;
