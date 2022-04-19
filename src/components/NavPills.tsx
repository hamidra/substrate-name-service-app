import { useNavigate, useMatch } from 'react-router-dom';

interface tab {
  title: string;
  path: string;
}
const TabPill = ({ tab }: { tab: tab }) => {
  let navigate = useNavigate();

  let switchActiveTab = (tab: tab) => {
    tab && navigate(tab.path);
  };

  let match = useMatch(tab.path);
  let isActive = !!match;
  return (
    <li className="nav-item">
      <a
        style={{ minWidth: 100 }}
        className={`nav-link text-center ${isActive ? 'active' : ''}`}
        onClick={() => switchActiveTab(tab)}
      >
        {tab.title}
      </a>
    </li>
  );
};

const NavPills = ({ tabs }: { tabs: tab[] }) => {
  return (
    <div className="nav nav-pills shadow-sm p-1">
      {tabs.map((tab, index) => (
        <TabPill tab={tab} key={index} />
      ))}
    </div>
  );
};
export default NavPills;
