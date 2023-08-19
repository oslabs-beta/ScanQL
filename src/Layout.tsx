import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink> | <NavLink to="/dashboard">Dashboard</NavLink> |{' '}
        <NavLink to="/login">Login</NavLink>
      </nav>
      {/* <hr /> */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}