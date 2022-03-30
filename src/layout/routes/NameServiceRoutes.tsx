import MainPage from 'layout/MainPage';
import RegistrationCard from 'layout/containers/Registration';
import SubdomainsCard from 'layout/containers/Subdomains';
import NamePage from 'layout/NamePage';
import NameDetailsCard from 'layout/containers/NameDetail';
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
