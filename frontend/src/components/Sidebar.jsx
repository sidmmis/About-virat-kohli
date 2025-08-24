import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Sidebar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <Link to="/" className="text-xl font-semibold">DormEase</Link>
        <div className="text-xs text-gray-500 mt-1">{user?.name} • {user?.role}</div>
      </div>
      <nav className="p-2 space-y-1 flex-1">
        {user?.role === 'admin' ? (
          <>
            <NavLink to="/admin/menu" className={linkClass}>Manage Mess Menu</NavLink>
            <NavLink to="/admin/complaints" className={linkClass}>Complaints</NavLink>
            <NavLink to="/admin/leaves" className={linkClass}>Leaves</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/student/menu" className={linkClass}>Mess Menu</NavLink>
            <NavLink to="/student/complaints" className={linkClass}>Complaints</NavLink>
            <NavLink to="/student/leaves" className={linkClass}>Leaves</NavLink>
          </>
        )}
      </nav>
      <div className="p-2 border-t">
        <button onClick={() => dispatch(logout())} className="w-full bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-md text-sm">Logout</button>
      </div>
    </div>
  );
}

