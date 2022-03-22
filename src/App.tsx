import './App.css';
import { Container } from 'react-bootstrap';
import { getAlice } from './substrate/utils';

import Header from './components/Header';
import { useEffect, useState } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
import {
  SubstrateContextProvider,
  useSubstrate,
} from './substrate/SubstrateContext';
import { loadExtension } from './substrate/extension';
import NameServiceRoutes from './pages/Routes';

import DeveloperConsole from './substrate/DeveloperConsole';

function App() {
  let { dispatch, ...state }: any = useSubstrate();
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
