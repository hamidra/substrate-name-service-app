import MainPage from 'layout/MainPage';
import RegistrationCard from 'layout/containers/RegistrationCard';
import SubdomainsCard from 'layout/containers/Subdomains';
import NamePage from 'layout/NamePage';
import NameDetailsCard from 'layout/containers/NameDetail';
import { Routes, Route, Navigate } from 'react-router-dom';

export const siteMap = {
  MainPage: { path: '/' },
  NamePage: {
    path: '/name/:name/*',
    Register: { path: 'register' },
    Details: { path: 'details' },
    Subdomains: { path: 'subdomains' },
    Other: { path: '*' },
  },
};

const NameServiceRoutes = () => {
  return (
    <Routes>
      <Route path={siteMap.MainPage.path} element={<MainPage />} />

      <Route path={siteMap.NamePage.path} element={<NamePage />}>
        <Route
          path={siteMap.NamePage.Register.path}
          element={<RegistrationCard />}
        />
        <Route
          path={siteMap.NamePage.Details.path}
          element={<NameDetailsCard />}
        />
        <Route
          path={siteMap.NamePage.Subdomains.path}
          element={<SubdomainsCard />}
        />
        <Route
          path={siteMap.NamePage.Other.path}
          element={<Navigate to="register" replace={true} />}
        />
      </Route>
    </Routes>
  );
};

export default NameServiceRoutes;
