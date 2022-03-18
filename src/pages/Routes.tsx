import MainPage from './Main';
import RegistrationCard from './Registration';
import SubdomainsCard from './Subdomains';
import NamePage from './NamePage';
import NameDetailsCard from './NameDetail';
import { Routes, Route, Navigate } from 'react-router-dom';

const NameServiceRoutes = () => {
  return (
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
  );
};

export default NameServiceRoutes;
