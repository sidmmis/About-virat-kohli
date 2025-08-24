import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Card from '../../components/Card';

export default function Complaints() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const load = () => api.get('/complaints/me').then(({ data }) => setList(data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/complaints', { title, description });
    setTitle('');
    setDescription('');
    load();
  };

  return (
    <div className="space-y-6">
      <Card title="Submit Complaint">
        <form onSubmit={submit} className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border rounded-md px-3 py-2" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border rounded-md px-3 py-2" rows={4} required />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2">Submit</button>
        </form>
      </Card>

      <Card title="My Complaints">
        <ul className="divide-y">
          {list.map((c) => (
            <li key={c._id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-gray-600">{c.description}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${c.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

