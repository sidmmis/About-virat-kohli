import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}

