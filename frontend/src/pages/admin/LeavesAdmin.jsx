import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Card from '../../components/Card';

export default function LeavesAdmin() {
  const [list, setList] = useState([]);
  const load = () => api.get('/leaves').then(({ data }) => setList(data));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/leaves/${id}`, { status });
    load();
  };

  return (
    <Card title="All Leaves">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Student</th>
              <th className="text-left p-2">From</th>
              <th className="text-left p-2">To</th>
              <th className="text-left p-2">Reason</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l._id} className="border-b">
                <td className="p-2">{l.student?.name}</td>
                <td className="p-2">{new Date(l.fromDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(l.toDate).toLocaleDateString()}</td>
                <td className="p-2">{l.reason}</td>
                <td className="p-2">
                  <span className={`text-xs px-2 py-1 rounded ${l.status === 'approved' ? 'bg-green-100 text-green-700' : l.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{l.status}</span>
                </td>
                <td className="p-2 space-x-2">
                  <button onClick={() => setStatus(l._id, 'approved')} className="text-sm text-green-700">Approve</button>
                  <button onClick={() => setStatus(l._id, 'rejected')} className="text-sm text-red-700">Reject</button>
                  <button onClick={() => setStatus(l._id, 'pending')} className="text-sm text-gray-700">Pending</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

