import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { store } from './store/store'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './layouts/DashboardLayout'
import Menu from './pages/student/Menu'
import Complaints from './pages/student/Complaints'
import Leaves from './pages/student/Leaves'
import MenuManage from './pages/admin/MenuManage'
import ComplaintsAdmin from './pages/admin/ComplaintsAdmin'
import LeavesAdmin from './pages/admin/LeavesAdmin'
import ProtectedRoute from './components/ProtectedRoute'

function HomeRedirect() {
  const { user } = useSelector((s) => s.auth)
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin/menu' : '/student/menu'} replace />
}

function StudentLayout({ children }) {
  return (
    <ProtectedRoute role="student">
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

function AdminLayout({ children }) {
  return (
    <ProtectedRoute role="admin">
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomeRedirect />} />

          <Route path="/student/menu" element={<StudentLayout><Menu /></StudentLayout>} />
          <Route path="/student/complaints" element={<StudentLayout><Complaints /></StudentLayout>} />
          <Route path="/student/leaves" element={<StudentLayout><Leaves /></StudentLayout>} />

          <Route path="/admin/menu" element={<AdminLayout><MenuManage /></AdminLayout>} />
          <Route path="/admin/complaints" element={<AdminLayout><ComplaintsAdmin /></AdminLayout>} />
          <Route path="/admin/leaves" element={<AdminLayout><LeavesAdmin /></AdminLayout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
