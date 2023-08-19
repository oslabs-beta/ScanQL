import { Routes, Route } from "react-router-dom";
import useAppStore from "../store/AppStore";
import Header from "../components/layout/Header";
import ConnectDB from "../components/layout/ConnectDB";
import MetricsView from "../components/layout/MetricsView";

const Dashboard: React.FC = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { isConnectDBOpen, closeConnectDB, openConnectDB } = useAppStore();

    return (
        <div>
            <Header />
            {isConnectDBOpen && <ConnectDB closeModal={closeConnectDB} />}
            <div className="dashboard-page">
                <MetricsView />
            </div>
        </div>
    );
};

export default Dashboard;
