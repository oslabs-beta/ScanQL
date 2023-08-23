import { Routes, Route } from "react-router-dom";
import useAppStore from "../store/appStore";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import ERDView from '../components/layout/ERDView'


import MetricsView from "../components/layout/MetricsView";
// import ERDView from '../components/layout/ERDView';

import DashNav from "../components/layout/DashNav";

import ConnectDB from "../components/layout/ConnectDB";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setView, view, connectToDatabase, uri, dbName } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    else {
      connectToDatabase(uri, dbName);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {/* <div>{JSON.stringify(user)}</div> */}
      <DashNav />
      {/* {isConnectDBOpen && <ConnectDB />} */}
      <ConnectDB />
      <div className="dashboard-button-bar">
        <Button
          className="rounded-lg font-normal mr-1  ml-1 bg-gray-500 bg-opacity-10 border-solid border-opacity-60 border-white text-gray-700 text-opacity-60"
          onClick={() => setView("metrics")}
        >
          Dashboard
        </Button>
        <Button
          className="rounded-lg font-normal mr-1 ml-1 bg-gray-500 bg-opacity-10 border-solid border-opacity-60 text-gray-700 text-opacity-60"
          onClick={() => setView("erd")}
        >
          ERD Diagram
        </Button>
        {/* <Button className="rounded-lg font-normal mr-1 ml-1 bg-gray-500 bg-opacity-10 border-solid border-opacity-60 text-gray-700 text-opacity-60">
                    {" "}
                    Custom Queries{" "}
                </Button> */}
      </div>
      <div className="dashboard-page">
        <div className="dashboard-container">
          {view === "metrics" && <MetricsView />}
          {view === "erd" && <ERDView />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
