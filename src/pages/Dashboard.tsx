import useAppStore from "../store/appStore";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import ERDView from '../components/layout/ERDView'
import MetricsView from "../components/layout/MetricsView";
import DashNav from "../components/layout/DashNav";
import ConnectDB from "../components/layout/ConnectDB";
import { useEffect } from "react";
import CustomQueryView from "../components/layout/CustomQueryView";
import { ErrorBoundary } from 'react-error-boundary';
import { AppFallback } from "../components/Errors/AppFallback";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { setView, view, metricsData, openConnectDB } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

  const fetchedData = Object.keys(metricsData.databaseInfo).length !== 0 ? true : false;

  return (
    <div className="h-screen">
      <DashNav />
      <ConnectDB />
      <div className="dashboard-button-bar">
        <Button
          className="rounded-lg font-normal mr-1  ml-1 bg-gray-500 bg-opacity-10 text-indigo-900 text-opacity-60"
          onClick={() => setView("metrics")}
        >
          Metrics
        </Button>
        <Button
          className="rounded-lg font-normal mr-1 ml-1 bg-gray-500 bg-opacity-10 border-solid border-opacity-60 text-indigo-900 text-opacity-60"
          onClick={() => setView("erd")}
        >
          ER Diagram
        </Button>
        <Button
          className="rounded-lg font-normal mr-1 ml-1 bg-gray-500 bg-opacity-10 border-solid border-opacity-60 text-indigo-900 text-opacity-60"
          onClick={() => setView("custom")}
        >
          Custom Query
        </Button>
      </div>
      <div className="dashboard-page">
        <div className="dashboard-container">
          {!fetchedData && view !== 'loading' &&
          <div className="invalid-uri">
          <button
          className="dashboard-connect-uri text-indigo-900 text-opacity-80"
          onClick={() => openConnectDB()}
          >
            Connect to a Database
          </button>
          </div>
        }
        {fetchedData && view === "metrics" && 
        <ErrorBoundary FallbackComponent={AppFallback}>
          <MetricsView />
        </ErrorBoundary>
        }
        {fetchedData && view === "erd" && 
        <ErrorBoundary FallbackComponent={AppFallback}>
          <ERDView />
        </ErrorBoundary>
        }
        {fetchedData && view === "custom" && 
        <ErrorBoundary FallbackComponent={AppFallback}>
          <CustomQueryView/>
        </ErrorBoundary>
        }
        {view === 'loading' && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
