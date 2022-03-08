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
const NameButtonNavbar = ({ tabs }: { tabs: tab[] }) => {
  let navigate = useNavigate();

  let switchActiveTab = (tab: tab) => {
    tab && navigate(tab.path);
  };
  return (
    <div className="btn-group" role="group" aria-label="Button Navigation Bar">
      {tabs.map((tab, index) => {
        let match = useMatch(tab.path);
        let isActive = !!match;
        return (
          <button
            style={{ minWidth: 100 }}
            key={index}
            className={`btn ${
              isActive ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => switchActiveTab(tab)}
          >
            {tab.title}
          </button>
        );
      })}
    </div>
  );
};
export default NameButtonNavbar;
