import {
  useParams,
  useNavigate,
  useLocation,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

interface tab {
  title: string;
  path: string;
}
const NavTabButton = ({ tab }) => {
  let navigate = useNavigate();

  let switchActiveTab = (tab: tab) => {
    tab && navigate(tab.path);
  };

  let match = useMatch(tab.path);
  let isActive = !!match;
  return (
    <button
      style={{ minWidth: 100 }}
      className={`btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
      onClick={() => switchActiveTab(tab)}
    >
      {tab.title}
    </button>
  );
};

const NameButtonNavbar = ({ tabs }: { tabs: tab[] }) => {
  return (
    <div className="btn-group" role="group" aria-label="Button Navigation Bar">
      {tabs.map((tab, index) => (
        <NavTabButton tab={tab} key={index} />
      ))}
    </div>
  );
};
export default NameButtonNavbar;
