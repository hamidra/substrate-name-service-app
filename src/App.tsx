import { useState } from 'react';
import 'App.css';
import { Container } from 'react-bootstrap';
import { HashRouter } from 'react-router-dom';
import { SubstrateContextProvider } from 'substrate/contexts/SubstrateContext';
import NameServiceRoutes from 'layout/routes/NameServiceRoutes';
import { useSubstrate } from 'layout/hooks';
import DeveloperConsole from 'substrate/DeveloperConsole';
import Processing from 'components/Processing';
import Error from 'components/Error';
import { KeyringContextProvider } from 'substrate/contexts/KeyringContext';
import Header from 'components/Header';
import Footer from 'components/Footer';

function ConnectionInProgress() {
  const { apiState }: any = useSubstrate();
  const error = apiState === 'ERROR';
  const [showError, setShowError] = useState(true);
  return (
    <>
      <Error
        show={error && showError}
        message={`An error happened while connecitng Polkadot.`}
        handleClose={() => setShowError(false)}
      />
      <Processing
        show={!error && apiState !== 'READY'}
        message="Connecting to Polkadot..."
      />
    </>
  );
}
function Body() {
  return (
    <>
      <Container fluid>
        <NameServiceRoutes />
        <ConnectionInProgress />
      </Container>
    </>
  );
}
function App() {
  return (
    <>
      <SubstrateContextProvider>
        <KeyringContextProvider>
          <DeveloperConsole />
          <HashRouter>
            <Header />
            <Body />
            <Footer />
          </HashRouter>
        </KeyringContextProvider>
      </SubstrateContextProvider>
    </>
  );
}

export default App;
