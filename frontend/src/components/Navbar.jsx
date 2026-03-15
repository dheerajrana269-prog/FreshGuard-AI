import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-emerald-600">FreshGuard AI</Link>
        <div className="flex gap-4 text-sm">
          <NavLink to="/" className="hover:text-emerald-600">Home</NavLink>
          {token && <NavLink to="/scan" className="hover:text-emerald-600">Scan</NavLink>}
          {token && <NavLink to="/history" className="hover:text-emerald-600">History</NavLink>}
          {token && <NavLink to="/profile" className="hover:text-emerald-600">Profile</NavLink>}
          {!token ? (
            <>
              <NavLink to="/login" className="hover:text-emerald-600">Login</NavLink>
              <NavLink to="/register" className="hover:text-emerald-600">Register</NavLink>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
              className="rounded-md bg-slate-100 px-3 py-1 hover:bg-slate-200"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
