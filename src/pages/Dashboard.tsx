import { Routes, Route } from 'react-router-dom';
import useAppStore from '../store/appStore';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/ui/Loading';
import { useNavigate } from 'react-router-dom';

import MetricsView from '../components/layout/MetricsView';
// import ERDView from '../components/layout/ERDView';

import DashNav from '../components/layout/DashNav';

import ConnectDB from '../components/layout/ConnectDB';
import { useEffect } from 'react';



const Dashboard: React.FC = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { isConnectDBOpen, closeConnectDB, openConnectDB, view, setView } = useAppStore();




  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [])
  // if (!isAuthenticated) navigate('/');
  // if (isAuthenticated) {

    if (isLoading) {
      return <Loading />;
    }
  return (
    <div>
      {/* <div>{JSON.stringify(user)}</div> */}
      <DashNav />
      {/* {isConnectDBOpen && <ConnectDB />} */}
      <ConnectDB />
      {view === 'metrics' && <MetricsView />}
      {view === 'erd' && <div>ERD</div>}

    </div>
  )
}
// }

export default Dashboard;
