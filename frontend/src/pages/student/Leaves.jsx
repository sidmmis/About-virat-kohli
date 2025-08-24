import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Card from '../../components/Card';

export default function Leaves() {
  const [list, setList] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const load = () => api.get('/leaves/me').then(({ data }) => setList(data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/leaves', { fromDate, toDate, reason });
    setFromDate(''); setToDate(''); setReason('');
    load();
  };

  return (
    <div className="space-y-6">
      <Card title="Apply for Leave">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border rounded-md px-3 py-2" required />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border rounded-md px-3 py-2" required />
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" className="border rounded-md px-3 py-2 md:col-span-1" required />
          <div className="md:col-span-3"><button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2">Apply</button></div>
        </form>
      </Card>

      <Card title="My Leave Requests">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">From</th>
                <th className="text-left p-2">To</th>
                <th className="text-left p-2">Reason</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((l) => (
                <tr key={l._id} className="border-b">
                  <td className="p-2">{new Date(l.fromDate).toLocaleDateString()}</td>
                  <td className="p-2">{new Date(l.toDate).toLocaleDateString()}</td>
                  <td className="p-2">{l.reason}</td>
                  <td className="p-2">
                    <span className={`text-xs px-2 py-1 rounded ${l.status === 'approved' ? 'bg-green-100 text-green-700' : l.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

