import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Card from '../../components/Card';

export default function ComplaintsAdmin() {
  const [list, setList] = useState([]);
  const load = () => api.get('/complaints').then(({ data }) => setList(data));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/complaints/${id}`, { status });
    load();
  };

  return (
    <Card title="All Complaints">
      <ul className="divide-y">
        {list.map((c) => (
          <li key={c._id} className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title} <span className="text-xs text-gray-500">by {c.student?.name}</span></div>
                <div className="text-sm text-gray-600">{c.description}</div>
              </div>
              <div className="space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${c.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
                <button onClick={() => setStatus(c._id, 'pending')} className="text-sm text-gray-600">Mark Pending</button>
                <button onClick={() => setStatus(c._id, 'resolved')} className="text-sm text-indigo-600">Resolve</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

