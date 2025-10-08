import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';

function Root() {
  return (
    <AuthProvider>
      <main className="main-content">
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export default Root;
