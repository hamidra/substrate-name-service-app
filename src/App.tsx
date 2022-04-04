import { useState } from 'react';
import 'App.css';
import { Container } from 'react-bootstrap';
import Header from 'components/Header';
import { HashRouter } from 'react-router-dom';
import { SubstrateContextProvider } from 'substrate/contexts/SubstrateContext';
import NameServiceRoutes from 'layout/routes/NameServiceRoutes';
import { useSubstrate } from 'layout/hooks';
import DeveloperConsole from 'substrate/DeveloperConsole';
import Processing from 'components/Processing';
import Error from 'components/Error';
import { KeyringContextProvider } from 'substrate/contexts/KeyringContext';

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
      <Header />
      <NameServiceRoutes />
      <ConnectionInProgress />
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
            <Container fluid>
              <Body />
            </Container>
          </HashRouter>
        </KeyringContextProvider>
      </SubstrateContextProvider>
    </>
  );
}

export default App;
