import Oficial from '@app/components/dashboards/Oficial';
import Praca from '@app/components/dashboards/Praca';
import { AuthContext } from '@app/contexts/Auth/AuthContext';
import { useContext } from 'react';

const Dashboard = () => {
  const logged = useContext(AuthContext)

  return (
    <div className="container-fluid">
      <h5 className="mb-2">Dashboard</h5>

      {logged.user && logged.user.pat_id > 9 &&

        <Oficial />
      }

      <Praca />
      {/* =========================================================== */}

    </div>
  );
};

export default Dashboard;
